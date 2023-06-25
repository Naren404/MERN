import express from "express"
import 'dotenv/config'
import cookieParser from 'cookie-parser';

import connectDB from './config/database.js';

const PORT = process.env.PORT || 3000
connectDB();
// This line creates an instance of the Express application. 
// The app variable represents the Express application and allows you to define routes and middleware.
const app = express()

// This code defines a route using the HTTP GET method.
// When a GET request is made to the root URL ('/'), the provided callback function will be executed.
// In this case, the function sends the response 'API running' back to the client.
app.get('/', (req, res) => res.send('API runnung'))

// This line starts the server and makes it listen on the specified port (PORT).
// The callback function is executed once the server starts and logs a message indicating the port on which the server is running.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// MIDDLEWARES

// This middleware function is used to parse JSON data in the request body. 
app.use(express.json());

// This middleware function is used to parse URL-encoded data in the request body.
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
// ALL ROUTES [END POINTS]
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Users Routes
app.use('/api/users', userRoutes);

// Books Routes
app.use('/api/books', bookRoutes);

