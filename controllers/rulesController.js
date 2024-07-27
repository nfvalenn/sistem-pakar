const db = require('../models');

const createrules = async (req, res) => {
  try {
    const rules = await db.rules.create({
      i_condition_id: req.body.i_condition_id,
      af_condition_id: req.body.af_condition_id,
      kg_condition_id: req.body.kg_condition_id,
      ts_condition_id: req.body.ts_condition_id,
      h_condition_id: req.body.h_condition_id,
      result_id: req.body.result_id,
      cf: req.body.cf
    });
    res.status(201).json(rules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllruless = async (req, res) => {
  try {
    const ruless = await db.rules.findAll();
    res.status(200).json(ruless);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getrulesById = async (req, res) => {
  try {
    const rules = await db.rules.findByPk(req.params.id);
    if (rules) {
      res.status(200).json(rules);
    } else {
      res.status(404).json({ error: 'rules not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updaterules = async (req, res) => {
  try {
    const rules = await db.rules.findByPk(req.params.id);
    if (rules) {
      await rules.update(req.body);
      res.status(200).json(rules);
    } else {
      res.status(404).json({ error: 'rules not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleterules = async (req, res) => {
  try {
    const rules = await db.rules.findByPk(req.params.id);
    if (rules) {
      await rules.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'rules not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createrules,
  getAllruless,
  getrulesById,
  updaterules,
  deleterules
};
