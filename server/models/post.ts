"use strict";

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        PostTitle : String,
        PostUser: String,
        PostComment: String
    },
    {
        collection: "posts"
    }
);

const Model = mongoose.model("Post", PostSchema);
export default Model;

