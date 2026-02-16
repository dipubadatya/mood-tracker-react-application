PROJECT:  Mood Tracker – React Application

A clean and responsive React application that allows users to log their daily moods and visualize emotional trends over time using charts.

This project demonstrates practical React state management, data persistence, and data visualization techniques.

🚀 Features:

Daily mood logging

Persistent data using Local Storage

Mood trend visualization with chart library

State management using React Hooks

Clean and responsive user interface

🛠 Tech Stack

React.js

JavaScript (ES6+)

Chart Library (Recharts / Chart.js)

Local Storage API

Vite 

📂 Project Structure :

mood-tracker/
│
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md


📦 Installation & Setup :

Follow these steps to run the project locally.

1. Clone the repository
git clone https://github.com/your-username/mood-tracker.git

2. Navigate into the project directory
cd mood-tracker

3. Install dependencies
npm install

4. Start the development server
npm run dev


After running the command, open your browser and visit:

http://localhost:5173


📊 How It Works:

Mood Logging

Users can select and log their daily mood. Each entry is stored along with the date.

Data Persistence

Mood data is stored in the browser using Local Storage. Data remains saved even after refreshing the page.

State Management

The application uses:

useState for managing mood entries

useEffect for loading and syncing data with Local Storage

Chart Visualization

The chart updates dynamically whenever new mood data is added, showing emotional trends over time.

🏗 Build for Production

To create a production build:

npm run build


To preview the production build locally:

npm run preview

