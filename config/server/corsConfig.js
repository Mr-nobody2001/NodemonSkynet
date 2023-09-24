// HTTP CORS configuration
export const httpCorsConfiguration = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Websocket CORS configuration
export const websocketCorsConfiguration = {
  cors: {
    origin: "http://localhost:5173",
  },
};
