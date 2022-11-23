import Validator from 'validatorjs';

export const isPasswordValidFormat = ({
  password,
  confirmationPassword,
}: {
  password: string;
  confirmationPassword: string;
}) => {
  const smallAlphabetPattern = '(?=.*[a-z])' as const;
  const largeAlphabetPattern = '(?=.*[A-Z])' as const;
  const numberPattern = '(?=.*[0-9])' as const;
  const symbolPattern = '(?=.*[!@;:+_%&$#<>-])' as const;
  const smallAndLargeAndNumber =
    `${smallAlphabetPattern}${largeAlphabetPattern}${numberPattern}` as const;
  const smallAndLargeAndSymbol =
    `${smallAlphabetPattern}${largeAlphabetPattern}${symbolPattern}` as const;
  const largeAndNumberAndSymbol =
    `${largeAlphabetPattern}${numberPattern}${symbolPattern}` as const;
  const smallAndNumberAndSymbol =
    `${smallAlphabetPattern}${numberPattern}${symbolPattern}` as const;

  const validator = new Validator(
    { password, password_confirmation: confirmationPassword },
    {
      password: [
        'confirmed',
        'min:8',
        'max:100',
        `regex:/${smallAndLargeAndNumber}|${smallAndLargeAndSymbol}|${largeAndNumberAndSymbol}|${smallAndNumberAndSymbol}/`,
      ],
    },
  );

  return validator.passes();
};
