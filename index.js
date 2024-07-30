require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import cors
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
const foodRecommendation = require('./routers/food');

const app = express();
const PORT = process.env.PORT || 5000;

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/article', article);
app.use('/api/rules', rules);
app.use('/api/icondition', IConditionRoutes);
app.use('/api/afcondition', AFConditionRoutes);
app.use('/api/kgcondition', KGConditionRoutes);
app.use('/api/tscondition', TSConditionRoutes);
app.use('/api/hcondition', HConditionRoutes);
app.use('/api/result', result);
app.use('/api/consultations', consultation);
app.use('/api/food', foodRecommendation);

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
