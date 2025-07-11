📝 Personal Blog – Fullstack Next.js + MongoDB
This is a personal blog platform built with Next.js App Router, MongoDB, and JWT authentication. It is designed for a single admin user (Toby) to manage blog content, with public read-only access for guests.

✨ Features
🧑‍💻 Single Admin Access – Only one admin (username: Toby, password: toby123) can create, update, or delete posts.

🖊️ Rich Text Editor – Posts are created using React Draft WYSIWYG, allowing rich formatting (bold, italic, images, etc.).

🔐 Hidden Login Page – The login page is not linked or visible anywhere on the site. Admin must visit /login manually (similar to WordPress behavior).

👀 Public Post Viewing – Guests can read all blog posts but cannot add, edit, or delete any content.

📂 Admin Dashboard – Authenticated admin is redirected to /dashboard, which includes:

Post list with edit/delete buttons

Form to create a new post

🧠 SEO-friendly Slugs – Every post has a dynamic route like /post/my-blog-title.

🧾 Dynamic Meta Tags – Each post has its own meta title and description for SEO.

🍪 Authentication with JWT – Tokens are stored in HTTP-only cookies for secure session handling.

🛡️ Protected API Routes – Only authenticated users (admin) can access post creation, editing, and deletion endpoints.

🛢️ MongoDB Integration – Posts and user data are stored in MongoDB Atlas.

🛠️ Tech Stack
Frontend: Next.js (App Router), React, CSS / CSS Modules

Editor: react-draft-wysiwyg

Database: MongoDB with Mongoose

Authentication: JWT + HTTP-only cookies

Deployment: Vercel

Sanitization: dompurify, html-to-draftjs, and draftjs-to-html

🚫 Responsiveness
This project is currently not responsive and is optimized for desktop viewing only. Mobile layout and responsiveness have not been implemented

⚠️ Deployment Notes
MongoDB Atlas Connection:
This project requires a live MongoDB Atlas connection. To allow the deployed app (e.g., on Vercel) to connect to the database, you must temporarily whitelist all IP addresses using 0.0.0.0/0 in your MongoDB Atlas Network Access settings.

Warning: This is not secure for production. Always restrict access to trusted IPs only.

Post Content Limitation:
Currently, only the first paragraph of post content is displayed on the post listing page (/). Additional content beyond the first paragraph does not render. This can be improved in future iterations to support full content previews or markdown parsing.
