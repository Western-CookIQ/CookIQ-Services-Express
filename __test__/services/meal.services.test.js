const pool = require("../../utils/db");
const MealService = require("../../services/meal.services");

jest.mock("../../utils/db");

describe("MealService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMealByRecipeIdAndUserId", () => {
    test("should return the meal with the specified recipeId and userId", async () => {
      // Arrange
      const recipeId = 1;
      const userId = 1;
      const expectedMeal = { id: 1, recipe_id: 1, user_id: 1 /* ... */ };
      const queryResult = { rows: [expectedMeal] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const meal = await MealService.getMealByRecipeIdAndUserId(
        recipeId,
        userId
      );

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM public.meal WHERE recipe_id = $1 AND user_id = $2",
        [recipeId, userId]
      );
      expect(meal).toEqual(expectedMeal);
    });
  });

  describe("getMealsByUserId", () => {
    test("should return an array of meals for the specified userId", async () => {
      // Arrange
      const userId = 1;
      const expectedMeals = [
        { recipe_id: 1, rating: 5 },
        { recipe_id: 2, rating: 4 },
      ];
      const queryResult = { rows: expectedMeals };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const meals = await MealService.getMealsByUserId(userId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT recipe_id, rating FROM public.meal WHERE user_id = $1",
        [userId]
      );
      expect(meals).toEqual(expectedMeals);
    });
  });

  describe("createMeal", () => {
    test("should create a new meal and return it", async () => {
      // Arrange
      const mealData = {
        recipe_id: 1,
        user_id: 1,
        is_bookmarked: true,
        rating: 5,
        is_cooked: true,
      };
      const expectedMeal = { id: 1, recipe_id: 1, user_id: 1 /* ... */ };
      const queryResult = { rows: [expectedMeal] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const createdMeal = await MealService.createMeal(mealData);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO public.meal (recipe_id, user_id, is_bookmarked, rating, is_cooked) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [1, 1, true, 5, true]
      );
      expect(createdMeal).toEqual(expectedMeal);
    });
  });

  describe("updateMeal", () => {
    test("should update the meal with the specified recipeId and userId and return it", async () => {
      // Arrange
      const recipeId = 1;
      const userId = 1;
      const mealData = { is_bookmarked: true, rating: 4, is_cooked: false };
      const expectedMeal = { id: 1, recipe_id: 1, user_id: 1 /* ... */ };
      const queryResult = { rows: [expectedMeal] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const updatedMeal = await MealService.updateMeal(
        recipeId,
        userId,
        mealData
      );

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE public.meal SET is_bookmarked = $3, rating = $4, is_cooked = $5 WHERE recipe_id = $1 AND user_id = $2 RETURNING *",
        [1, 1, true, 4, false]
      );
      expect(updatedMeal).toEqual(expectedMeal);
    });
  });

  describe("deleteMeal", () => {
    test("should delete the meal with the specified recipeId and userId and return it", async () => {
      // Arrange
      const recipeId = 1;
      const userId = 1;
      const expectedMeal = { id: 1, recipe_id: 1, user_id: 1 /* ... */ };
      const queryResult = { rows: [expectedMeal] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const deletedMeal = await MealService.deleteMeal(recipeId, userId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM public.meal WHERE recipe_id = $1 AND user_id = $2 RETURNING *",
        [1, 1]
      );
      expect(deletedMeal).toEqual(expectedMeal);
    });
  });
});
