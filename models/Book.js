import { Schema, model, ObjectId } from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: [true, "Title is required"] },
    // bookRefId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, required: [true, "Read status is required"] },
    createdAt: { type: Date, default: Date.now },
});

export default model("Book", bookSchema);
