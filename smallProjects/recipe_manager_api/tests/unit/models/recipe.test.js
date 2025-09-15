import mockingoose from "mockingoose";
import Recipe from "../../../models/Recipe.js";
import e from "express";

describe("Recipe Model Unit Tests", () => {
    it("Mock data correctly", async() => {
        //Arrange
        const recipeTitle = "Mock Recipe";
        const recipeIngredients = "mock ingredience";
        const recipeInstructions = "mock instructions";
        const recipeCategory = "mock category";

        mockingoose(Recipe).toReturn({
            title: recipeTitle, 
            ingredients: [recipeIngredients],
            instructions: recipeInstructions,
            category: recipeCategory,
        }, "findOne");

        //Act
        const recipe = await Recipe.findOne();

        //Assert
        expect(recipe.title).toBe(recipeTitle);
        expect(recipe.ingredients[0]).toBe(recipeIngredients);
        expect(recipe.instructions).toBe(recipeInstructions);
        expect(recipe.category).toBe(recipeCategory);
    })
});