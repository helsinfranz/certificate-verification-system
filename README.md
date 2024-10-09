# CVS (Certificate Verification System)

## Overview

The **CVS (Certificate Verification System)** is a web application built with **Next.js** and **MongoDB**, designed to streamline the process of uploading and viewing student certificates. The system allows **students** to view or download their certificates by entering their certificate ID without needing to log in in pdf format, while **admins** are required to log in to upload certificate data via Excel files.

### Key Features:

- **Student Certificate View**: Students can search for their certificates by entering their **certificate ID**, which displays all assessment scores for that ID.
- **Admin Data Upload**: Admins can log in and upload Excel files containing Certificate data, which are processed and saved to MongoDB.

## Functionality

### Student Portal

- **No Login Required**: Students can access the certificate search page without logging in.
- **Search by Certificate ID**: Students enter their **certificate ID** to view or download their certificate in pdf format.

The certificates are fetched from the following API route:

- `/api/results/[certificateId]`

### Admin Panel

- **Admin Login**: Admins are required to log in to access the data upload functionality.
- **Excel Upload**: Admins can upload Excel files to add or update certificate data in bulk.
- **Dynamic Upload API**: Based on the selected excel, the data is uploaded to the following API route:

- `/api/upload/certificate`

### API Endpoints

- **Student Certificates**:
  - `GET /api/results/[certificateId]`: Retrieves all certificate details for the given certificate ID.
- **Admin Bulk Upload** (Requires Login):
  - `POST /api/upload/certificate`: Upload certificate data.

This API route processes an uploaded Excel file, converts the data to JSON format, and saves it in MongoDB.

## Tech Stack

- **Frontend**: Next.js (React Framework)
- **Backend**: Node.js (NextJS API Routes)
- **Database**: MongoDB (for storing data)

## How to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone <repo-url>
   cd certificate-verification-system
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Project**:

   - For development:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   - Visit `http://localhost:3000` to access the app locally.

## Usage

1. **For Students**:

   - Navigate to the certificate search page.
   - Enter your **certificate ID** to view your certificate details.

2. **For Admins**:
   - Log in to access the admin panel.
   - Upload the relevant Excel file to update or upload student certificate details.

## License

This project is licensed under the MIT License.
