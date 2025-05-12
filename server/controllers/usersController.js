import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({success: true, data: users});
    } catch (err) {
        res.status(500).json({success: false, message: "Error retrieving users."});
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({success: false, message: "User not found."})
        }
        res.status(200).json({success: true, data: user});
    } catch(err) {
        res.status(500).json({success: false, message: "Error retrieving user"});
    }
}

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.email || !user.password || !user.username || !user.name) {
        return res.status(400).json({ message: "Please fill all the fields."});
    } else {
        console.log("All necessary fields populated");
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch(err) {
        console.error("Error creating user: ", err.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User Successfully Deleted!"});
    } catch(err) {
        res.status(500).json({ success: false, message: "Deletion target not found."});
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ success: false, message: "Id not found!"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new:true});
        res.status(200).json({ success: true, data: updatedUser});
    } catch(err) {
        res.status(500).json({ success: false, message: "Server error."})
    }
}