# 💰 Rupee: Expense Tracker App

Rupee is a full-stack, modern expense tracking web application built with **Node.js**, **Express**, **MongoDB**, and a sleek frontend interface. It empowers users to **track expenses**, **manage income and savings**, and gain insights through intuitive dashboards.

---

## 📚 Table of Contents

- [📖 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Installation](#-installation)
  - [🔧 Prerequisites](#-prerequisites)
  - [🖥 Backend Setup](#-backend-setup)
  - [🌐 Frontend Setup](#-frontend-setup)
- [🧑‍💻 Usage](#-usage)
- [🛠 API Documentation](#-api-documentation)
- [💬 Contributing](#-contributing)
- [🪪 License](#-license)

---

## 📖 Overview

Rupee is your digital wallet companion. From daily chai expenses to monthly rent, Rupee keeps you on top of your finances. Whether you're budgeting or saving, this app makes money management **simple and transparent**.

---

## ✨ Features

- 🔐 **User Authentication** — Register/Login with secure JWT-based authentication
- 💸 **Expense Tracking** — Add, update, delete, and categorize expenses
- 📈 **Income & Savings** — Monitor your earnings and future savings goals
- 📊 **Insightful Dashboards** — Visualize your spending with charts and stats
- 🧂 **Secure by Default** — Passwords hashed using **bcrypt**

---

## 🚀 Installation

### 🔧 Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 16.x`
- **MongoDB** `>= 6.x`
- **npm** `>= 8.x`

---

### 🖥 Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/HemantMedhsia/ExpenseTracker.git

# 2. Navigate to backend directory
cd ExpenseTracker/backend

# 3. Install dependencies
npm install

# 4. Create a `.env` file in backend/ with the following content:
```

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key
```

```bash
# 5. Start the server
npm start
```

---

### 🌐 Frontend Setup

```bash
# 1. Navigate to frontend directory
cd ExpenseTracker/frontend/expense-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

---

## 🧑‍💻 Usage

1. Open your browser and go to: [http://localhost:5173](http://localhost:5173)
2. Register a new account or log in
3. Begin tracking your expenses, income, and savings
4. Enjoy real-time insights on your spending behavior

---

## 📡 API Documentation

### 🔐 Authentication

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/auth/login`        | Login with credentials |
| POST   | `/auth/register`     | Register new user      |

---

### 💰 Expense Endpoints

| Method | Endpoint                  | Description            |
|--------|---------------------------|------------------------|
| GET    | `/api/expenses`           | Get all expenses       |
| POST   | `/api/expenses`           | Add new expense        |
| GET    | `/api/expenses/:id`       | Get expense by ID      |
| PUT    | `/api/expenses/:id`       | Update an expense      |
| DELETE | `/api/expenses/:id`       | Delete an expense      |

---

### 💵 Income Endpoints

| Method | Endpoint                 | Description           |
|--------|--------------------------|-----------------------|
| GET    | `/api/incomes`           | Get all incomes       |
| POST   | `/api/incomes`           | Add new income        |
| GET    | `/api/incomes/:id`       | Get income by ID      |
| PUT    | `/api/incomes/:id`       | Update an income      |
| DELETE | `/api/incomes/:id`       | Delete an income      |

---

### 🏦 Savings Endpoints

| Method | Endpoint                | Description           |
|--------|-------------------------|-----------------------|
| GET    | `/api/savings`          | Get all savings       |
| POST   | `/api/savings`          | Add new savings       |
| GET    | `/api/savings/:id`      | Get savings by ID     |
| PUT    | `/api/savings/:id`      | Update a savings      |
| DELETE | `/api/savings/:id`      | Delete a savings      |

---

## ✅ Commit Guidelines

- Use the **imperative mood** (e.g., "Add login feature", not "Added login feature")
- Keep first line under 72 characters
- Use a blank line before the body
- Use bullet points in the body for clarity

---

## 💬 Contributing

Pull requests are welcome! Here's how to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit with clear messages
5. Push and create a PR

Let’s make finance tracking better together! 💪

---

## 🪪 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more details.

---

> Made with ❤️ by [Hemant Medhsia](https://github.com/HemantMedhsia)
