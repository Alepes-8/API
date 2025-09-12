import request from "supertest";
import mockingoose from "mockingoose";
import app from "../../../server.js";
import Task from "../../../models/task.js";

describe("Task Routes Integration Tests", () => {

  it("GET /api/tasks should return tasks array", async () => {
    mockingoose(Task).toReturn([{ title: "Task 1" }, { title: "Task 2" }], "find");

    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].title).toBe("Task 1");
  });

  it("POST /api/tasks should create a task", async () => {
    mockingoose(Task).toReturn({title: "Created Task" }, "save");

    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Created Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Created Task");
  });

});
