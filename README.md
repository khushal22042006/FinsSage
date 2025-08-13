# FinSage – Personal Finance Management Web App

FinSage is a full-stack personal finance tracker that helps users manage their money with ease.  
Built with **Node.js, Express, MongoDB, and EJS**, it offers a secure and modern platform for tracking income, expenses, savings goals, and bill reminders — all in one place.

## 🚀 Features
- **🔐 Secure Authentication** – Registration & login using JWT and HTTP-only cookies.
- **🆔 Custom User IDs** – UUID-based identifiers for consistent data linking.
- **📊 Dashboard Overview** – Income/expense summaries, recent transactions, and savings goal progress.
- **💰 Transaction Management** – Add, view, and filter records by date.
- **🎯 Goal Tracking** – Create and monitor financial goals.
- **⏰ Bill Reminders** – Track recurring payments.
- **🌓 Responsive UI** – Light/dark mode toggle, mobile-friendly design.

## 🛠 Tech Stack
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** EJS, HTML, CSS, JavaScript, Bootstrap
- **Authentication:** JWT, cookie-based sessions
- **Other Tools:** Mongoose, dotenv, Joi validation, UUID

## 📂 Project Structure
FinSage-Project/
│── config/ # Configuration files
│ ├── keys.js
│ ├── mongoose-connection.js
│
│── controllers/ # Controllers for handling requests
│ ├── bill-controller.js
│ ├── dashboard-controller.js
│ ├── goal-controller.js
│ ├── profile-controller.js
│ ├── transaction-controller.js
│ ├── userController.js
│
│── middlewares/ # Middleware functions
│ ├── authMiddleware.js
│ ├── validate.js
│ ├── verifyToken.js
│
│── models/ # Mongoose models
│ ├── bill-model.js
│ ├── goal-model.js
│ ├── notification-model.js
│ ├── transaction-model.js
│ ├── user-model.js
│
│── public/ # Static assets
│ ├── images/
│ │ └── logo.png
│ ├── javascripts/
│ │ ├── add-bill.js
│ │ ├── add-goal.js
│ │ ├── add-transaction.js
│ │ ├── all-bills.js
│ │ ├── all-goals.js
│ │ ├── all-transactions.js
│ │ ├── dashboard.js
│ │ ├── edit-bill.js
│ │ ├── edit-goal.js
│ │ ├── edit-transaction.js
│ │ ├── index.js
│ │ ├── notification.js
│ │ ├── profile.js
│ │ └── update-profile.js
│ ├── stylesheets/
│ ├── add-bill.css
│ ├── add-goal.css
│ ├── add-transaction.css
│ ├── all-bills.css
│ ├── all-goals.css
│ ├── all-transactions.css
│ ├── dashboard.css
│ ├── dashboardmedia.css
│ ├── goal-detail.css
│ ├── index.css
│
│── routes/ # Express routes
│ ├── billRouter.js
│ ├── dashboardRouter.js
│ ├── goalRouter.js
│ ├── index.js
│ ├── notificationRouter.js
│ ├── profileRouter.js
│ ├── transactionRouter.js
│ └── userRouter.js
│
│── utils/ # Utility functions
│ └── generateToken.js
│
│── views/ # EJS templates
│ ├── add-bill.ejs
│ ├── add-goal.ejs
│ ├── add-transaction.ejs
│ ├── all-bills.ejs
│ ├── all-goals.ejs
│ ├── all-transactions.ejs
│ ├── dashboard.ejs
│ ├── edit-bill.ejs
│ ├── edit-goal.ejs
│ ├── edit-transaction.ejs
│ ├── goal-detail.ejs
│ ├── index.ejs
│ ├── notification.ejs
│ ├── profile.ejs
│ └── update-profile.ejs
│
│── .gitignore
│── app.js
│── package.json
│── package-lock.json

## 📸 Preview
<img width="1892" height="881" alt="image" src="https://github.com/user-attachments/assets/cad2a9f7-1740-44aa-9ccd-379bb03a21a1" />
<img width="1897" height="871" alt="image" src="https://github.com/user-attachments/assets/bff5e65d-1d72-476e-89c4-145fcfcd34d8" />
<img width="1901" height="874" alt="image" src="https://github.com/user-attachments/assets/df2677f3-149a-4598-85aa-c90d6083ea5c" />
<img width="1889" height="878" alt="image" src="https://github.com/user-attachments/assets/83625e99-39fc-46b7-b9e2-11498e167f25" />
<img width="1884" height="809" alt="image" src="https://github.com/user-attachments/assets/10637db1-95cd-4972-a34d-66d8a109eb1a" />


## 📬 Contact
**Khushal Sharma** , email-  khushal.22sharma@gmail.com
 



