# 🎓 GradePoint Academic Tracker

**GradePoint** is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to help university students track their courses and grades in real-time. It features a modern, responsive "Dark Mode" UI, secure authentication, and full CRUD capabilities.

---

## 🚀 Live Demo

**Frontend (Vercel):** [https://gradepoint.vercel.app](https://gradepoint.vercel.app)  
**Backend API (Render):** [https://gradepoint-api.onrender.com](https://gradepoint-api.onrender.com)

> **Test Credentials:**  
> **Email:** `test@test.com`  
> **Password:** `123456`

---

## ✨ Features

*   **🔐 Secure Authentication:** User Signup, Login, and Logout using JSON Web Tokens (JWT) stored in HTTP-Only cookies.
*   **📚 Course Management (CRUD):**
    *   **Create:** Add new subjects and grades.
    *   **Read:** View a personalized dashboard of your courses.
    *   **Update:** Edit existing course details.
    *   **Delete:** Remove courses securely.
*   **🛡️ Data Isolation:** Users can only view and manage their own data.
*   **🔑 Password Recovery:** Secure "Forgot Password" flow with email token generation.
*   **🎨 Modern UI:** A responsive, "Perplexity-style" Dark Mode interface using **HeroUI** and **Tailwind CSS**.
*   **🧪 Automated Testing:** Integrated Unit Testing (Vitest) and End-to-End Testing (Cypress).

---

## 🛠️ Tech Stack

### **Frontend**
*   **React.js (Vite):** Fast, component-based UI.
*   **HeroUI (formerly NextUI):** Modern UI component library.
*   **Tailwind CSS:** Utility-first styling.
*   **Axios:** HTTP requests with interceptors.

### **Backend**
*   **Node.js & Express:** RESTful API architecture.
*   **MongoDB Atlas:** Cloud NoSQL database.
*   **Mongoose:** Object Data Modeling (ODM).
*   **Bcrypt:** Password hashing.
*   **JWT:** Session management.

### **DevOps & Testing**
*   **Vercel:** Frontend Hosting (CI/CD).
*   **Render:** Backend Hosting.
*   **Vitest:** Unit Testing.
*   **Cypress:** E2E Testing.
