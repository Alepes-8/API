import mockingoose from "mockingoose";
import Task from "../../../models/task";

//The mockingoose library allows us to mock mongoose models for testing purposes without needing a real database connection.
//The mockingoose function is used to specify which model we want to mock. In this case, we are mocking the Task model.
//In where findone and save is the mongoose method we want to mock. And is created functions just for testing purposes.

test("Should mock findOne", async() => {
    //Arrange
    const testTitle = "Fake test Task";
    mockingoose(Task).toReturn({title: testTitle}, "findOne");

    //Act
    const result = await Task.findOne();

    //Assert
    expect(result.title).toBe(testTitle)
})

test("should mock create", async() => {
    // Arrange
    const testTitle = "New Task";
    mockingoose(Task).toReturn({title: testTitle}, "save");

    // Act
    const newTask = new Task({title: testTitle});
    const savedTask = await newTask.save();

    //Assert
    //expect(savedTask._id.toString()).toBe("123");
    expect(savedTask.title).toBe(testTitle);
})