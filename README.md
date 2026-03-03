#  Dog Lips Web Application

An early 2000s themed band website with a modern tech stack.

##  About

This is a modular web application for managing band content including shows, merch, and music. Features an administration panel for bandmates and I to easily keep everything up to date with little dev maintenance.

##  Tech Stack

**Backend**
- Go
- PostgreSQL
- SQL migrations (goose)
- AWS S3 integration

**Frontend**
- TypeScript
- React
- Vite

## Monorepo Structure

```
├── server/          # Go backend API
│   ├── api/         # HTTP handlers
│   ├── service/     # Business logic
│   ├── models/      # Data models
│   └── migrations/  # Database migrations
└── client/          # React frontend
    └── src/
        ├── pages/   # Page components
        ├── components/
        └── api/     # API client
```

## Getting Started

1. Set up your database and environment variables
2. Run migrations
3. Start the Go server
4. Start the React dev server

## Features

- Shows table (upcoming & past)
- Merch store (just linked to bandcamp for now)
- Spotify embed
- Admin panel for content management
- Image uploads with S3

---
