# Backend Assessment

To start the application, run the following command:
npm run server

Port running on https://localhost:8080

Login Credentials

User
Username: ram
Password: user123

Admin
Username: abdul
Password: admin123

Owner
Username: rahul
Password: owner123

Token
Upon successful login, copy the token and paste it into the token variable.

Environment Variable
Set the following environment variable:
makefile
Copy code
ACCESS_WEB_TOKEN = "fjadlfjiwuoersnadfjfdnsdvhsafo";

Usage
Listings
For updating and deleting listings, pass the listing ID to the parameter taken from the listing ID.

Reviews
For reviews, pass the business ID to the body. You can get the ID from the listings endpoint.

