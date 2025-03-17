import mongoose from 'mongoose';
import { MONGO_URL } from '../constants/env';

const connectedToDatabase = async () => {
	try {
		await mongoose.connect(MONGO_URL);
		console.log('Successfully connected to db');
	} catch (error) {
		console.log('Can"t connect to database', error);
		process.exit(1);
	}
};

export default connectedToDatabase;
