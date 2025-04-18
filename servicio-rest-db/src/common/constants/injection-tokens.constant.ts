export const INJECTION_TOKENS = {
  // USERS MODULE
  USERS_REPOSITORY: Symbol('USERS_REPOSITORY'),
  USERS_SERVICE: Symbol('USERS_SERVICE'),

  // WALLETS MODULE
  WALLETS_SERVICE: Symbol('WALLETS_SERVICE'),
  WALLETS_REPOSITORY: Symbol('WALLETS_REPOSITORY'),

  // PAYMENTS MODULE
  PAYMENTS_SERVICE: Symbol('PAYMENTS_SERVICE'),
  PAYMENTS_REPOSITORY: Symbol('PAYMENTS_REPOSITORY'),

  // EXTERNAL MODULE
  EMAIL_ADAPTER: Symbol('EMAIL_ADAPTER'),
} as const;
