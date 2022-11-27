import { UserInputError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import Validator from 'validatorjs';

import { customScalars } from './custom-scalars';
import type { Resolvers } from '~/generated/graphql';
import { sendMail } from '~/libs/nodemailer';
import { isPasswordValidFormat } from '~/utils/validation';

export const resolvers: Resolvers = {
  Query: {
    items: async (_parent, _args, { prisma }) => {
      return await prisma.item.findMany();
    },
    isValidTemporaryUserToken: async (_parent, { token }, { prisma }) => {
      const temporaryUser = await prisma.temporaryUser.findFirst({
        where: { id: token },
      });

      return !!temporaryUser;
    },
  },
  Mutation: {
    createItem: async (_parent, args, { prisma }) => {
      return await prisma.item.create({
        data: args.input,
      });
    },
    registerTemporaryUser: async (_parent, { input }, { prisma }) => {
      const validator = new Validator(input, {
        email: 'required|email',
      });
      if (validator.fails()) {
        throw new UserInputError('Email is invalid.');
      }

      try {
        const user = await prisma.user.findFirst({
          where: { email: input.email },
        });
        if (user) {
          throw new GraphQLError(
            'This email address may already be registered as user.',
          );
        }
      } catch (error) {
        throw new GraphQLError('Database Connection Error');
      }

      const temporaryUser = await prisma.temporaryUser
        .create({
          data: { email: input.email },
        })
        .catch(() => {
          throw new GraphQLError(
            'This email address may already be registered as temporary user.',
          );
        });

      try {
        await sendMail({
          to: temporaryUser.email,
          subject: '本会員登録のお手続きについて',
          text: `
            次のURLにアクセスして会員登録を完了してください。
            ${process.env.CLIENT_ORIGIN_URL}/sign-up?token=${temporaryUser.id}
          `,
        });
      } catch (error) {
        throw new GraphQLError('Mail Send Error');
      }
    },
    registerUser: async (_parent, { input }, { prisma }) => {
      if (input.userName === '') {
        throw new UserInputError('User name is empty.');
      }
      if (!isPasswordValidFormat(input)) {
        throw new UserInputError('Passwords is invalid.');
      }
      const temporaryUser = await prisma.temporaryUser.findUnique({
        where: { id: input.temporaryUserToken },
      });
      if (temporaryUser === null) {
        throw new GraphQLError('Temporary user is not found.');
      }
      const user = await prisma.user.create({
        data: { name: input.userName, email: temporaryUser.email },
      });
      if (user === null) {
        throw new GraphQLError('Failed create user.');
      }

      const saltRounds = 5;
      const hashedPassword = bcrypt.hashSync(input.password, saltRounds);
      await prisma.authorization.create({
        data: { userId: user.id, password: hashedPassword },
      });
      await prisma.temporaryUser.delete({ where: { id: temporaryUser.id } });
    },
  },
  Item: {
    id: ({ id }) => `${id}`,
    displayPrice: ({ price }) => {
      return `¥${price.toLocaleString()}`;
    },
  },
  ...customScalars,
};
