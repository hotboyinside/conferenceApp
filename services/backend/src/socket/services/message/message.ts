import MessageModel from '../../../models/message.model';

interface MessageData {
	text: string;
	name: string;
	sendTime: Date;
}

export const message = async ({
	messageData,
}: {
	messageData: MessageData;
}): Promise<MessageData | MessageData[]> => {
	const savedMessage = await MessageModel.create({
		text: messageData.text,
		name: messageData.name,
		sendTime: messageData.sendTime,
	});

	return savedMessage;
};
