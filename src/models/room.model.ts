import mongoose, { Schema, Document } from 'mongoose';

interface IRoom extends Document {
  name: string;                   // Name of the room (for group chats)
  participants: mongoose.Schema.Types.ObjectId[];  // Array of user IDs (for private chats and groups)
  createdAt: Date;
  type: 'private' | 'group';      // Type of the room (private or group)
}

const roomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    default: 'Unnamed Room',
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',                    // References to users
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['private', 'group'],
    default: 'private',
  },
});

const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;
