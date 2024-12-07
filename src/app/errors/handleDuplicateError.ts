import { TErrorSources, TGenericErrorResponse } from '../interface/error';

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
