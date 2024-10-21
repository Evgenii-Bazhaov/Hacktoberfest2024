# Find BP

## Web application to find the nearest bp gas station for the user based on the geolocation and applied filters. This is a PWA application that you can use on desktop as well as mobile app

### [Live demo](http://findbp.netlify.app)

## Features

- PWA Support
- Geolocation-based search
- Filter by amenities (e.g., open 24/7, has a convenience store, the store serves hot food, accepts bp fuel cards)
- Dark Mode
- User-friendly interface
- Bookmark your favorite gas station

## Technology/Tools Used

- Javascript
- ReactJS
- Redux ToolKit
- Axios
- Google Maps API
- Tailwind CSS
- Jest
- React Testing Library

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/singhanuj620/bp_gas
   ```
2. Navigate to the project directory:
   ```sh
   cd bp_gas
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Add Enviornment file .env:
   - VITE_GOOGLE_MAPS_API_KEY
   - If facing CORS issue
     - on local dev VITE_PROXY_URL=/.netlify/functions/proxy
     - on server deployement VITE_PROXY_URL=https://findbp.netlify.app/.netlify/functions/proxy

## Usage

1. Start the development server:
   ```sh
   netlify dev
   ```
2. Browser will open the local dev

## Screenshots

![image](https://github.com/user-attachments/assets/d5fd9bde-02e0-4b5f-8978-6709e7aa7963)

![image](https://github.com/user-attachments/assets/1fbf420e-3818-4ffd-b6ea-d6b8111cd6d4)

![image](https://github.com/user-attachments/assets/6fdeecb4-a577-4a68-941d-2ed3679e3c69)

![image](https://github.com/user-attachments/assets/eb5d1930-9bca-4379-b64c-4f6dc93bb5ad)

![image](https://github.com/user-attachments/assets/e6a80942-226a-459a-a40f-faf89ff1e6ca)

![image](https://github.com/user-attachments/assets/e0e3588f-dd22-422d-a931-caeb18b0b872)

![image](https://github.com/user-attachments/assets/94d0a53f-823f-468e-8687-6ec0fbbf59f1)

![image](https://github.com/user-attachments/assets/53817472-35c7-4ead-9f2b-f9aca16aec95)

![image](https://github.com/user-attachments/assets/32fd5390-eb6f-4ffe-a3f5-f539f1e2d5ef)

![image](https://github.com/user-attachments/assets/0d990f2e-6ca8-44da-9aca-477d12f73d64)

![image](https://github.com/user-attachments/assets/96308763-0577-4cb5-af7c-eb2161ae170a)

![image](https://github.com/user-attachments/assets/8fcde3d9-75ba-440b-bc85-e978cdbff995)




## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [singhanuj620@gmail.com](mailto:singhanuj620@gmail.com).
Portfolio [Click here](https://anujsingh.net)
