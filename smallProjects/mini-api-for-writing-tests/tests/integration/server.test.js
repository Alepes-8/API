import mockingoose from "mockingoose";
import Task from "../../models/task.js";
import request from "supertest";
import app from "../../server.js";

// server.test.js
// 🔹 Smoke test for the entire Express app
// Ensures routes are mounted correctly and app-level middleware works

describe("GET /api/tasks", () => {
  beforeEach(() => mockingoose.resetAll());

  it("should return array of tasks", async () => {
    // Arrange: mock the DB response
    mockingoose(Task).toReturn([{ title: "Task 1" }], "find");

    // Act
    const res = await request(app).get("/api/tasks");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe("Task 1");
  });
});
