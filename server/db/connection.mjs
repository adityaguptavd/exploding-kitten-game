import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// url of database

const connect = async () => {
    const db_url = process.env.LOCAL_DB_URL || process.env.DB_URL;
    try{
        console.log('Connecting to Database...');
        // connect to database
        await mongoose.connect(db_url);
        console.log('Connected to database Successfully!');
    }
    catch(error){
        console.error('Some Error Occured while connecting to database!', error);
    }
}

export default connect;