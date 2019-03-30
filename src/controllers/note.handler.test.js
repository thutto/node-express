import "dotenv/config";
import mongoose from "mongoose";
import { Mockgoose } from "mockgoose";
import NoteHandler from "./note.handler";

let mockgoose = new Mockgoose(mongoose);
let requestStub = {
    logger: {
        info: () => {}
    },
    path: "jest/test"
};
let mongoId = "";

// Build Up
beforeAll(() => {
    mockgoose.prepareStorage().then(() => {
        mongoose.connect(process.env.MONGO_CONNECTION_STR);
        mongoose.connection.on("connected", () => {});
    });
});

describe("Test Note Handler", () => {
    test("Note Handler to be Definded", async () => {
        expect(NoteHandler).toBeDefined();
    });

    test("Add Note", async () => {
        const addRequest = requestStub;
        addRequest.payload = {
            id: "1",
            note: "Test Note",
            createDate: new Date(),
            archived: false
        };
        const noteResponse = await NoteHandler.addNote(addRequest);
        expect(noteResponse).toBeDefined();
        expect(noteResponse._id).toBeDefined();
        expect(noteResponse.note).toEqual("Test Note");
        mongoId = noteResponse._id;
    });

    test("Test Base GET", async () => {
        const getResponse = await NoteHandler.get(requestStub);
        expect(getResponse).toBeDefined();
        expect(getResponse).toEqual("Hello, world!");
    });

    test("Got Notes Response", async () => {
        const getResponse = await NoteHandler.getNotes(requestStub);
        expect(getResponse).toBeDefined();
        expect(getResponse.count).toBeDefined();
        expect(getResponse.totalCount).toBeDefined();
        expect(getResponse.notes).toBeDefined();
        expect(getResponse.notes[0]._id).toBeDefined();
    });

    test("Got Note Response", async () => {
        const getRequest = requestStub;
        getRequest.params = {
            id: mongoId
        };
        const getResponse = await NoteHandler.getNote(getRequest);
        expect(getResponse).toBeDefined();
        expect(getResponse._id).toBeDefined();
        expect(getResponse.note).toBeDefined();
        expect(getResponse.note).toEqual("Test Note");
    });
});
