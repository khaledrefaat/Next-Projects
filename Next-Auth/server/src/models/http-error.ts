export default class HttpError extends Error {
  constructor(message: string, readonly code: number) {
    super(message);
  }
}
