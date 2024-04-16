"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PostSchema = new Schema({
    PostTitle: String,
    PostUser: String,
    PostComment: String
}, {
    collection: "posts"
});
const Model = mongoose_1.default.model("Post", PostSchema);
exports.default = Model;
//# sourceMappingURL=post.js.map