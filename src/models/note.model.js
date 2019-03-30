import Mongoose from "mongoose";

exports.NoteModel = Mongoose.model("note", {
    id: String,
    note: String,
    createDate: Date,
    archived: Boolean
});
