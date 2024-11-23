import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
  sender: mongoose.Schema.Types.ObjectId;  // Reference to User
  room: mongoose.Schema.Types.ObjectId;    // Reference to Room
  content: string;                         // Message content
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',                           // Reference to User
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',                           // Reference to Room
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
