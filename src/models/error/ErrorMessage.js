class ErrorMessage {
  constructor(error) {
    this.error = true;
    this.message = error.code && error.message || "Error: Internal Server error";
    this.message_details = error.message_details || null;
    this.status = error.code || "500";
  }
};

export default ErrorMessage;
