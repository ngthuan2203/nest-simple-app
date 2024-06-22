export interface ResponseFormat<T> {
  statusCode: number;
  message: string | string[];
  data: T;
  meta?: unknown;
}
