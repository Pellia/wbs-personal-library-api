import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
    const {
        body: { firstName, lastName, email, readingList },
    } = req;
    if (!firstName || !lastName || !email) throw new ErrorResponse("First name, last name, and email are required", 400);
    const found = await User.findOne({ email });
    if (found) throw new ErrorResponse("Email already exists", 400);
    const user = await User.create({ firstName, lastName, email, readingList });
    res.status(201).json(user);
});

export const getUserById = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;
    const user = await User.findById(id);
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
    const {
        body: { firstName, lastName, email },
        params: { id },
    } = req;
    if (!firstName || !lastName || !email) throw new ErrorResponse("First name, last name, and email are required", 400);
    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true });
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new ErrorResponse("User not found", 404);
    res.status(200).json({ message: "User deleted" });
});

export const addUserBook = asyncHandler(async (req, res) => {
    const {
        body: { readingList },
        params: { id },
    } = req;
    const user = await User.findByIdAndUpdate(id, { $push: { readingList: req.body } }, { new: true });
    // console.log(req.body);
    res.status(200).json(user);
});

export const updateUserBook = asyncHandler(async (req, res) => {
    const {
        body: { readingList },
        params: { id, bookId },
    } = req;
    const user = await User.updateOne({ _id: id, "readingList.bookRefId": bookId }, { $set: { "readingList.$.status": req.body[0].status } });
    // console.log(readingList.status);
    res.status(200).json(user);
});

export const deleteUserBook = asyncHandler(async (req, res) => {
    const {
        params: { id, bookId },
    } = req;
    const user = await User.updateOne({ _id: id }, { $pull: { readingList: { bookRefId: bookId } } });
    if (!user) throw new ErrorResponse("Book not found", 404);
    res.status(200).json({ message: "Book deleted from list" });
});
