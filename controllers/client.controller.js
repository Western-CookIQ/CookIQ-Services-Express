const ClientService = require("../services/client.services.js");
const Client = require("../models/client.model.js");

// Create Client
exports.createClient = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const clientData = new Client(
    req.body.id,
    req.body.is_first_login,
    req.body.is_public
  );

  ClientService.createClient(clientData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating a Client.",
      });
    });
};

// Get Client by ID
exports.getClientById = (req, res) => {
  const clientId = req.params.clientId;

  ClientService.getClientById(clientId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Client with id ${clientId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving a Client.",
      });
    });
};

// Update Client
exports.updateClient = (req, res) => {
  const clientId = req.params.clientId;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const clientData = new Client(
    clientId,
    req.body.is_first_login,
    req.body.is_public
  );

  ClientService.updateClient(clientId, clientData)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Client with id ${clientId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating a Client.",
      });
    });
};

// Delete Client
exports.deleteClient = (req, res) => {
  const clientId = req.params.clientId;

  ClientService.deleteClient(clientId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Client with id ${clientId} not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while deleting a Client.",
      });
    });
};
