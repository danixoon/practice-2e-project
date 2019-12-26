export const createError = (error: Error, status: number): Error & { status: number } => {
  return { ...error, status };
};
