export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = '/api/v1/auth'
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const VALID_USER_INFO = `${AUTH_ROUTES}/validuser`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`
export const ALL_USERS = `${AUTH_ROUTES}/users`