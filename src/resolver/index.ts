import { PrismaClient } from '@prisma/client';
import { UserInputError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';
import Validator from 'validatorjs';

import { sendMail } from '../libs/nodemailer';
import { customScalars } from './custom-scalars';
import type { Resolvers } from '~/generated/graphql';

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    items: async () => {
      return await prisma.item.findMany();
    },
    isValidTemporaryUserToken: async (_parent, { token }) => {
      const temporaryUser = await prisma.temporaryUser.findFirst({
        where: { id: token },
      });

      return !!temporaryUser;
    },
  },
  Mutation: {
    createItem: async (_parent, args) => {
      return await prisma.item.create({ data: args.input });
    },
    registerTemporaryUser: async (_parent, { input }) => {
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
  },
  ...customScalars,
};
