Job Portal - MERN Stack 🚀

A full-featured Job Portal built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with Redux Toolkit for state management and React Router for seamless navigation. This platform enables job seekers to find and apply for jobs while recruiters can post and manage job applications. Job seekers can also track their application status (Pending, Accepted, Rejected).

🔹 Features

For Job Seekers 👨‍💼👩‍💼

✅ User Authentication (Sign up/Login)

✅ Browse available job listings

✅ Apply for jobs with one click

✅ View applied jobs & track application status (Pending, Accepted, Rejected)

✅ Check job application details (Job Title, Location, Date Applied, Status)

✅ Edit & update profile details

✅ Seamless navigation with React Router

For Recruiters 🏢

✅ Edit & update profile details

✅ Recruiter Authentication (Sign up/Login)

✅ Post new job listings

✅ View & manage job applications

✅ Update application status (Pending, Accepted, Rejected)

General Features

✅ Secure authentication with JWT & cookies

✅ Persistent login with Redux-Persist

✅ Global state management using Redux Toolkit

✅ Job filtering based on location & role

✅ Responsive UI with Tailwind CSS

✅ Toast notifications for feedback

✅ Dynamic routing with React Router

🔹 Tech Stack

Frontend: React.js, Redux Toolkit, React Router, Tailwind CSS

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT (JSON Web Tokens), Cookies

State Management: Redux Toolkit

API Calls: Axios

UI Components: ShadCN UI, Lucide-React Icons

🔹 How to Set Up the Project Locally

👉 Clone the Repository

git clone https://github.com/your-username/job-portal.git
cd job-portal

👉 Set Up the Backend

cd backend
npm install

Create a .env file in the backend folder and add:

PORT=your port
MONGO_URI= your mongo db connection string
JWT_SECRET=your_jwt_secret

Start the backend server:

npm start

👉 Set Up the Frontend

cd ../frontend
npm install

Start the frontend server:

npm start

👉 Visit the Application

Open your browser and navigate to:

http://localhost:3000
