# Artify – Creative Artwork Showcase Platform

A modern web platform where artists can upload and display their creative artworks, explore other artist galleries, filter artworks by category, and interact with the community. The platform focuses on elegant UI, smooth user experience, and powerful features for managing creative content.


## 🔗 Live Links

- **Client:** [https://chimerical-crisp-783324.netlify.app](https://chimerical-crisp-783324.netlify.app)
- **Server:** [https://showcase-server.vercel.app](https://showcase-server.vercel.app)

---

## ✨ Core Features

- **Artwork Upload System** – Users can upload artworks with title, image, category, and description
- **Advanced Search & Filtering** – Search artworks by name and filter by categories
- **User Authentication** – Sign up / Login using email & Google Authentication
- **Favorites System** – Users can save artworks to their favorite list
- **Real-time Data Fetching** – Artworks & categories load dynamically from MongoDB server
- **Fully Responsive UI** – Clean, modern, mobile-friendly interface
- **Private Routes** – Protect pages like upload, update, or user favorites
- **Backend API** – Node.js + Express + MongoDB with proper CORS & JWT security

---

## 🛠️ Technologies Used

### Frontend
- **React.js** - Component-based UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Swiper.js** - Modern slider component
- **Firebase Authentication** - User authentication service

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **Vercel** - Serverless deployment platform

---

## 📦 Dependencies

### Client Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "firebase": "^10.7.1",
  "swiper": "^11.0.5",
  "axios": "^1.6.2",
  "react-icons": "^4.12.0"
}
```

### Server Dependencies
```json
{
  "express": "^4.18.2",
  "mongodb": "^6.3.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "jsonwebtoken": "^9.0.2"
}
```

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB Atlas account
- Firebase project with Authentication enabled

---

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/nerobkabir/Showcase-flartform-client.git
cd artify
```

---

### **Step 2: Setup Client (Frontend)**

#### Navigate to client directory
```bash
cd client
```

#### Install dependencies
```bash
npm install
```

#### Create environment variables
Create a `.env.local` file in the client root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000
```

#### Start development server
```bash
npm run dev
```

**Client runs on:** `http://localhost:5173`

---

### **Step 3: Setup Server (Backend)**

Open a new terminal and navigate to server directory:
```bash
cd server
```

#### Install dependencies
```bash
npm install
```

#### Create environment variables
Create a `.env` file in the server root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

#### Start the server
```bash
npm start
# or for development with nodemon
npm run dev
```

**Server runs on:** `http://localhost:5000`

---

### **Step 4: Setup MongoDB Database**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database named `artify`
4. Create collections: `artworks`, `users`, `categories`
5. Get your connection string and add it to server `.env` file

---

### **Step 5: Setup Firebase Authentication**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication → Email/Password and Google Sign-in
4. Get your Firebase config credentials
5. Add them to client `.env.local` file

---

### **Step 6: Access the Application**

Open your browser and visit:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📂 Project Structure
```
artify/
│
├── client/                      # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Images, icons, static files
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ArtworkCard.jsx
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AddArtwork.jsx
│   │   │   ├── MyArtworks.jsx
│   │   │   ├── Favorites.jsx
│   │   │   └── ...
│   │   ├── routes/             # Route configuration
│   │   │   ├── Routes.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/            # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── firebase/           # Firebase config
│   │   │   └── firebase.config.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.local
│   ├── package.json
│   └── vite.config.js
│
└── server/                      # Backend Node.js Application
    ├── config/
    │   └── db.js               # Database connection
    ├── middleware/
    │   └── auth.js             # JWT authentication
    ├── models/
    │   ├── Artwork.js
    │   └── User.js
    ├── routes/
    │   ├── artworks.js
    │   ├── auth.js
    │   └── favorites.js
    ├── .env
    ├── server.js               # Main server file
    └── package.json
```

---

## 🌐 API Endpoints

### Artworks
- `GET /api/artworks` - Fetch all artworks
- `GET /api/artworks/:id` - Get single artwork details
- `POST /api/artworks` - Upload new artwork (Protected)
- `PUT /api/artworks/:id` - Update artwork (Protected)
- `DELETE /api/artworks/:id` - Delete artwork (Protected)

### Categories
- `GET /api/categories` - Fetch all categories

### Favorites
- `GET /api/favorites/:email` - Get user favorites (Protected)
- `POST /api/favorites` - Add to favorites (Protected)
- `DELETE /api/favorites/:id` - Remove from favorites (Protected)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

---


## 🙏 Acknowledgments

- React.js Documentation
- MongoDB Documentation
- Firebase Documentation
- Tailwind CSS
- Swiper.js

---

**Made with ❤️ by Kabir Hossain**
