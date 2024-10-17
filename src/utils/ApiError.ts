/**
 * Custom error class for API errors.
 */
class ApiError extends Error {
   public statusCode: number;
   public data: unknown;

   /**
    * Creates an instance of ApiError.
    * @param statusCode - The HTTP status code associated with the error.
    * @param message - A descriptive error message.
    * @param data - Optional additional data related to the error.
    */
   constructor(statusCode: number, message: string, data?: unknown) {
      super(message);
      this.statusCode = statusCode;
      this.data = data ?? null;

      // Set the prototype explicitly (necessary in ES5 environments).
      Object.setPrototypeOf(this, ApiError.prototype);
   }
}

export default ApiError;
