# Directory Management System

## Introduction

The **Directory Management System** is a web application built using **ASP.NET Core** for the backend API and **ReactJS** for the frontend. It enables users to manage business listings efficiently, including features such as **CRUD operations, search, pagination, and sorting**. The system is designed with a user-friendly interface and adheres to clean coding standards.

## Features

### 1. Business Listing Management (CRUD Operations)

- **Create**: Add new businesses with required details.
- **Read**: View all business listings in a tabular format.
- **Update**: Modify business details using an editable form.
- **Delete**: Remove a business listing with a confirmation prompt.

### 2. Search Functionality

- Search businesses by **name** or **city**.
- Instant filtering of search results.

### 3. Pagination

- Display **10 records per page** by default.
- Navigation buttons for **Previous, Next, and specific page numbers**.
- Shows **total records count and current page**.

### 4. Sorting (Bonus Feature)

- Sort businesses by **Name** and **City**.
- Clicking column headers toggles sorting order (**ascending/descending**).
- Visual indicators (↑/↓) to represent sort direction.

### 5. Responsive Design

- Fully adaptable layout for desktop, tablet, and mobile views.

###

## Technologies Used

### Backend:

- **ASP.NET Core 6.0** (Web API)
- **Entity Framework Core** (ORM)
- **SQL Server** (Database)

### Frontend:

- **ReactJS**
- **React Router** (Navigation)
- **Axios** (API Requests)
- **MaterialUI** (Styling)

### Database Schema

The project includes two tables:

1. **Categories**:
   ```sql
   CREATE TABLE Categories (
       CategoryID INT IDENTITY(1, 1) PRIMARY KEY,
       Name NVARCHAR(100) UNIQUE NOT NULL
   );
   ```
2. **Businesses**:
   ```sql
   CREATE TABLE Businesses (
       BusinessID INT IDENTITY(1, 1) PRIMARY KEY,
       Name NVARCHAR(255) NOT NULL,
       Address NVARCHAR(500),
       City NVARCHAR(100),
       State NVARCHAR(100),
       ZipCode NVARCHAR(20),
       PhoneNumber NVARCHAR(20),
       Category NVARCHAR(100),
       Website NVARCHAR(255),
       Rating DECIMAL(3, 2),
       CreatedAt DATETIME DEFAULT GETDATE(),
       UpdatedAt DATETIME DEFAULT GETDATE()
   );
   ```

## Setup and Installation

### 1. Clone the Repository

```sh
 git clone <https://github.com/Ankuraaditya/DirectoryManagementSystem_BDORise>
 cd directory-management-system
```

### 2. Backend Setup (ASP.NET Core API)

#### a) Install Dependencies

```sh
 cd backend
 dotnet restore
```

#### b) Configure Database

- Install SQL Server and **import the provided ****`.bacpac`**** file**.
- Update the **connection string** in `appsettings.json`:
  ```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=DirectoryDB;User Id=YOUR_USER;Password=YOUR_PASSWORD;"
  }
  ```

#### c) Run the Backend API

```sh
 dotnet run
```

API will be available at `http://localhost:5245/api`.

### 3. Frontend Setup (ReactJS)

#### a) Install Dependencies

```sh
 cd frontend
 npm install
```

#### b) Configure API Base URL

Update `src/config.js`:

```js
export const API_BASE_URL = "http://localhost:5245/api";
```

#### c) Start the Frontend

```sh
 npm start
```

The app will be available at `http://localhost:3000/`.

## How to Use

1. Open the web application.
2. Add new businesses using the **"Add New Business"** button.
3. Search for businesses by name or city.
4. Click column headers to sort listings.
5. Use the pagination controls to navigate.
6. Edit or delete businesses as needed.

## Challenges Faced & Solutions

1. **Pagination Handling**:
   - Used server-side pagination to improve performance on large datasets.
2. **Form Validation**:
   - Implemented live validation for inputs using React hooks.
3. **Sorting Logic**:
   - Used React state management to toggle sort orders efficiently.
4. **Performance Optimization**:
   - Implemented lazy loading and memoization to reduce re-renders.





