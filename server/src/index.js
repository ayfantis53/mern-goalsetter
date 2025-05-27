// npm installs
import cors     from 'cors';
import dotenv   from 'dotenv';
import colors   from 'colors';
import express  from 'express';

// project imports
import { connectDB } from '../lib/db.js';
import userRoutes    from '../routes/users.routes.js';
import goalRoutes    from '../routes/goals.routes.js';
import errorHandler  from '../middleware/errorMiddleware.js';


// returns an object of parsed .env file.
dotenv.config();

// inititalize express.
const app  = express();
// set port.
const port = process.env.PORT || 5000;

// Middleware.
app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes to databases.
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

// Connect to database and port.
app.listen(port, () => {
    console.log(`Server started on Port: ${port}`);
    connectDB();
});