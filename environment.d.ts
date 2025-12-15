/* eslint-disable @typescript-eslint/no-unused-vars */
import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BASE_URL: string;
    }
  }
}
