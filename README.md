# Edible Mart Web App

A responsive e-commerce application that simplifies the process of booking food orders via a user-friendly form, with a secure admin dashboard for managing and exporting order records.

**Live Demo:** [(https://edible-mart.vercel.app/)]

[Edible Mart Screenshot](./public/edible.png)

---

## Project Overview

Edible Mart is a full-stack web application designed to streamline online food ordering. It features a clean, intuitive interface for customers to place orders and a secure, feature-rich dashboard for administrators to manage the service. The project was built with a focus on modern web technologies, responsive design, and a modular code structure.

---

## Key Features

- **Customer Ordering Form:** A simple, responsive form for users to place food orders.
- **Real-Time Data Storage:** Integrated with Supabase to handle order submissions, database storage, and real-time data access.
- **Secure Admin Dashboard:** A login-protected dashboard for administrators.
- **Order Management:** Admins can view all orders in a structured table.
- **PDF Export:** Admins can download and export order records as PDF files.
- **Form Control:** Admins have the ability to disable the public order form directly from the dashboard.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend & Database:** Supabase (for Authentication, Database, and Real-Time features)
- **Deployment:** Vercel

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your-username/edible-mart-web-app.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables in a `.env` file for Supabase.
    ```
    REACT_APP_SUPABASE_URL='YOUR_SUPABASE_URL'
    REACT_APP_SUPABASE_ANON_KEY='YOUR_SUPABASE_ANON_KEY'
    ```
4.  Run the application
    ```sh
    npm start
    ```

---

## Challenges and Learnings

One of the main challenges in this project was implementing the secure admin dashboard. I solved this by leveraging Supabase's built-in authentication. I created protected routes in React that check the user's authentication state before rendering the dashboard components. This taught me a great deal about managing user sessions, securing application routes, and integrating a third-party authentication service into a React application. I am proud of the result, which is a robust and secure system for managing sensitive order data.
