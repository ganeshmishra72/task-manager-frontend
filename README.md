🚀 Task Manager Frontend

A modern and responsive Task Management Web Application Frontend built using Next.js, designed to interact with a secure REST API backend. This application allows users to register, login, and manage their tasks with proper authentication and role-based access.

---

📌 Live Demo

🌐 Frontend URL: https://your-app.vercel.app
🔗 Backend API: https://your-backend.onrender.com/api/v1

---

🛠 Tech Stack

- ⚡ Next.js (App Router)
- ⚛️ React.js
- 🔄 React Query (API state management)
- 🗂 Zustand (Global state management)
- 🌐 Axios (HTTP requests)
- 🎨 Basic CSS / Tailwind (if used)

---

✨ Features

🔐 Authentication

- User Registration
- User Login with JWT
- Secure token storage
- Protected routes

📊 Dashboard

- View all tasks
- Create new tasks
- Delete tasks
- Dynamic UI updates using React Query

🔒 Security

- JWT-based authentication
- Protected routes (Dashboard access)
- API request authorization headers

---

📁 Project Structure

src/
 ├── app/
 │   ├── login/
 │   ├── register/
 │   ├── dashboard/
 │   └── layout.js
 ├── components/
 │   ├── TaskForm.jsx
 │   ├── TaskList.jsx
 ├── services/
 │   └── api.js
 ├── store/
 │   └── authStore.js

---

⚙️ Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/ganeshmishra72/task-manager-frontend.git
cd task-manager-frontend

2️⃣ Install Dependencies

npm install

3️⃣ Environment Variables

Create a ".env.local" file in the root:

NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1

---

4️⃣ Run the Application

npm run dev

App will run on:

http://localhost:3000

---

🔗 API Integration

All API calls are handled using Axios with JWT token support.

Example:

Authorization: Bearer <token>

---

🔐 Authentication Flow

1. User logs in via "/login"
2. JWT token is stored in Zustand
3. Token is attached to every API request
4. Protected routes redirect unauthenticated users

---

⚡ Deployment

🌐 Frontend Deployment

- Deployed on Vercel
- Auto-deploy on Git push

🔙 Backend

- Spring Boot backend deployed on Render (Dockerized)

---

🚀 Future Improvements

- Role-based UI (Admin vs User)
- Task update feature
- Pagination & filtering
- UI enhancements (Material UI / Tailwind)
- Better error handling UI (Toasts)

---

📸 Screenshots

Add your UI screenshots here for better presentation

---

🧠 Scalability Note

- Can be extended into a microservices architecture
- React Query enables efficient caching and API handling
- Zustand ensures lightweight global state management
- Easily scalable for larger applications

---

👨‍💻 Author

Ganesh Mishra

- GitHub: https://github.com/ganeshmishra72

---

💥 Final Note

This project demonstrates:

- Clean frontend architecture
- Secure API integration using JWT
- Scalable state management
- Production-ready deployment setup

---

⭐ If you like this project, give it a star!
