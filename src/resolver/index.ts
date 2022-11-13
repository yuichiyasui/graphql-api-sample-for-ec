import crypto from 'crypto';

import { PrismaClient } from '@prisma/client';
import { UserInputError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';
import Validator from 'validatorjs';

import { customScalars } from './custom-scalars';
import type { Resolvers } from '~/generated/graphql';

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    items: async () => {
      return await prisma.item.findMany();
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

      const verificationToken = crypto
        .createHash('sha256')
        .update(input.email)
        .digest('hex');

      try {
        const temporaryUser = await prisma.temporaryUser.create({
          data: { email: input.email, verificationToken },
        });
        // TODO: 検証トークン付きの本登録用のURLをメールアドレスに送信する
        // eslint-disable-next-line no-console
        console.log(`Sent email to '${temporaryUser.email}'`);
      } catch (error) {
        throw new GraphQLError(
          'This email address may already be registered as temporary user.',
        );
      }
    },
  },
  ...customScalars,
};
