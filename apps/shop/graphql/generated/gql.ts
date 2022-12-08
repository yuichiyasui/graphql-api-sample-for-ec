/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query AllItems {\n  items {\n    id\n    name\n    price\n    displayPrice\n    mainImageUrl\n  }\n}": types.AllItemsDocument,
    "mutation RegisterTemporaryUser($email: String!) {\n  registerTemporaryUser(input: {email: $email})\n}": types.RegisterTemporaryUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllItems {\n  items {\n    id\n    name\n    price\n    displayPrice\n    mainImageUrl\n  }\n}"): (typeof documents)["query AllItems {\n  items {\n    id\n    name\n    price\n    displayPrice\n    mainImageUrl\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterTemporaryUser($email: String!) {\n  registerTemporaryUser(input: {email: $email})\n}"): (typeof documents)["mutation RegisterTemporaryUser($email: String!) {\n  registerTemporaryUser(input: {email: $email})\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;