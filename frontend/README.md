# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Chat frontend integration notes

- Chat API calls use `/api/chats`, `/api/chats/message`, `/api/chats/:chatId/messages`, and `/api/chats/chat/:chatId`.
- Logout calls `POST /api/auth/logout`. If your backend uses a different logout route or HTTP method, update `logout()` in `src/fetures/auth/services/Auth.api.jsx`.
- The dashboard accepts common response wrappers such as `{ chats: [] }`, `{ messages: [] }`, or `{ data: [] }`. If your controllers return different field names, adjust the normalizers in `src/fetures/chat/pages/Dashbord.jsx`.
- Set `baseURL` in the chat and auth API clients to your backend URL before deployment.
