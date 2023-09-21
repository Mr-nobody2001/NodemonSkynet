class ErrorMessage {
  constructor(error) {
    this.error = true;
    this.message = error.status && error.message || "Error: Internal Server Error";
    this.message_details = error.message_details || null;
    this.status = error.status || "500";
  }
};

export default ErrorMessage;
