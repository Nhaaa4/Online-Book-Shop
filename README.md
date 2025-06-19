# Book-Online-Shop
## I. Introduction
This project is a full stack web application designed for a bookshop. It provides an intuitive interface for customers to browse and purchase books online, while offering a secure admin panel for managing inventory, orders, and customer data. The system is built using modern web technologies and backed by a relational database to ensure efficient data storage, retrieval, and management.

## II. Tech Stack
| Layer        | Technology                    |
|--------------|-------------------------------|
| Frontend     | React.js + Tailwind CSS       |
| Backend      | Node.js + Express.js          |
| Database     | PostgreSQL with Sequelize ORM |
| Auth         | JWT-based authentication      |

## III. Installation
### 1. Prerequisites
- Node.js v18+
- PostgreSQL installed
- npm
---
### 2. Clone the project
```bash
git clone https://github.com/Nhaaa4/Book-Online-Shop.git
cd Book-Online-Shop
```
---
### 3. Backend Setup
1. Install depandancies
```bash
cd backend
npm install
```
2. Environment Setup: Create a `.env` file in `/backend` (Using variables like `.env.example` file)
3. Database Setup 
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
4. Start Backend
```bash
npm run dev
```
---
### 4. Frontend Setup
1. Install depandancies
```bash
cd frontend
npm install
```
2. Environment Setup: Create a `.env` file in `/frontend` (Using variables like `.env.example` file)
3. Start Frontend
```bash
npm run dev
```