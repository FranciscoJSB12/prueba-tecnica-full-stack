export const envConfig = {
  environment: process.env.NODE_ENV || 'dev',
  port: () => {
    if (!process.env.PORT) throw new Error('Env variable PORT is missing');

    return +(process.env.PORT as string);
  },
  restServiceDBBaseUrl: () => {
    if (!process.env.REST_SERVICE_DB_BASE_URL)
      throw new Error('Env variables REST_SERVICE_DB_BASE_URL is missing');

    return process.env.REST_SERVICE_DB_BASE_URL;
  },
};
