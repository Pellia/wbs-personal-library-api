import { Schema, model, ObjectId } from "mongoose";

const userSchema = new Schema({
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    readingList: [{ bookRefId: String, status: String }],
    createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
