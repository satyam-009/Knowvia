# Knowvia AI

**Your AI workspace for learning, creating, and solving problems.**

Knowvia AI is a full-stack conversational AI application built with React, Node.js, Express, and MongoDB. It connects a chat interface to a language model through LangChain and includes account authentication, persistent conversations, and a web-search tool.



## Features

- **AI chat:** Send prompts and receive AI-generated responses.
- **Conversation history:** Retrieve previous chats and their messages.
- **Chat management:** Start new conversations and delete existing chats.
- **Authentication:** Register, verify email, log in, retrieve the current user, and log out.
- **AI model integration:** Uses Google Gemini through LangChain for chat responses and Mistral for conversation titles.
- **Web search tool:** Uses Tavily when the agent needs current information.
- **Markdown responses:** Render formatted answers and code snippets in the chat interface.
- **Theme and workspace UI:** Chat sidebar, conversation search UI, profile menu, and theme toggle.
- **Socket.IO setup:** The backend initializes a Socket.IO server for real-time functionality.

## Tech stack

### Frontend
- React
- Vite
- Tailwind CSS
- Redux Toolkit and React Redux
- React Router
- Axios
- Socket.IO Client
- React Markdown, `remark-gfm`, and `react-syntax-highlighter`
- Lucide React

### Backend
- Node.js and Express
- MongoDB and Mongoose
- JSON Web Tokens (JWT)
- `bcryptjs` for password hashing
- Cookie Parser and CORS
- Socket.IO
- Morgan and Chalk for HTTP request logging
- Nodemailer with Gmail OAuth2 for email delivery

### AI and search
- LangChain
- Google Gemini (`@langchain/google`)
- Mistral AI (`@langchain/mistralai`)
- Tavily Search (`@tavily/core`)

## Project structure

```text
Knowvia/
├── backend/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── Controller/
│       ├── middleware/
│       ├── model/
│       ├── routes/
│       ├── services/
│       ├── sockets/
│       └── validators/
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/
│       └── fetures/
│           ├── auth/
│           └── chat/
└── README.md
```

> The folder names above reflect the current project, including `Controller` and `fetures`.

## How it works

1. The user interacts with the React frontend.
2. The frontend calls the Express API for authentication and chat operations.
3. The backend validates protected requests using authentication middleware.
4. MongoDB stores user accounts, conversations, and messages.
5. LangChain sends the conversation to Gemini and can call the Tavily search tool.
6. Mistral generates a concise title for a new conversation.
7. The backend saves and returns the generated response for the frontend to display.

## Getting started

### Prerequisites

Install or prepare:

- [Node.js](https://nodejs.org/) and npm
- A MongoDB database, either local MongoDB or [MongoDB Atlas](https://www.mongodb.com/atlas)
- A Google Gemini API key
- A Mistral API key
- A Tavily API key for web search
- Gmail OAuth2 credentials if you want registration verification emails to work

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Knowvia
```

Replace `<YOUR_REPOSITORY_URL>` with the URL of your Git repository.

### 2. Configure the backend

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret

GOOGLE_GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key

GOOGLE_USER=your_gmail_address
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CLIENT_REFRESH_TOKEN=your_google_oauth_refresh_token

NODE_ENV=development
```

These names match the environment variables referenced in the current backend source. Email-related variables are required for the Gmail OAuth2 mail service. Keep all real values private and never commit your `.env` file.

The current backend CORS configuration allows `http://localhost:5173`, and the backend listens on port `3000`. Update these settings when configuring another local origin or deploying the application.

### 3. Install backend dependencies

Open a terminal in the project root:

```bash
cd backend
npm install
```

Start the backend in development mode:

```bash
npm run dev
```

The server listens at `http://localhost:3000`.

### 4. Install and run the frontend

Open a second terminal:

```bash
cd Knowvia/frontend
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`. Open the URL printed in the terminal.

If you are already in the `Knowvia` directory, use `cd frontend` instead of `cd Knowvia/frontend`.

## API reference

The following routes are mounted by the current backend. Authentication-protected routes require a valid login cookie.

### Authentication — `/api/auth`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register an account and initiate email verification |
| GET | `/api/auth/verify-email` | Public | Verify an email using the token query parameter |
| POST | `/api/auth/login` | Public | Log in and set the authentication cookie |
| POST | `/api/auth/logout` | Public route | Log out and invalidate the session according to the backend implementation |
| GET | `/api/auth/get-me` | Protected | Get the current authenticated user |

### Chats — `/api/chats`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/chats/message` | Protected | Send a message and receive an AI response |
| GET | `/api/chats` | Protected | Fetch the user's conversations |
| GET | `/api/chats/:chatId/messages` | Protected | Fetch messages for a conversation |
| DELETE | `/api/chats/chat/:chatId` | Protected | Delete a conversation |

For request body formats and response examples, refer to the route validators and controller implementations in `backend/src/`.

## Security notes

- Do not commit `.env` files, API keys, OAuth tokens, or database credentials.
- Use a strong, unique `JWT_SECRET`.
- Passwords are hashed before storage.
- Protected routes use authentication middleware.
- Ensure every chat query checks ownership so users cannot read or delete another user's conversations.
- Use HTTPS and appropriate cookie/CORS settings in production.
- Restrict allowed frontend origins before deployment.

## Development scripts

### Backend

| Command | Purpose |
|---|---|
| `npm install` | Install backend dependencies |
| `npm run dev` | Start the backend with Nodemon |

### Frontend

| Command | Purpose |
|---|---|
| `npm install` | Install frontend dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

