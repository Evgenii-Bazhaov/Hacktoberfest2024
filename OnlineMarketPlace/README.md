# Django Online-Market Place Application

## Introduction
This is a Django application that allows users to perform various actions such as signing up, logging in, uploading their products under different categories, communicating with sellers, and searching for specific items. It also provides routes for viewing items and categories.

## Getting Started
To run this application, follow the steps below:

1. Make sure you have Python installed on your system. If not, you can download it from the official Python website.

2. Clone this repository to your local machine using the following command:

    git clone <repository_url>


3. Navigate to the project directory:

    cd market

4. Apply the database migrations using the following command:

    python manage.py migrate


5. Create a superuser account that will give you access to the admin features. Run the following command and provide the required information:

    python manage.py createsuperuser

superuser details 
Name : nikunj
password : nikunj12345



6. Start the development server by running the following command:

    python manage.py runserver


7. Open your web browser and visit `http://localhost:8000` to access the application.

## Admin Access
To access the admin features, follow these steps:

1. Open your web browser and visit `http://localhost:8000/admin`.

2. Log in using the superuser credentials you created earlier.

3. You will have access to various admin features such as managing users, items, categories, and product listings.

## Routes
- `/admin`: Provides access to the admin features.
- `/signup`: Allows users to sign up for an account.
- `/login`: Allows users to log in to their account.
- `/logout`: Logs out the currently authenticated user.
- `/`: Displays the home page with a list of items and categories.
- `/items/new`: Allows users to upload their products under different categories.
- `/items`: Enables users to search for specific items based on keywords or filters.

