import mockingoose from "mockingoose";
import user from "../../../models/user"; 

describe("User Model Unit Tests", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it("should create a user", async () => {
        // Arrange
        const userData = {
            email: "test@localhost.ls",
            password: "password123"
        };
        mockingoose(user).toReturn(userData, "save");

        // Act
        const newUser = new user(userData);
        const savedUser = await newUser.save();

        // Assert
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
    });
});