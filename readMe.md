KryptoniteApp API Documentation
Base URL
http://localhost:3000 
Endpoints
1. Register a new Kryptonian
Endpoint: /register
Method: POST
Description: Registers a new Kryptonian with their email.
Request Body:
{ "email": "kryptonian@example.com" }



Responses:
201 Created: Registration successful.
{ "message": "Kryptonian registered. Check your email for the confirmation." }



400 Bad Request: Validation error or email already in use.
{ "error": "Error message" }



2. Login to receive OTP
Endpoint: /login
Method: POST
Description: Sends a six-digit OTP to the provided email for login.
Request Body:
{ "email": "kryptonian@example.com" }



Responses:
200 OK: OTP sent to email.
{ "message": "OTP sent to your email." }



404 Not Found: Kryptonian not found.
{ "error": "Kryptonian not found." }



3. Verify OTP
Endpoint: /verify-otp
Method: POST
Description: Verifies the OTP and returns a token if successful.
Request Body:
{ "email": "kryptonian@example.com", "otp": "123456" }



Responses:
200 OK: OTP verification successful, token returned.
{ "token": "generated_token" }



400 Bad Request: Invalid OTP.
{ "error": "Invalid OTP." }



4. Upload an Image
Endpoint: /upload
Method: POST
Description: Uploads an image file. Requires an API key.
Headers:
apiKey: your_api_key



Request Body:
{ "imageData": "base64_image_string" }



Responses:
201 Created: File uploaded successfully.
{ "message": "File uploaded successfully." }



403 Forbidden: Invalid API key.
{ "error": "Invalid API key." }



500 Internal Server Error: Server error.
{ "error": "Error message" }



5. Get All Files
Endpoint: /files
Method: GET
Description: Retrieves all uploaded files. No authentication required.
Responses:
200 OK: Returns list of files.
[ { "_id": "file_id", "owner": "kryptonian_id", "base64Data": "base64_image_string" } ]



500 Internal Server Error: Server error.
{ "error": "Error message" }



6. Get a Single File
Endpoint: /files/:id
Method: GET
Description: Retrieves a single file by its ID. No authentication required.
Parameters:
id: The ID of the file.
Responses:
200 OK: Returns the file.
{ "_id": "file_id", "owner": "kryptonian_id", "base64Data": "base64_image_string" }



404 Not Found: File not found.
{ "error": "File not found." }



500 Internal Server Error: Server error.
{ "error": "Error message" }



Error Handling
All endpoints may return the following error responses:
500 Internal Server Error: If the server encounters an error while processing the request.
{ "error": "Error message" }



Headers
Some endpoints require specific headers:
API Key: Used for authenticating file uploads.
apiKey: your_api_key



Example Requests
Register a new Kryptonian
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{ "email": "kryptonian@example.com" }' 
Login to receive OTP
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{ "email": "kryptonian@example.com" }' 
Verify OTP
curl -X POST http://localhost:3000/verify-otp -H "Content-Type: application/json" -d '{ "email": "kryptonian@example.com", "otp": "123456" }' 
Upload an image
curl -X POST http://localhost:3000/upload -H "Content-Type: application/json" -H "apiKey: your_api_key" -d '{ "imageData": "base64_image_string" }' 
Get all files
curl -X GET http://localhost:3000/files 
Get a single file by ID
curl -X GET http://localhost:3000/files/file_id 
This documentation provides a comprehensive overview of the API endpoints, their expected inputs, outputs, and potential error responses. It should serve as a useful guide for developers working with the KryptoniteApp backend.

