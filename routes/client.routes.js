const ClientController = require("../controllers/client.controller.js");
const authenticateToken = require("./middleware.js");

module.exports = (app) => {
  const router = require("express").Router();
  router.use(authenticateToken);
  app.use("/api/client", router);

  // Create Client
  router.post("/", ClientController.createClient);

  // Get Client by ID
  router.get("/:clientId", ClientController.getClientById);

  // Update Client
  router.put("/:clientId", ClientController.updateClient);

  // Delete Client
  router.delete("/:clientId", ClientController.deleteClient);
};
