#  Contact Book Application

A full-stack Contact Book web app that allows users to add, view, and delete contacts.  
The project is built with Node.js + Express (backend) and React + Vite (frontend).

---

##  Features
- Add new contacts with Name, Email, Phone number.
- Validate inputs (email format & 10-digit phone).
- View all saved contacts.
- Delete a contact.
- Responsive frontend design.


##  Project Structure
```
Assign/
│── backend/         # Express.js backend
│   ├── models/      # Mongoose models (Contact schema)
│   ├── routes/      # API routes
│   ├── db.js        # Database connection
│   ├── server.js    # Entry point for backend server
│   └── package.json # Backend dependencies
│
│── frontend/        # React + Vite frontend
│   ├── src/         # React components & pages
│   ├── public/      # Public assets
│   ├── index.html   # Main HTML file
│   └── package.json # Frontend dependencies
```


##  Installation & Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd Assign
```

### 2. Setup Backend
```bash
cd backend
npm install
node server.js
```
- Runs the backend server on http://localhost:5000

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
- Runs the frontend on http://localhost:5173


## Tech Stack
- Frontend: React, Vite, CSS
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)


##  API Endpoints

| Method | Endpoint       | Description         |
|--------|---------------|---------------------|
| GET    | `/contacts`   | Fetch all contacts  |
| POST   | `/contacts`   | Add a new contact   |
| DELETE | `/contacts/:id` | Delete a contact   |


