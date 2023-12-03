/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource } from '../interfaces/error';

export const handleDuplicateError = (err: any) => {
  const match = err?.message.match(/"([^"]*)"/);
  const extractMessage = match && match[1];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractMessage} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate entry',
    errorSources,
  };
};
