/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Ami zod error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    amiError: err,
  });
};

export default globalErrorHandler;

// pattern

/*
Success
Message
errorSources: [
  Path: ‘ ’,
  Message: ‘ ’
]
Stack

*/
