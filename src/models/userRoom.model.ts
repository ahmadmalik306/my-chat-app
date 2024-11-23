import mongoose, { Schema, Document } from 'mongoose';

interface IUserRoom extends Document {
  user: mongoose.Schema.Types.ObjectId;  // Reference to User
  room: mongoose.Schema.Types.ObjectId;  // Reference to Room
  joinedAt: Date;
}

const userRoomSchema = new Schema<IUserRoom>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserRoom = mongoose.model<IUserRoom>('UserRoom', userRoomSchema);

export default UserRoom;
