// npm installs
import mongoose from 'mongoose';


/**
 * Connects us to our Mongo Atlas Database and if it fails, it tells us why
 * @return void
 */
export const connectDB = async () => {
    try {
        // connect to our db url.
        const conn = await mongoose.connect(process.env.ATLAS_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

    } catch (error) {
        // connection failed so we log it.
        console.log(error);
        process.exit(1);
    }
}