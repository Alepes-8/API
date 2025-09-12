import mockingoose from "mockingoose";
import Recipe from "./Recipe";

test("Should return a mock recipe", async() => {
    mockingoose(Recipe).toReturn({Title: "Test Recipe"}, "find one")
})