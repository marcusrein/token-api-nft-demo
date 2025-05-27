import axios from "axios";
import logger from "./logger";

const BASE_URL =
  typeof window === "undefined"
    ? "https://token-api.service.stage.pinax.network"
    : "/api/token";

const tokenApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

tokenApi.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_TOKEN_API_JWT_KEY || process.env.NEXT_PUBLIC_TOKEN_API_KEY;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const msgReq = `[TokenAPI][REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`;
  // eslint-disable-next-line no-console
  console.info(msgReq);
  logger.log({
    type: "request",
    method: config.method?.toUpperCase(),
    url: config.url,
  });
  return config;
});

tokenApi.interceptors.response.use(
  (response) => {
    const msgRes = `[TokenAPI][RESPONSE] ${response.status} ${response.config.url}`;
    // eslint-disable-next-line no-console
    console.info(msgRes);
    logger.log({
      type: "response",
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error("[TokenAPI][ERROR]", error.message, error.config?.url);
    logger.log({
      type: "error",
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  },
);

export default tokenApi;
