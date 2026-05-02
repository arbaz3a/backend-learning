# 🚀 Backend Development Journey

A structured repository documenting my backend development learning path — from core concepts to a full mini project.

---

## 📁 Folder Structure

```
backend-learning/
│
├── jwt/                  # JSON Web Token auth
├── cookies/              # Cookie-based sessions
├── multer/               # File & image uploads
├── crud/                 # CRUD operations with Express
├── mongoose/             # MongoDB + Mongoose ODM
│
└── mini-project/         # Full social media backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── uploads/
    └── server.js
```

---

## 📚 Concepts Covered

| Topic | What I Learned |
|----------|----------------|
| **JWT** | Token generation, verification, protected routes, expiry |
| **Cookies** | httpOnly, secure flags, cookie-parser, storing JWT in cookie |
| **Multer** | Single/multiple file uploads, storage engine, file validation |
| **CRUD** | Create, Read, Update, Delete endpoints, Postman testing |
| **Mongoose** | Schema design, models, populate, validation |

---

## 🛠️ Mini Project — Social Media Backend

A fully functional REST API where different users can sign up, log in, and manage posts.

### Features

- 🔐 **Auth** — Register & login with JWT stored in httpOnly cookie
- 📝 **Posts** — Create, read, update, delete posts
- ❤️ **Likes** — Like / unlike posts (tracked per user)
- 🖼️ **Uploads** — Image upload on posts using Multer
- 🔒 **Authorization** — Only post owner can edit or delete
- 🧑‍🤝‍🧑 **Multi-user** — Each user sees and interacts independently

### Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB + Mongoose
- **Auth** — JWT + bcrypt + Cookies
- **Uploads** — Multer

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/backend-learning.git
cd backend-learning/mini-project

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start server
npm run dev
```

### .env Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/socialmedia
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

---

## 🔗 API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT cookie |
| POST | `/api/auth/logout` | Clear cookie |

### Posts
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create post (auth required) |
| PUT | `/api/posts/:id` | Update post (owner only) |
| DELETE | `/api/posts/:id` | Delete post (owner only) |
| PUT | `/api/posts/:id/like` | Like / unlike post |
