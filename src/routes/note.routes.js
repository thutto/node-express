import Joi from "joi";
import NoteHandler from "../controllers/note.handler";

module.exports = (function() {
    return [
        {
            method: "GET",
            path: "/",
            handler: NoteHandler.get
        },
        {
            method: "GET",
            path: "/notes",
            handler: NoteHandler.getNotes
        },
        {
            method: "GET",
            path: "/note/{id}",
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: NoteHandler.getNote
        },
        {
            method: "POST",
            path: "/note",
            config: {
                validate: {
                    payload: {
                        id: Joi.string().required(),
                        note: Joi.string().required(),
                        createDate: Joi.date()
                            .forbidden()
                            .default(new Date()),
                        archived: Joi.boolean().default(false)
                    }
                }
            },
            handler: NoteHandler.addNote
        }
    ];
})();
