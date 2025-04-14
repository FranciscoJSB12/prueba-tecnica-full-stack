export const envVariables = {
  port: () => {
    const envVar = import.meta.env.VITE_API_BASE_URL;

    if (!envVar)
      throw new Error(
        "API_BASE_URL is missing, set up a .env file with this variable"
      );

    return envVar;
  },
};
