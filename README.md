# Foodies

A modern food sharing web application built with **Next.js**, using a **PostgreSQL** database (hosted on Render) and **AWS S3** for image storage. The site is deployed and live on **Vercel**.

---

## Features

- **Next.js App Router** for fast, modern React-based routing
- **PostgreSQL** for robust, scalable data storage (cloud-hosted on Render)
- **AWS S3** for secure, scalable image uploads and serving
- **Server Actions** and modern React features (e.g., async/await, useFormState)
- **Image upload** with preview and validation
- **Beautiful UI** with custom backgrounds and SVG effects
- **Deployed on Vercel** for global, production-grade hosting

---

## Tech Stack

- **Frontend:** Next.js (React 19), App Router, CSS Modules
- **Database:** PostgreSQL (hosted on Render)
- **Image Storage:** AWS S3
- **ORM/DB Client:** `pg` (node-postgres)
- **Deployment:** Vercel

---

## Environment Variables

Create a `.env.local` file in your project root with:

```
PGUSER=your_pg_user
PGPASSWORD=your_pg_password
PGDATABASE=your_pg_db
PGHOST=your_pg_host
PGPORT=5432
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

---

## Local Development

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up your database:**
   - Use the provided `initpg.js` script to seed your PostgreSQL database with dummy data.
   - Make sure your database is running locally or update `.env.local` to point to your Render database.
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. **Visit:** [http://localhost:3000](http://localhost:3000)

---

## Image Uploads

- Images are uploaded directly to AWS S3 and served from your S3 bucket.
- Make sure your S3 bucket is public/readable for image URLs to work.

---

## Deployment

- The site is deployed on [Vercel](https://vercel.com/).
- Update your environment variables in the Vercel dashboard to match your `.env.local`.
- Push to your main branch to trigger a new deployment.

---

## Credits

- Built with ❤️ using Next.js, PostgreSQL, and AWS S3.
- Database hosting by [Render](https://render.com/).
- Image storage by [AWS S3](https://aws.amazon.com/s3/).
- Deployment by [Vercel](https://vercel.com/).

---

## License

MIT
