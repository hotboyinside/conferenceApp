import mongoose from 'mongoose';

export interface MessageDocument extends mongoose.Document {
	text: string;
	name: string;
	sendTime: Date;
}

const messageSchema = new mongoose.Schema<MessageDocument>({
	text: { type: String, required: true },
	name: { type: String, required: true },
	sendTime: { type: Date, required: true },
});

const MessageModel = mongoose.model<MessageDocument>('Message', messageSchema);
export default MessageModel;
