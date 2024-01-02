import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 5,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5
            //add more
        },
        picturePatch: {
            type: String,
            default: "",
        },
        partners: {
            type: Array,
            default: []
        },
        location: String,
        profession: String,
        viewedProfile: Number,
        impressions: Number
    },
    { timeStamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;