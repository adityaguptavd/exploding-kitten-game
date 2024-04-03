import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// url of database

const connect = async () => {
    const db_url = process.env.DB_URL;
    try{
        console.log('Connecting to Database...');
        // connect to database
        await mongoose.connect(db_url);
        console.log('Connected to database Successfully!');
    }
    catch{
        console.error('Some Error Occured while connecting to database!');
    }
}

export default connect;