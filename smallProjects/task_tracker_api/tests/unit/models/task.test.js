import mockingoose from "mockingoose";
import Task from "../../../models/Task.js";

describe("Task Model Unit Tests", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    }); 
    it("should create a task", async () => {
        // Arrange
        const taskData = {
            title: "Test Task",
            description: "This is a test task",
            status: "pending"
        };  
        mockingoose(Task).toReturn(taskData, "save");

        // Act
        const task = new Task(taskData);
        const savedTask = await task.save();

        // Assert
        expect(savedTask.title).toBe(taskData.title);
        expect(savedTask.description).toBe(taskData.description);
        expect(savedTask.status).toBe(taskData.status);
    });
});