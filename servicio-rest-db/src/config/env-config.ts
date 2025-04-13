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
  gmailAppPassword: () => {
    if (!process.env.GMAIL_APP_PASSWORD)
      throw new Error('Env variable GMAIL_APP_PASSWORD is missing');
    return process.env.GMAIL_APP_PASSWORD as string;
  },
  gmailAddress: () => {
    if (!process.env.GMAIL_ADDRESS)
      throw new Error('Env variable GMAIL_ADDRESS is missing');
    return process.env.GMAIL_ADDRESS as string;
  },
  emailHost: () => {
    if (!process.env.EMAIL_HOST)
      throw new Error('Env variable EMAIL_HOST is missing');
    return process.env.EMAIL_HOST as string;
  },
};
