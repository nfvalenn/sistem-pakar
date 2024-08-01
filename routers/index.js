// index.js di folder routers

const articleRoutes = require("./article");
const userRoutes = require("./user");
const afConditionRoutes = require("./afcondition");
const hconditionRoutes = require("./hcondition");
const tsconditionRoutes = require("./tscondition");
const iconditionRoutes = require("./icondition");
const kgconditionRoutes = require("./kgcondition");
const resultRoutes = require("./result");
const ruleRoutes = require("./rules");
const konsultasiRoutes = require("./consultation");
const foodRoutes = require("./food");
const authRoutes = require("./auth");

module.exports = (app) => {
    // Pastikan semua router diimpor dengan benar dan diterapkan
    app.use('/api/articles', articleRoutes);
    app.use('/api/afconditions', afConditionRoutes);
    app.use('/api/hconditions', hconditionRoutes);
    app.use('/api/tsconditions', tsconditionRoutes);
    app.use('/api/iconditions', iconditionRoutes);
    app.use('/api/kgconditions', kgconditionRoutes);
    app.use('/api/results', resultRoutes);
    app.use('/api/foods', foodRoutes);
    app.use('/api', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/rules', ruleRoutes);
    app.use('/api/consultations', konsultasiRoutes);
};
