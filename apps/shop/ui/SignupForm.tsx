'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

const schema = zod.object({
  userName: zod.string(),
  password: zod.string(),
  confirmationPassword: zod.string(),
});
type Schema = zod.infer<typeof schema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const id = useId();
  const inputUserNameId = `${id}-user-name`;

  return (
    <form
      noValidate
      className="mx-auto max-w-xl border border-gray-100 bg-white p-8 text-center"
    >
      <h2 className="mb-4 text-lg font-bold">会員登録</h2>
      <p className="mb-4 text-sm">会員情報を入力してください</p>
      <div className="mb-4">
        <div className="form-control mb-2">
          <label className="label mx-auto w-full max-w-xs flex-col">
            <span className="label-text mb-2 text-sm font-bold">
              ユーザー名
            </span>
            <input
              id={inputUserNameId}
              type="text"
              placeholder="買い物太郎"
              required
              className="input input-bordered input-md w-full text-center placeholder:text-center"
              {...register('userName', { required: true })}
            />
          </label>
          <small className="text-gray-500">
            サイト内で表示される名前として使用されます
          </small>
        </div>
        <div className="form-control mb-2">
          <label className="label mx-auto w-full max-w-xs flex-col">
            <span className="label-text mb-2 text-sm font-bold">
              パスワード
            </span>
            <input
              type="password"
              placeholder="パスワードを入力"
              className="input input-bordered input-md w-full text-center placeholder:text-center"
              {...register('password', { required: true })}
            />
          </label>
          <div className="mx-auto flex max-w-xs flex-col rounded border border-yellow-200 bg-yellow-100 p-2 text-left">
            <p className="mb-1 text-xs font-bold">パスワードの設定ルール</p>
            <ul className="list-disc pl-4 text-xs">
              <li>8桁以上</li>
              <li>英大文字, 小文字, 数字, 記号のうちいずれか3種類以上を含む</li>
              <li>
                使用可能な記号は
                <code className="ml-1 inline-block whitespace-nowrap rounded border border-gray-200 bg-gray-100 px-2 text-xs">
                  {'!@;:+_%$#<>-'}
                </code>
              </li>
            </ul>
          </div>
        </div>
        <div className="form-control mb-2">
          <label className="label mx-auto w-full max-w-xs flex-col">
            <span className="label-text mb-2 text-sm font-bold">
              パスワードの再確認
            </span>
            <input
              type="password"
              placeholder="パスワードを再度入力"
              className="input input-bordered input-md w-full text-center placeholder:text-center"
              {...register('confirmationPassword', { required: true })}
            />
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-accent text-white">
        登録
      </button>
    </form>
  );
};
