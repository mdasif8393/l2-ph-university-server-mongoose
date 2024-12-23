import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err?.message.match(/:\s*"(.*?)"/);

  const extractedMessage = match && match[1];

  const statusCode = 400;

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode,
    message: 'Duplicate entry',
    errorSources,
  };
};

export default handleDuplicateError;
