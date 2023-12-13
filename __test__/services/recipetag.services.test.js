const pool = require("../../utils/db");
const RecipetagService = require("../../services/recipetag.services");

jest.mock("../../utils/db");

describe("RecipetagService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTagsForRecipe", () => {
    test("should return an array of tag IDs for the specified recipe ID", async () => {
      // Arrange
      const recipeId = 1;
      const expectedTags = [1, 2, 3];
      const queryResult = { rows: expectedTags.map((tag_id) => ({ tag_id })) };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const tags = await RecipetagService.getTagsForRecipe(recipeId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT tag_id FROM public.recipetag WHERE recipe_id = $1",
        [recipeId]
      );
      expect(tags).toEqual(expectedTags);
    });
  });

  describe("addTagToRecipe", () => {
    test("should add a tag to the specified recipe and return the added tag", async () => {
      // Arrange
      const recipeId = 1;
      const tagId = 1;
      const expectedTag = { recipe_id: 1, tag_id: 1 };
      const queryResult = { rows: [expectedTag] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const addedTag = await RecipetagService.addTagToRecipe(recipeId, tagId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO public.recipetag (recipe_id, tag_id) VALUES ($1, $2) RETURNING *",
        [recipeId, tagId]
      );
      expect(addedTag).toEqual(expectedTag);
    });
  });

  describe("removeTagFromRecipe", () => {
    test("should remove a tag from the specified recipe and return the removed tag", async () => {
      // Arrange
      const recipeId = 1;
      const tagId = 1;
      const expectedTag = { recipe_id: 1, tag_id: 1 };
      const queryResult = { rows: [expectedTag] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const removedTag = await RecipetagService.removeTagFromRecipe(
        recipeId,
        tagId
      );

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM public.recipetag WHERE recipe_id = $1 AND tag_id = $2 RETURNING *",
        [recipeId, tagId]
      );
      expect(removedTag).toEqual(expectedTag);
    });
  });
});
