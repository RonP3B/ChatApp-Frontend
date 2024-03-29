/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_CHATAPP_SOCKET: string;
  VITE_CHATAPP_API: string;
  VITE_CHATAPP_USERS_ENDPOINT: string;
  VITE_CHATAPP_USERS_ACTIVATION_ENDPOINT: string;
  VITE_CHATAPP_CHAT_ENDPOINT: string;
  VITE_CHATAPP_CHAT_USER_LAST_CHECKED_ENDPOINT: string;
  VITE_CHATAPP_MESSAGES_ENDPOINT: string;
  VITE_CHATAPP_CHAT_GROUP_ENDPOINT: string;
  VITE_CHATAPP_SEND_CODE_ENDPOINT: string;
  VITE_CHATAPP_VERIFY_CODE_ENDPOINT: string;
  VITE_CHATAPP_RESET_PASSWORD_ENDPOINT: string;
  VITE_CHATAPP_SIGN_IN_ENDPOINT: string;
  VITE_CHATAPP_LOGOUT_ENDPOINT: string;
  VITE_CHATAPP_REFRESH_TOKEN_ENDPOINT: string;
  VITE_CHATAPP_VALID_REFRESH_TOKEN_ENDPOINT: string;
}
