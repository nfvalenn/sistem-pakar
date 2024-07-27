require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models');
const authRoutes = require('./routers/auth');
const article = require('./routers/article');
const rules = require('./routers/rules');
const IConditionRoutes = require('./routers/icondition');
const AFConditionRoutes = require('./routers/afcondition');
const KGConditionRoutes = require('./routers/kgcondition');
const TSConditionRoutes = require('./routers/tscondition');
const HConditionRoutes = require('./routers/hcondition');
const result = require('./routers/result');
const consultation = require('./routers/consultation');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/api', article);
app.use('/api/rules', rules);
app.use('/api', IConditionRoutes);
app.use('/api', AFConditionRoutes);
app.use('/api', KGConditionRoutes);
app.use('/api', TSConditionRoutes);
app.use('/api', HConditionRoutes);
app.use('/api', result);
app.use('/api', consultation);

db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Database sync error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
