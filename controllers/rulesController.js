const { Rule } = require('../models');

const createRule = async (req, res) => {
  try {
    const rule = await Rule.create({
      i_condition_id: req.body.i_condition_id,
      af_condition_id: req.body.af_condition_id,
      kg_condition_id: req.body.kg_condition_id,
      ts_condition_id: req.body.ts_condition_id,
      h_condition_id: req.body.h_condition_id,
      result_id: req.body.result_id,
      cf: req.body.cf,
    });
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllRules = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Rule.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    res.status(200).json({
      total: count,
      page: page,
      totalPages: Math.ceil(count / limit),
      rules: rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRuleById = async (req, res) => {
  try {
    const rule = await Rule.findByPk(req.params.id);
    if (rule) {
      res.status(200).json(rule);
    } else {
      res.status(404).json({ error: 'Rule not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRule = async (req, res) => {
  try {
    const rule = await Rule.findByPk(req.params.id);
    if (rule) {
      await rule.update(req.body);
      res.status(200).json(rule);
    } else {
      res.status(404).json({ error: 'Rule not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRule = async (req, res) => {
  try {
    const rule = await Rule.findByPk(req.params.id);
    if (rule) {
      await rule.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Rule not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRule,
  getAllRules,
  getRuleById,
  updateRule,
  deleteRule,
};
