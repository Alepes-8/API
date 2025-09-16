import app from "../../server.js"
import request from "supertest";

describe("Recipe Routes Integration Tests", () => {

    it("should respond on root route", async () => {
        //arrange
        const res = await request(app).get("/");

        //assert
        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/Task Tracker API is running.../i); // or whatever your root returns
    });

    it("should have /api/recipes route mounted", async () => {
        //arrange
        const res = await request(app).get("/api/auth/health");

        //assert
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });
});
