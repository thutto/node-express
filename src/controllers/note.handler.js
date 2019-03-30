import { NoteModel } from "../models/note.model";

const get = async (request, h) => {
    return "Hello, world!";
};

const getNotes = async (request, h) => {
    request.logger.info("In GET Notes %s", request.path);
    const notesList = await NoteModel.find().exec();
    if (!notesList) {
        notesList = [];
    }
    return {
        totalCount: notesList.length,
        count: notesList.length,
        limit: notesList.length,
        offset: 0,
        notes: notesList
    };
};

const getNote = async (request, h) => {
    request.logger.info("In GET Note %s", request.path);
    const note = NoteModel.findById(request.params.id).exec();
    return note ? note : {};
};

const addNote = async (request, h) => {
    request.logger.info("In POST Note %s", request.path);
    try {
        const note = new NoteModel(request.payload);
        const result = await note.save();
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = { get, getNotes, getNote, addNote };
