import { isPasswordValidFormat } from './validation';

describe('isPasswordValidFormat', () => {
  test('英大文字小文字数字記号のいずれか3種類以上を含む8桁以上ならtrueを返す', () => {
    expect(
      isPasswordValidFormat({
        password: 'hogeHOGE123',
        confirmationPassword: 'hogeHOGE123',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'hogeHOGE@',
        confirmationPassword: 'hogeHOGE@',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'HOGE123@',
        confirmationPassword: 'HOGE123@',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'hoge123@',
        confirmationPassword: 'hoge123@',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'hoge123!',
        confirmationPassword: 'hoge123!',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'hoge123@',
        confirmationPassword: 'hoge123@',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'hoge123;',
        confirmationPassword: 'hoge123;',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'hoge123_',
        confirmationPassword: 'hoge123_',
      }),
    ).toBe(true);
    expect(
      isPasswordValidFormat({
        password: 'hoge123-',
        confirmationPassword: 'hoge123-',
      }),
    ).toBe(true);
  });

  test('パスワードが確認用パスワードと一致しない場合falseを返す', () => {
    expect(
      isPasswordValidFormat({
        password: 'hogeHOGE1234',
        confirmationPassword: 'hogeHOGE123',
      }),
    ).toBe(false);
  });

  test('英大文字小文字数字記号のいずれか3種類未満の場合falseを返す', () => {
    expect(
      isPasswordValidFormat({
        password: 'hogeHOGE',
        confirmationPassword: 'hogeHOGE',
      }),
    ).toBe(false);
    expect(
      isPasswordValidFormat({
        password: 'hoge1234',
        confirmationPassword: 'hoge1234',
      }),
    ).toBe(false);
    expect(
      isPasswordValidFormat({
        password: 'hoge@@@@',
        confirmationPassword: 'hoge@@@@',
      }),
    ).toBe(false);
    expect(
      isPasswordValidFormat({
        password: 'HOGE@@@@',
        confirmationPassword: 'HOGE@@@@',
      }),
    ).toBe(false);
    expect(
      isPasswordValidFormat({
        password: '@@@@1234',
        confirmationPassword: '@@@@1234',
      }),
    ).toBe(false);
  });

  test('桁数が8桁未満の場合falseを返す', () => {
    expect(
      isPasswordValidFormat({
        password: 'hH1@',
        confirmationPassword: 'hH1@',
      }),
    ).toBe(false);
  });

  test('使用可能な記号以外は記号1種類としてカウントされないためfalseを返す', () => {
    expect(
      isPasswordValidFormat({
        password: 'hogeHoge,',
        confirmationPassword: 'hogeHoge,',
      }),
    ).toBe(false);
  });
});
