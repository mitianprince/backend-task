Social Media API:-

Overview:-
This project is a backend application for a social media platform. It enables users to interact through posts, comments, real-time chat, and notifications. The API is designed using the MERN stack with Socket.io for real-time capabilities.

Features

1. User Authentication & Authorization
   (i). Secure user signup and login using JWT.
   (ii). Passwords hashed with bcrypt.
   (iii). Access control for posts and comments.

2. Post and Comment Management
   (i). Create posts with text and optional media, get all post and update the post.
   (ii). Comment on posts with authentication

3. Real-Time Chat & Notifications
   (i). Basic real-time chat between users.
   (ii). Real-time notifications for new comments.

4. Database Designe
   (i) User Model
   (a)name (String)
   (b)email (String)
   (c)password (String) with timestapms
   (ii) Post Model
   (a) content
   (b)userId (User reference)
   (c)image (optional)
   (d)postId (Post reference)
   (e) comments (Taken as a array with String type) with timestapms
   (ii) Comment Model
   (a)postId (Post reference)
   (b)text (String)
   (c)userId with timestamps

5. Pagination (Optional)
   Fetch posts with pagination for performance optimization.

Technologies Used:-
(I). Node.js: Backend server.
(II). Express.js: API routing and middleware.
(III). MongoDB: Database for storing users, posts, and comments.
(IV). Socket.io: Real-time communication.
(V). Cloudinary: Media upload and management.
(VI). JWT: Authentication and session management.
(VI). Bcrypt.js: Password hashing.

Test API Endpoints:

API Endpoints:-
(i) User:
register:- POST ("https://backendtask-eio0.onrender.com/api/v1/user/register")
login:- POST ("https://backendtask-eio0.onrender.com/api/v1/user/login")
getProfile:- GET ("https://backendtask-eio0.onrender.com/api/v1/user/me")
updateProfile: PUT ("https://backendtask-eio0.onrender.com/api/v1/user/update/:userId")

(ii). Post:
createPost:- POST (https://backendtask-eio0.onrender.com/api/v1//post/create")
getAllPost:- GET (https://backendtask-eio0.onrender.com/api/v1/post/all")

(iii) Comment:
addComment:- POST ("https://backendtask-eio0.onrender.com/api/v1/comment/:postId")

Deployment:
The application has been deployed on [Heroku/AWS/Any Cloud Platform].
Live URL: https://backendtask-eio0.onrender.com
