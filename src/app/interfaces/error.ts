export type TErrorSource = {
  path: string | number;
  message: string;
}[];

//generic type
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};