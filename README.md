# ReactJS CRUD Application

A simple CRUD (Create, Read, Update, Delete) application built with ReactJS and Tailwind CSS for managing user profiles. This project showcases the ability to handle form inputs, perform real-time validation, and manage user data locally using the browser's local storage.

## Features

- **User Form**: Allows users to enter and submit multiple profiles with the following fields:
  - Name
  - Email
  - Phone Number
  - Date of Birth (DOB)
  - Address (City, District, Province, Country)
  - Profile Picture (PNG format only)

- **Form Validation**: Ensures correct and valid input data with real-time feedback, including:
  - Required fields (Name, Email, Phone Number)
  - Email format validation
  - Phone number format validation (must be at least 7 digits)
  - File type validation (PNG images only)

- **CRUD Operations**: Manage user profiles with the ability to:
  - Add new records
  - Edit existing records
  - Delete records

- **Pagination**: Table supports pagination with a maximum of 5 records per page.

- **Profile Page**: A separate page to view all user profiles in a list format.

## Project Structure

The project is organized into the following components:

- **`src/components/Home.jsx`**: 
  - **Description**: Contains the main form for adding new user profiles and the table to display the list of users. Integrates form and table functionalities on the home page.

- **`src/components/Profiles.jsx`**:
  - **Description**: Displays a list of all user profiles. Used for viewing profiles in a separate page.

- **`src/components/UserForm.jsx`**:
  - **Description**: Handles user input for adding or editing profiles. Includes form fields for user details and image upload functionality.

- **`src/components/UserTable.jsx`**:
  - **Description**: Displays the list of users in a table format. Supports CRUD operations including edit, delete, and pagination.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rishavPoudelZ/react-CRUD-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-CRUD-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. **Add New User**: Fill out the form with user details and upload a PNG profile picture. Click "Add User" to save the profile.

2. **Edit User**: Click the "Edit" button next to a user profile in the table to update their information.

3. **Delete User**: Click the "Delete" button to remove a user profile from the table.

4. **View Profiles**: Click the "View Profiles" button to navigate to a page displaying all user profiles.

## Acknowledgments

- [ReactJS](https://reactjs.org/) - The JavaScript library used for building the user interface.
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework used for styling.
- [Vite](https://vitejs.dev/) - The build tool used for faster development.

---

*note*: *As the requirement stated that the data was to be stored locally using localStorage. I was getting a storage limit error trying to store the profile picture image as base64 to use it so I decided not to store the image locally as the local storage limit is generally around 5MB. That is why you don't see the profile picture in the table that has info on added users.*
