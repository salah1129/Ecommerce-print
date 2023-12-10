//index.jsx

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const customerRoutes = require('./routes/customerRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const subcategoryRoutes = require('./routes/subCategoriesRoutes');

const { notFound, errorHandler } = require('./middlewares/errorMidellware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/v1/customers', customerRoutes);
app.use('/v1/categories', categoriesRoutes);
app.use('/v1/products', productsRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/subCategories', subcategoryRoutes);

app.use(notFound, errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});