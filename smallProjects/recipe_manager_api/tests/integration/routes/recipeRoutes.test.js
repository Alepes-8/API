import mockingoose from "mockingoose";
import RecipeModel from "../../../models/Recipe.js";
import app from "../../../server.js"
import request from "supertest";

describe("Recipe Routes Integration Tests", () => {

    it("Get api/recipes should return recipe array", async () => {
        //Arrange
        const recipeTitle1 = "Mock Recipe 1";
        const recipeTitle2 = "Mock Recipe 2";

        mockingoose(RecipeModel).toReturn([{title: recipeTitle1}, {title: recipeTitle2}], "find");

        //Act
        const recipes = await request(app)
            .get('/api/recipes');

        //Assert
        expect(recipes.statusCode).toBe(200);
        expect(recipes.body.length).toBe(2);
        expect(recipes.body[0].title).toBe(recipeTitle1)
        expect(recipes.body[1].title).toBe(recipeTitle2)
    });

    it("Post api/recipes should create recipe item", async() => {
        //Arrange
        const recipeTitle = "New Recipe";
        mockingoose(RecipeModel).toReturn({title: recipeTitle}, "save");

        //Act
        const res = await request(app)
            .post("/api/recipes")
            .send({title: recipeTitle});
        
        //Assert
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(recipeTitle);
    })

    it("Get api/recipes/:id should return recipe item for input id", async() => {
        //Arrange
        const recipeTitle = "Mock Recipe";
        const recipeId = "64b8f0c4f1d2c8b5f6e8a1c2"
        mockingoose(RecipeModel).toReturn({title: recipeTitle, _id: recipeId}, "findOne");   

        //Act
        const res = await request(app).get(`/api/recipes/${recipeId}`);

        //Assert
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(recipeTitle);
        expect(res.body._id).toBe(recipeId);
    })

    it("PUT api/recipes/:id should update recipe with input id", async() => {
        //Arrange
        const recipeTitle = "Recipe title";
        const updatedRecipeTitle = "Updated Recipe";

        const recipeId = "64b8f0c4f1d2c8b5f6e8a1c2"
        mockingoose(RecipeModel).toReturn({title: recipeTitle, _id: recipeId}, "findOneAndUpdate");

        //Act   
        const res = await request(app).put(`/api/recipes/${recipeId}`).send({title: updatedRecipeTitle});

        //Assert
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(recipeTitle);
        expect(res.body._id).toBe(recipeId);
    })

    it("DELETE api/recipes/:id should delete recipe with input id", async() => {
        //Arrange
        const recipeId = "64b8f0c4f1d2c8b5f6e8a1c2"
        mockingoose(RecipeModel).toReturn({title: "Deleted Recipe", _id: recipeId}, "findOneAndDelete");

        //Act
        const res = await request(app).delete(`/api/recipes/${recipeId}`);

        //Assert
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Recipe deleted");
    })
});