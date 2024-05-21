export type Result<OK, ERROR = string> = {
  ok?: OK;
  error?: ERROR;
};

export const unwrapResult = <OK, ERROR = string>(result: Result<OK, ERROR>): OK => {
  if (!result.ok) {
    throw result.error;
  }
  return result.ok;
};

export const newOkResult = <OK, ERROR = string>(ok: OK): Result<OK, ERROR> => ({
  ok,
});

export const newErrorResult = <OK, ERROR = string>(error: ERROR): Result<OK, ERROR> => ({ error });
