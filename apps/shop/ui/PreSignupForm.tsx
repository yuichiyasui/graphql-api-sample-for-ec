'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { RegisterTemporaryUserDocument } from 'graphql/generated/graphql';
import { graphqlRequestClient } from '~/libs/graphql-request';

const schema = zod.object({
  email: zod.string().email('メールアドレスの形式が不正です'),
});
type Schema = zod.infer<typeof schema>;

const Wrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section className="text-center border border-gray-100 max-w-xl mx-auto p-8 bg-white">
      <h2 className="font-bold text-lg text-center mb-4">{title}</h2>
      {children}
    </section>
  );
};

export const PreSignupForm = () => {
  const [hasError, setHasError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSentEmail, setIsSentEmail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const id = useId();
  const inputEmailId = `${id}-email`;
  const inputEmailErrorMessageId = `${id}-email-error`;

  const sendEmail = async (input: { email: string }) => {
    try {
      setIsSending(true);
      await graphqlRequestClient.request(RegisterTemporaryUserDocument, input);
      setIsSentEmail(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsSending(false);
    }
  };

  if (hasError) {
    return (
      <Wrapper title="メールの送信に失敗しました">
        <p className="text-sm mb-4">
          既にメールアドレスが登録されている可能性があります。
          <br />
          パスワードが不明な場合はパスワードの再設定をお試しください。
        </p>
        {/* TODO: パスワード再設定ページ作成時にパスを変更する */}
        <Link href="/" className="btn btn-primary text-white mb-2">
          パスワードを再設定する
        </Link>
        <p className="mb-2 text-sm">もしくは</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setHasError(false);
          }}
          className="btn btn-primary btn-outline"
        >
          別のメールアドレスで登録する
        </button>
      </Wrapper>
    );
  }

  if (!isSentEmail) {
    return (
      <form
        onSubmit={handleSubmit((d) => sendEmail(d))}
        noValidate
        className="text-center border border-gray-100 max-w-xl mx-auto p-8 bg-white"
      >
        <h2 className="font-bold text-lg mb-4">メールアドレスによる本人確認</h2>
        <p className="text-sm mb-4">
          本人確認を行うためメールアドレスのご登録をお願いいたします。
          <br />
          ご登録いただいたメールアドレスに本会員登録の
          <br />
          URLを記載したメールを送信いたします。
        </p>
        <div className="form-control mb-2">
          <label className="label flex-col">
            <span className="label-text text-sm font-bold mb-2">
              メールアドレス
            </span>
            <input
              id={inputEmailId}
              type="email"
              placeholder="sample@sample.co.jp"
              aria-describedby={inputEmailErrorMessageId}
              required
              aria-invalid={!!errors.email}
              className={`input input-bordered text-center input-md w-full placeholder:text-center max-w-xs ${
                errors.email ? 'input-error' : ''
              }`}
              {...register('email', { required: true })}
            />
          </label>
        </div>
        <div aria-live="assertive">
          {!!errors.email?.message && (
            <p
              id={inputEmailErrorMessageId}
              className="text-sm text-red-600 mb-4"
            >
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="btn btn-accent text-white"
        >
          メールを送信
        </button>
      </form>
    );
  }

  return (
    <Wrapper title="メールを送信しました">
      <p className="text-sm">
        ご登録いただいたメールアドレスに会員登録用のURLを記載したメールを送信しました。
        <br />
        メールをご確認いただき会員登録を行なってください。
      </p>
    </Wrapper>
  );
};
