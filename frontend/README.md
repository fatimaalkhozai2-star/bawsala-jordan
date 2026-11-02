# 🇯🇴 Bawsala Jordan

**Your Compass to Discover Jordan**

Bawsala Jordan is a bilingual tourism platform designed to help users discover Jordan's most beautiful tourist destinations, explore detailed information about places, save their favorite destinations, and organize personalized trips.

The platform also provides an AI-powered travel assistant that helps users receive travel recommendations and information about Jordan.

## ✨ Features

- **User Authentication:** Secure registration and login using JWT authentication.
- **Destinations:** Explore tourist destinations across Jordan.
- **Search and Filtering:** Search for destinations and filter them by governorate and category.
- **Destination Details:** Explore destination descriptions, images, history, activities, visitor tips, and nearby places.
- **Favorites:** Save and manage favorite destinations.
- **Trip Management:** Create, view, edit, and delete personal trips.
- **AI Travel Assistant:** Get travel recommendations and information about Jordan using AI.
- **Admin Dashboard:** View platform statistics and administrative information.
- **Analytics Charts:** Visualize trips by month and destinations by category using Chart.js.
- **Role-Based Access Control:** Different permissions for administrators and regular users.
- **Bilingual Interface:** Arabic and English language support with RTL and LTR layouts.
- **Location Information:** View destination coordinates and access map links.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Chart.js
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- MVC Architecture

## 📁 Project Structure

```text
bawsala-jordan/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
│
└── README.md
```

## 🚀 Deployment

Bawsala Jordan is designed to be deployed online, allowing users to access the platform through a web browser.

The deployment includes hosting the frontend application, backend server, and connecting the backend to a cloud-based MongoDB database.

### Live Application

- **Frontend URL:** [Add your deployed frontend URL]
- **Backend API URL:** [Add your deployed backend URL]

### Environment Configuration

The application uses environment variables to securely manage database connections, authentication secrets, and external API keys.

Sensitive configuration files such as `.env` are excluded from the public GitHub repository to protect confidential information.

## 🔐 Authentication and Authorization

The platform uses JSON Web Tokens (JWT) for authentication and protecting private routes and API endpoints.

- Regular users can manage their own favorites and trips.
- Administrators have access to protected administrative functionality.
- Role-based authorization ensures that users can only access features permitted by their roles.

## 🌍 Language Support

Bawsala Jordan supports both Arabic and English languages, providing a bilingual experience with:

- Right-to-Left (RTL) layout for Arabic.
- Left-to-Right (LTR) layout for English.
- Language switching throughout the platform.


## 📌 Future Improvements

- Google Sign-In integration.
- Interactive embedded maps.
- Email notifications.
- Advanced administrative management features.

---

**Bawsala Jordan – Your Compass to Discover Jordan. 🇯🇴**