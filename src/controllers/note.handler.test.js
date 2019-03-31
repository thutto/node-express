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
    const responseStub = {
        statusCode: 200,
        jsonObj: {},
        sendStr: ""
    };
    responseStub.status = () => responseStub;
    responseStub.send = (sendStr) => {
        responseStub.sendStr = sendStr
        return sendStr;
    };
    responseStub.json = (jsonObj) => {
        responseStub.jsonObj = jsonObj
        return jsonObj;
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
        addRequest.body = {
            id: "1",
            note: "Test Note",
            archived: false
        };
        await NoteHandler.addNote(addRequest, responseStub);
        expect(responseStub.jsonObj).toBeDefined();
        expect(responseStub.jsonObj._id).toBeDefined();
        expect(responseStub.jsonObj.note).toEqual("Test Note");
        mongoId = responseStub.jsonObj._id;
    });

    test("Test Base GET", async () => {
        await NoteHandler.get(requestStub, responseStub);
        expect(responseStub).toBeDefined();
        expect(responseStub.sendStr).toEqual("Hello World!");
    });

    test("Got Notes Response", async () => {
        await NoteHandler.getNotes(requestStub, responseStub);
        expect(responseStub).toBeDefined();
        expect(responseStub.jsonObj.count).toBeDefined();
        expect(responseStub.jsonObj.totalCount).toBeDefined();
        expect(responseStub.jsonObj.notes).toBeDefined();
        expect(responseStub.jsonObj.notes[0]._id).toBeDefined();
    });

    test("Got Note Response", async () => {
        const getRequest = requestStub;
        getRequest.params = {
            id: mongoId
        };
        await NoteHandler.getNote(getRequest, responseStub);
        expect(responseStub).toBeDefined();
        expect(responseStub.jsonObj._id).toBeDefined();
        expect(responseStub.jsonObj.note).toBeDefined();
        expect(responseStub.jsonObj.note).toEqual("Test Note");
    });
});
