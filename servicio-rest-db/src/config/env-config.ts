export const envConfig = {
  environment: process.env.NODE_ENV || 'dev',
  port: () => {
    if (!process.env.PORT) throw new Error('Env variable PORT is missing');

    return +(process.env.PORT as string);
  },
  databaseUri: () => {
    if (!process.env.DATABASE_URI)
      throw new Error('Env variable DATABASE_URI is missing');
    return process.env.DATABASE_URI as string;
  },
};
