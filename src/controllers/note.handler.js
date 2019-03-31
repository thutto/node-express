import { NoteModel } from "../models/note.model";
import Joi from "joi";

const createNoteSchema = Joi.object().keys({
    id: Joi.string().required(),
    note: Joi.string().required(),
    createDate: Joi.date()
        .forbidden()
        .default(new Date()),
    archived: Joi.boolean().default(false)
});

const get = async (request, response) => {
    response.send('Hello World!')
};

const getNotes = async (request, response) => {
    const notesList = await NoteModel.find().exec();
    if (!notesList) {
        notesList = [];
    }
    response.status(200).json({
        totalCount: notesList.length,
        count: notesList.length,
        limit: notesList.length,
        offset: 0,
        notes: notesList
    });
};

const getNote = async (request, response) => {
    let note = {};
    let status = 400;
        if(request.params.id) {
        status = 200;
        note = await NoteModel.findById(request.params.id).exec();
    }
    response.status(status).json(note ? note : {});
};

const addNote = async (request, response) => {
    try {
        const validatedNote = await createNoteSchema.validate(request.body, {abortEarly: false});
        const note = new NoteModel(validatedNote);
        const result = await note.save();
        response.status(200).json(result);
    } catch (validationError) {
        const errorMessage = validationError.details.map(d => d.message);
                response.status(400).json(errorMessage);
    }
};

module.exports = { get, getNotes, getNote, addNote };
