# ApplyTrack

> A focused workspace for turning job applications into a measurable, repeatable search.

ApplyTrack brings applications, resumes, profile information, and job-fit analysis into one place. Instead of losing context across spreadsheets, browser tabs, and disconnected documents, candidates can maintain a clear pipeline, choose the right resume for each role, and use ATS-oriented feedback before they apply.

## What ApplyTrack Does

- **Application pipeline**: Create, search, filter, update, and delete applications in a Kanban-style workflow.
- **Resume library**: Upload resume versions, edit their metadata, choose a default resume, inspect details, and remove outdated files.
- **AI ATS analysis**: Compare a resume with a job description and receive a 0-100 match score, matched and missing keywords, concise suggestions, and categorized ATS issues.
- **Application-level scoring**: Run ATS checks from an application and review the result alongside the role context.
- **Dashboard overview**: See pipeline progress, recent applications, match scores, and ATS score summaries.
- **Profile management**: Keep searchable candidate details and skills ready for matching workflows.
- **Authentication**: Register and sign in with email/password, Google, or GitHub. Sessions use HTTP-only access and refresh cookies.

## Product Flow

1. Create an account and complete your profile.
2. Upload and name the resume versions you actually use.
3. Add a target role with its job description and application details.
4. Run a match analysis to see fit, keywords, and improvement opportunities.
5. Track the application through the pipeline and review momentum from the dashboard.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8, React Router, TanStack Query, Tailwind CSS |
| Backend | Node.js, Express 5, TypeScript |
| Data | MongoDB with Mongoose |
| AI | LangChain with Google Gemini (`gemini-3.5-flash-lite`) |
| Files and media | Multer, Cloudinary, `pdf-parse`, Mammoth |
| Authentication | HTTP-only cookies, JWT, bcrypt, Google OAuth, GitHub OAuth |

## Repository Structure

```text
ApplyTrack/
├── Backend/       Express API, authentication, persistence, uploads, and AI services
└── Frontend/      React application, routes, pages, hooks, and UI components
```

## Requirements

- Node.js 20 or newer recommended
- npm
- MongoDB connection string
- Cloudinary account for resume/profile media
- Google AI API key for ATS and match analysis
- OAuth credentials only if Google or GitHub sign-in is enabled

## Local Setup

Clone the repository and install dependencies in both workspaces:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

Create `Backend/.env` with the following keys:

```dotenv
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SEC=replace_with_a_long_random_secret
REFRESH_TOKEN_SEC=replace_with_a_long_random_secret
ACCESS_EXPIRE_IN=15m
REFRESH_EXPIRE_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GOOGLE_API_KEY=your_google_ai_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
GITHUB_CALLBACK_URL=http://localhost:8080/api/auth/github/callback
```

Create `Frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Keep both `.env` files private. The backend uses `FRONTEND_URL` for credentialed CORS and `CLIENT_URL` for the GitHub OAuth redirect, so both should point to the frontend origin you are running.

## Run Development Servers

Open two terminals from the repository root:

```bash
# Terminal 1
cd Backend
npm run dev
```

```bash
# Terminal 2
cd Frontend
npm run dev
```

The frontend runs on Vite's default port, usually `http://localhost:5173`, and the API listens on port `8080` unless `PORT` is changed.

## Available Scripts

### Backend

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the API with TypeScript watch mode |
| `npm run build` | Compile the backend to `dist/` |
| `npm start` | Run the compiled server |

### Frontend

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## API Surface

The API is organized around these route groups:

| Base path | Scope |
| --- | --- |
| `/api/auth` | Registration, login, refresh, logout, Google, and GitHub authentication |
| `/api/users` | Current user and profile management |
| `/api/v1` | Applications, resumes, and match jobs |
| `/api/dashboard` | Authenticated dashboard summary |

Most resource routes require the authentication cookies created by the auth endpoints. The frontend Axios client is configured with credentials and automatically attempts a refresh when an access token expires.

## Upload and Analysis Notes

- Resume uploads accept PDF, DOC, and DOCX files up to 5 MB.
- PDF and DOCX text is extracted before analysis. Legacy DOC files pass upload validation but are not currently supported by the text extractor.
- ATS analysis is constrained to the supplied resume and job description and returns structured JSON validated by the backend.
- AI-powered endpoints are rate-limited.
- Uploaded media is handled through Cloudinary while resume text is processed by the backend.

## Current Frontend Routes

Public routes include `/`, `/login`, and `/register`. Authenticated workspace routes include `/dashboard`, `/applications`, `/resumes`, `/match-tool`, `/profile/create`, and the related detail, edit, and ATS analysis views.

## Contributing

Keep changes scoped to the appropriate workspace, preserve the existing TypeScript conventions, and run the relevant checks before opening a pull request:

```bash
cd Frontend
npm run lint
npm run build

cd ../Backend
npm run build
```

## License

No project license has been declared yet.