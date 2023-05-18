

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_NAME: string;
      DATABASE_URI: string;
      JWT_SECRET_KEY: string;
      CORS_ORIGIN: string;
    }
  }
}
