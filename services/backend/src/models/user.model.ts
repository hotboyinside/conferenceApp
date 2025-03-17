import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
	userName: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		userName: { type: String, unique: true, required: true },
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
