export interface IApiError {
  statusCode: number;
  message: string;
  errors: string[]; 
  success: boolean;
  stack?: string; 
}
