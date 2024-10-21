import mongoose, {Schema} from "mongoose";

const postSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        body: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

export const Post = mongoose.model("Post", postSchema);