// HTTP CORS configuration
export const httpCorsConfiguration = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Websocket CORS configuration
export const websocketCorsConfiguration = {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
};
