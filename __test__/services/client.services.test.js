const pool = require("../../utils/db");
const ClientService = require("../../services/client.services");

jest.mock("../../utils/db");

describe("ClientService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getClientById", () => {
    test("should return the client with the specified clientId", async () => {
      // Arrange
      const clientId = 1;
      const expectedClient = { id: 1, is_first_login: true, is_public: false };
      const queryResult = { rows: [expectedClient] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const client = await ClientService.getClientById(clientId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM public.client WHERE id = $1",
        [clientId]
      );
      expect(client).toEqual(expectedClient);
    });
  });

  describe("createClient", () => {
    test("should create a new client and return it", async () => {
      // Arrange
      const clientData = {
        id: 1,
        is_first_login: true,
        is_public: false,
      };
      const expectedClient = { id: 1, is_first_login: true, is_public: false };
      const queryResult = { rows: [expectedClient] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const createdClient = await ClientService.createClient(clientData);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO public.client (id, is_first_login, is_public) VALUES ($1, $2, $3) RETURNING *",
        [1, true, false]
      );
      expect(createdClient).toEqual(expectedClient);
    });
  });

  describe("updateClient", () => {
    test("should update the client with the specified clientId and return it", async () => {
      // Arrange
      const clientId = 1;
      const clientData = { is_first_login: false, is_public: true };
      const expectedClient = { id: 1, is_first_login: false, is_public: true };
      const queryResult = { rows: [expectedClient] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const updatedClient = await ClientService.updateClient(
        clientId,
        clientData
      );

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE public.client SET is_first_login = $2, is_public = $3 WHERE id = $1 RETURNING *",
        [1, false, true]
      );
      expect(updatedClient).toEqual(expectedClient);
    });
  });

  describe("deleteClient", () => {
    test("should delete the client with the specified clientId and return it", async () => {
      // Arrange
      const clientId = 1;
      const expectedClient = { id: 1, is_first_login: true, is_public: false };
      const queryResult = { rows: [expectedClient] };
      pool.query.mockResolvedValue(queryResult);

      // Act
      const deletedClient = await ClientService.deleteClient(clientId);

      // Assert
      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM public.client WHERE id = $1 RETURNING *",
        [1]
      );
      expect(deletedClient).toEqual(expectedClient);
    });
  });
});
