# Tijaabo

A simple responsive website with a Node.js/Express backend and a SQLite database for storing contact form submissions.

## Stack

- **Frontend:** plain HTML, CSS, JS (`index.html`, `style.css`, `script.js`)
- **Backend:** Express (`server.js`)
- **Database:** SQLite via `better-sqlite3` (`data.db`, auto-created on first run)

## Setup

```bash
npm install
cp .env.example .env   # then edit ADMIN_KEY to something private
npm start
```

The site is served at `http://localhost:3000`.

## Features

- Public site (`index.html`) with a working contact form that saves messages to SQLite via `POST /api/contact`.
- Admin page (`admin.html`) to view submitted messages, protected by an admin key (`GET /api/messages`, requires `x-admin-key` header or `?key=` query param matching `ADMIN_KEY`).

## API

| Method | Endpoint       | Description                          |
|--------|----------------|---------------------------------------|
| POST   | `/api/contact` | Save a contact message (name, email, message) |
| GET    | `/api/messages`| List all messages (requires admin key) |

## Notes

- `data.db` and `.env` are git-ignored — the database file is created automatically on first run.
- Change `ADMIN_KEY` in `.env` before deploying anywhere public.
