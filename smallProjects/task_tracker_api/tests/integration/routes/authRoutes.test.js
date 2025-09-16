import mockingoose from "mockingoose";
import User from "../../../models/user.js";
import app from "../../../server.js";
import request from "supertest";
import bcrypt from "bcryptjs";

describe("Auth Routes Integration Tests", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it("GET /api/auth/get should acquire all users", async () => {
        // Arrange
        const userData1 = { email: "tes1@localhost.test", password: "password123" };
        const userData2 = { email: "tes2@localhost.test", password: "password123" };

        mockingoose(User).toReturn([userData1, userData2], "find");

        // Act
        const res = await request(app).get("/api/auth/get");

        // Assert
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].email).toBe(userData1.email);
        expect(res.body[1].email).toBe(userData2.email);
    });

    it("POST /api/auth/register should register a user", async () => {
        // Arrange
        const userData = {
            email: "tes@localhost.test",
            password: "password123"
        };
        mockingoose(User).toReturn(userData, "save");

        // Act
        const res = await request(app)
            .post("/api/auth/register")
            .send(userData);
        
        // Assert
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("User registered");
    });

    it("POST /api/auth/login should login a user", async () => {
        // Arrange
        const hashedPassword = await bcrypt.hash("password123", 10);
       
        const userData = {
            email: "tes@localhost.test",
            password: hashedPassword
        };
        mockingoose(User).toReturn(userData, "findOne");

        // Act
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "tes@localhost.test",
                password: "password123"
            });
        
        // Assert
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});