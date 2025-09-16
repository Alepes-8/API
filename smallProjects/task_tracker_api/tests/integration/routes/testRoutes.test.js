import mockingoose from "mockingoose";
import Task from "../../../models/Task.js";
import User from "../../../models/user.js";
import app from "../../../server.js";
import request from "supertest";
import bcrypt from "bcryptjs";

describe("Task Routes Integration Tests", () => {

    let token;
    process.env.JWT_SECRET = "testsecret"; // add at top of test file

    beforeEach(async () => {
        mockingoose.resetAll();

        const password = "password123";
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            email: "tes@localhost.test",
            password: hashedPassword
        };

        // mock findOne for login
        mockingoose(User).toReturn(userData, "findOne");

        // Act – log in to get a token
        const res = await request(app)
            .post("/api/auth/login")
            .send({
            email: "tes@localhost.test",
            password: password
            });

        token = res.body.token;
    });

    it("POST /api/tasks should create a task", async () => {
        // Arrange
        const taskData = {
            title: "Test Task",
            description: "This is a test task",
            status: "pending"
        };
        mockingoose(Task).toReturn(taskData, "save");

        // Act
        const res = await request(app)
            .post("/api/tasks")
            .set("authorization", `Bearer ${token}`)
            .send(taskData);
        
        // Assert
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(taskData.title);
        expect(res.body.description).toBe(taskData.description);
        expect(res.body.status).toBe(taskData.status);
    });


    it("GET /api/tasks/:id should acquire all tasks", async () => {
        // Arrange
        const taskId = "64b8f0c4f1d2c8b5f6e8a1c2";
        const taskData1 = {
            title: "Test Task 1",
            description: "This is a test task 1",
            status: "pending",
            _id: taskId
        };
        // Use findById because route uses Task.findById
        mockingoose(Task).toReturn(taskData1, "findOne");

        // Act
        const res = await request(app)
            .get(`/api/tasks/${taskId}`)
            .set("authorization", `Bearer ${token}`);

        // Assert   
        expect(res.status).toBe(200);
        expect(res.body.title).toBe(taskData1.title);
        expect(res.body.description).toBe(taskData1.description);
        expect(res.body.status).toBe(taskData1.status);
    });

    it("PUT /api/tasks/:id should update task with input id", async () => {
        // Arrange
        const taskId = "64b8f0c4f1d2c8b5f6e8a1c2";
        const updatedTaskData = {
            title: "Updated Task",
            description: "This is an updated test task",
            status: "completed",
            _id: taskId
        };
        mockingoose(Task).toReturn(updatedTaskData, "findOneAndUpdate");

        // Act
        const res = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set("authorization", `Bearer ${token}`)
            .send(updatedTaskData);

        // Assert
        expect(res.status).toBe(200);
        expect(res.body.title).toBe(updatedTaskData.title);
        expect(res.body.description).toBe(updatedTaskData.description);
        expect(res.body.status).toBe(updatedTaskData.status);
    });

    it("DELETE /api/tasks/:id should delete task with input id", async () => {
        // Arrange
        const taskId = "64b8f0c4f1d2c8b5f6e8a1c2";
        const taskData = {
            title: "Test Task",
            description: "This is a test task",
            status: "pending",
            _id: taskId
        };
        mockingoose(Task).toReturn(taskData, "findOneAndDelete");
    
        // Act
        const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set("authorization", `Bearer ${token}`);
        
        // Assert
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Task deleted");
    });
});
