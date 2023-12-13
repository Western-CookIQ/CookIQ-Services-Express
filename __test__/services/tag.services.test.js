const pool = require("../../utils/db");
const TagService = require("../../services/tag.services");

jest.mock("../../utils/db");

describe("TagService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTagById", () => {
    test("should return the tag with the specified tagId", async () => {
      // Arrange
      const tagId = 1;
      const expectedTag = { id: 1, description: "Tag 1" };
      const queryResult = { rows: [expectedTag] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const tag = await TagService.getTagById(tagId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM public.tag WHERE id = $1",
        [tagId]
      );
      expect(tag).toEqual(expectedTag);
    });
  });

  describe("createTag", () => {
    test("should create a new tag and return it", async () => {
      // Arrange
      const tagData = { id: 1, description: "New Tag" };
      const expectedTag = { id: 1, description: "New Tag" };
      const queryResult = { rows: [expectedTag] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const createdTag = await TagService.createTag(tagData);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO public.tag (id, description) VALUES ($1, $2) RETURNING *",
        [1, "New Tag"]
      );
      expect(createdTag).toEqual(expectedTag);
    });
  });

  describe("updateTag", () => {
    test("should update the tag with the specified tagId and return it", async () => {
      // Arrange
      const tagId = 1;
      const tagData = { description: "Updated Tag" };
      const expectedTag = { id: 1, description: "Updated Tag" };
      const queryResult = { rows: [expectedTag] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const updatedTag = await TagService.updateTag(tagId, tagData);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE public.tag SET description = $2 WHERE id = $1 RETURNING *",
        [1, "Updated Tag"]
      );
      expect(updatedTag).toEqual(expectedTag);
    });
  });

  describe("deleteTag", () => {
    test("should delete the tag with the specified tagId and return it", async () => {
      // Arrange
      const tagId = 1;
      const expectedTag = { id: 1, description: "Tag 1" };
      const queryResult = { rows: [expectedTag] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const deletedTag = await TagService.deleteTag(tagId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM public.tag WHERE id = $1 RETURNING *",
        [1]
      );
      expect(deletedTag).toEqual(expectedTag);
    });
  });
});
