import mongoose, {ConnectOptions} from 'mongoose';
import 'dotenv/config';

const options: ConnectOptions = {
    autoIndex: true,
};

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI as string, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

const db = {
    connect,
};

export {db};
