const db = require('../models');
const ICondition = db.ICondition;

// Create and Save a new ICondition
exports.create = async (req, res) => {
  try {
    if (!req.body.condition_code || !req.body.category) {
      return res.status(400).send({
        message: "Condition code and category are required!"
      });
    }

    const iCondition = {
      condition_code: req.body.condition_code,
      category: req.body.category,
      description: req.body.description,
      cf: req.body.cf
    };

    const data = await ICondition.create(iCondition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ICondition."
    });
  }
};

// Retrieve all IConditions from the database
exports.findAll = async (req, res) => {
  try {
    const data = await ICondition.findAll();
    res.send(data);
  } catch (err) {
    console.error('Error fetching IConditions:', err); // Logging error for debugging
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving IConditions."
    });
  }
};


// Find a single ICondition with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await ICondition.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find ICondition with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving ICondition with id=" + id
    });
  }
};

// Update an ICondition by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    // Hapus kunci yang tidak ada dalam updateData
    const filteredUpdateData = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined && updateData[key] !== null) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    // Periksa apakah ada data untuk diperbarui
    if (Object.keys(filteredUpdateData).length === 0) {
      return res.status(400).send({
        message: "No fields to update."
      });
    }

    // Update ICondition
    const [num] = await ICondition.update(filteredUpdateData, {
      where: { id: id }
    });

    if (num === 1) {
      res.send({
        message: "ICondition was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update ICondition with id=${id}. Maybe ICondition was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating ICondition with id=" + id
    });
  }
};


// Delete an ICondition with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await ICondition.destroy({
      where: { id: id }
    });
    if (num === 1) {
      res.send({
        message: "ICondition was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete ICondition with id=${id}. Maybe ICondition was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete ICondition with id=" + id
    });
  }
};

// Delete all IConditions from the database
exports.deleteAll = async (req, res) => {
  try {
    const nums = await ICondition.destroy({
      where: {},
      truncate: false
    });
    res.send({ message: `${nums} IConditions were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all IConditions."
    });
  }
};
