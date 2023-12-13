const pool = require("../../utils/db");
const RecipeService = require("../../services/recipe.services");

jest.mock("../../utils/db");

describe("RecipeService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRecipeById", () => {
    test("should return the recipe with the specified ID", async () => {
      // Mock data
      const recipeId = 1;
      const mockRecipe = { id: recipeId, name: "Recipe 1" };

      // Mock the pool.query method
      pool.query.mockResolvedValueOnce({ rows: [mockRecipe] });

      // Call the getRecipeById method
      const recipe = await RecipeService.getRecipeById(recipeId);

      // Assert
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM public.recipe WHERE id = $1",
        [recipeId]
      );
      expect(recipe).toEqual(mockRecipe);
    });

    test("should return null if no recipe is found with the specified ID", async () => {
      // Mock data
      const recipeId = 1;

      // Mock the pool.query method
      pool.query.mockResolvedValueOnce({ rows: [] });

      // Call the getRecipeById method
      const recipe = await RecipeService.getRecipeById(recipeId);

      // Assert
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM public.recipe WHERE id = $1",
        [recipeId]
      );
      expect(recipe).toBeNull();
    });
  });

  describe("createRecipe", () => {
    test("should create a new recipe and return the created recipe", async () => {
      // Mock data
      const recipeData = {
        name: "New Recipe",
        description: "test",
        n_steps: 1,
        minutes: 1,
        steps: "test",
        calories: 1,
        fat: 1,
        sugar: 1,
        sodium: 1,
        protein: 1,
        sat_fat: 1,
        carbs: 1,
      };

      const mockCreatedRecipe = { id: 1, ...recipeData };

      // Mock the pool.query method
      pool.query.mockResolvedValueOnce({ rows: [mockCreatedRecipe] });

      // Call the createRecipe method
      const createdRecipe = await RecipeService.createRecipe(mockCreatedRecipe);

      // Assert
      expect(pool.query).toHaveBeenCalledTimes(1);
      // expect(pool.query).toHaveBeenCalledWith(
      //   "INSERT INTO public.recipe (name) VALUES ($1) RETURNING *",
      //   [recipeData.name]
      // );
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO public.recipe (id, name, description, n_steps, minutes, steps, calories, fat, sugar, sodium, protein, sat_fat, carbs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
        [
          mockCreatedRecipe.id,
          mockCreatedRecipe.name,
          mockCreatedRecipe.description,
          mockCreatedRecipe.n_steps,
          mockCreatedRecipe.minutes,
          mockCreatedRecipe.steps,
          mockCreatedRecipe.calories,
          mockCreatedRecipe.fat,
          mockCreatedRecipe.sugar,
          mockCreatedRecipe.sodium,
          mockCreatedRecipe.protein,
          mockCreatedRecipe.sat_fat,
          mockCreatedRecipe.carbs,
        ]
      );
      expect(createdRecipe).toEqual(mockCreatedRecipe);
    });
  });

  describe("updateRecipe", () => {
    test("should update the recipe with the specified ID and return the updated recipe", async () => {
      // Mock data
      const recipeId = 1;
      const recipeData = { name: "Updated Recipe" };
      const mockUpdatedRecipe = { id: recipeId, ...recipeData };

      // Mock the pool.query method
      pool.query.mockResolvedValueOnce({ rows: [mockUpdatedRecipe] });

      // Call the updateRecipe method
      const updatedRecipe = await RecipeService.updateRecipe(
        recipeId,
        recipeData
      );

      // Assert
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(updatedRecipe).toEqual(mockUpdatedRecipe);
    });
  });

  describe("deleteRecipe", () => {
    test("should delete the recipe with the specified ID", async () => {
      // Mock data
      const recipeId = 1;

      // Mock the pool.query method
      pool.query.mockResolvedValueOnce({ rows: [{ id: recipeId }] });

      // Call the deleteRecipe method
      const deletedResponse = await RecipeService.deleteRecipe(recipeId);

      // Assert
      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM public.recipe WHERE id = $1 RETURNING *",
        [recipeId]
      );
    });
  });
});
