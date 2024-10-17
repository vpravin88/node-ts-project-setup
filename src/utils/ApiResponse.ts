/**
 * Represents a standardized API response.
 */
class ApiResponse<T = unknown> {
   public statusCode: number;
   public data: T;
   public message: string;
   public isSuccess: boolean;

   /**
    * Creates an instance of ApiResponse.
    * @param statusCode - The HTTP status code of the response.
    * @param data - The response data.
    * @param message - A message describing the response (defaults to "Success").
    */
   constructor(statusCode: number, data: T, message = 'Success') {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.isSuccess = statusCode < 400;
   }
}

export default ApiResponse;
