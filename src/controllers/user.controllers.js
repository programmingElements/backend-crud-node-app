import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
    const {fullname, email, username, password} = req.body;

    // validation
    if (!([fullname, email, username, password].every((elem) => elem?.trim().length > 0))) {
        throw new ApiError(400, "All fields are required.");
    }

    const existedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists.")
    }

    const user = await User.create({
        fullname,
        email,
        username,
        password
    })

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a user.")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdUser,
            "User Registered Successfully!"
        )
    )

})

export {
    registerUser
}