1.User Registration:

Libraries: express, mongoose, bcrypt
Files:

models/User.js (for user schema)
controllers/authController.js (registration logic)
routes/auth.js (registration route)




2.User Login:

Libraries: passport, passport-local, bcrypt
Files:

config/passport.js (local strategy setup)
controllers/authController.js (login logic)
routes/auth.js (login route)




2.JWT Generation:

Libraries: jsonwebtoken
Files:

controllers/authController.js (generate token after successful login)




3.Protected Route Access:

Libraries: passport, passport-jwt
Files:

config/passport.js (JWT strategy setup)
routes/user.js (or any route file with protected routes)
