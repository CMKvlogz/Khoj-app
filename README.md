# Khoj — Missing Persons Network

## Before deploying
1. Create a free Supabase project at https://supabase.com (no billing/card required).
2. In the SQL Editor, run the setup query from `supabase-setup.sql` to create the table.
3. Copy your Project URL and anon public key into `src/supabase.js` (replace the placeholder values).
4. Push this folder to GitHub, then import it in Vercel or Netlify — they'll run
   `npm install` and `npm run build` automatically. No local setup needed.

## Local development (optional, only if you have Node.js installed)
```
npm install
npm run dev
```
