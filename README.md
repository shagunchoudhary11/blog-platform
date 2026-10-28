# Blog Platform

A blog platform built with Next.js and Supabase.

**Live Demo:** https://blog-platform-flame-sigma.vercel.app

## Features
- User signup and login (Supabase Auth)
- Create, edit, publish/unpublish and delete posts
- Markdown rendering for posts
- Row Level Security (RLS) policies on Postgres
- Public home page showing published posts

## Tech Stack
- Next.js (App Router, TypeScript)
- Supabase (Postgres, Auth, RLS)
- Deployed on Vercel

## Run Locally
1. Clone the repo and run `npm install`
2. Create a `.env.local` file with:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
3. Run `npm run dev`
4. Open http://localhost:3000

## Author
Shagun Choudhary