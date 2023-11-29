const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); 

const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require('./routes/orderRoutes');
const categoriesRoutes = require("./routes/categoriesRoutes")
const productsRoutes = require("./routes/productsRoutes")
const UserRoutes= require('./routes/userRoutes');
const SubcategoryRoutes = require("./routes/subCategoriesRoutes");



const { notFound, errorHandler } = require('./middlewares/errorMidellware')

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("API is running");
});

app.use('/v1/customers', customerRoutes);
app.use('/v1/orders', orderRoutes);
app.use("/v1/categories", categoriesRoutes)
app.use("/v1/products", productsRoutes)
app.use('/v1/users', UserRoutes);
app.use("/v1/subCategories", SubcategoryRoutes);

app.use(notFound, errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });