import NoteHandler from "../controllers/note.handler";

const noteRoutes = {
    routes: [
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
            path: "/note/:id",
            handler: NoteHandler.getNote
        },
        {
            method: "POST",
            path: "/note",
            handler: NoteHandler.addNote
        }
    ]
};

    module.exports = noteRoutes;
