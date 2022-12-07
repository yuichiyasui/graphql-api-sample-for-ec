/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents NULL values */
  Void: any;
};

export type CreateItemInput = {
  /** 商品名 */
  name: Scalars['String'];
};

/** 商品 */
export type Item = {
  __typename?: 'Item';
  /** 価格(表示用) */
  displayPrice: Scalars['String'];
  id: Scalars['ID'];
  /** メイン画像URL */
  mainImageUrl: Scalars['String'];
  /** 商品名 */
  name: Scalars['String'];
  /** 価格 */
  price: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 商品を作成する */
  createItem: Item;
  /** 仮ユーザー登録 */
  registerTemporaryUser?: Maybe<Scalars['Void']>;
  /** 本ユーザー登録 */
  registerUser?: Maybe<Scalars['Void']>;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationRegisterTemporaryUserArgs = {
  input: RegisterTemporaryUserInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  /** 仮ユーザートークンが有効かどうか */
  isValidTemporaryUserToken: Scalars['Boolean'];
  /** 商品一覧 */
  items: Array<Item>;
};


export type QueryIsValidTemporaryUserTokenArgs = {
  token: Scalars['String'];
};

export type RegisterTemporaryUserInput = {
  /** メールアドレス */
  email: Scalars['String'];
};

export type RegisterUserInput = {
  /** 確認用パスワード */
  confirmationPassword: Scalars['String'];
  /**
   * パスワード
   * - 8桁以上100桁以下
   * - 英大文字, 小文字, 数字, 記号のうちいずれか3種類を含む
   * - 使用可能な記号 -> !@;:+_%&$#<>-
   */
  password: Scalars['String'];
  /** 仮ユーザートークン */
  temporaryUserToken: Scalars['String'];
  /** ユーザー名 */
  userName: Scalars['String'];
};

export type AllItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, price: number, displayPrice: string, mainImageUrl: string }> };

export type RegisterTemporaryUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RegisterTemporaryUserMutation = { __typename?: 'Mutation', registerTemporaryUser?: any | null };


export const AllItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"displayPrice"}},{"kind":"Field","name":{"kind":"Name","value":"mainImageUrl"}}]}}]}}]} as unknown as DocumentNode<AllItemsQuery, AllItemsQueryVariables>;
export const RegisterTemporaryUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTemporaryUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerTemporaryUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}]}}]} as unknown as DocumentNode<RegisterTemporaryUserMutation, RegisterTemporaryUserMutationVariables>;