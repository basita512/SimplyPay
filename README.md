# SimplyPay 💸

<div align="center">
  <img src="Frontend/public/logo.png" alt="SimplyPay Logo" width="200"/>
  <p>A MERN application for seamless money transfers and wallet management.</p>
</div>

## ⚠️ Disclaimer

This is a learning project and not an actual wallet application. It was created for educational purposes to demonstrate:
- Full-stack development with React and Node.js
- User authentication and authorization
- Database management with MongoDB
- State management in React

Please do not use this for real financial transactions.

## 🌟 Features

- **User Authentication**: Secure signup and signin functionality
- **Wallet Management**: Check your balance and transaction history
- **Money Transfer**: Easy money transfer to other users
- **User Search**: Find other users quickly with search functionality
- **Profile Management**: Update your profile information
- **Real-time Balance**: Track your wallet balance in real-time

### Installation

1. Clone the repository

```bash
git clone https://github.com/basita512/Simpli-Pay.git
cd SimplyPay
```

2. Install Frontend Dependencies
```bash
cd Frontend
npm install
```

3. Install Backend Dependencies
```bash
cd Backend
npm install
```

4. Set up environment variables
```env
# In Backend/.env
JWT_SECRET=your_jwt_secret
PORT=3000
MONGODB_URI=mongodb://localhost:27017/Payment-App
```

### Running the Application

1. Start MongoDB service

2. Start Backend Server
```bash
cd Backend
npm start
```

3. Start Frontend Development Server
```bash
cd Frontend
npm run dev
```

## 🔒 API Endpoints

### User Routes
- `POST /api/v1/user/sign-up`: Register new user
- `POST /api/v1/user/sign-in`: User login
- `PUT /api/v1/user/update`: Update user profile
- `GET /api/v1/user/search`: Search users
- `GET /api/v1/user/me`: Get current user

### Account Routes
- `GET /api/v1/account/balance`: Get wallet balance
- `POST /api/v1/account/transfer`: Transfer money

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

