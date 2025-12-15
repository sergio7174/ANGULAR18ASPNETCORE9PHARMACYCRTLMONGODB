"use strict";

// require express module

const
 express = require("express"),

  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),
  
  authRoutes = require('./authRoute'),
  productRoutes = require('./productRoute'),
  supplierRoutes = require('./supplierRoutes'),
  userRoutes = require('./userRoutes'),
  saleRoutes = require('./saleRoutes'),
  categoryRoutes = require('./categoryRoutes');

  router.use('/api/auth', authRoutes);
  router.use('/api/product', productRoutes);
  router.use('/api/category', categoryRoutes);
  router.use('/api/supplier', supplierRoutes);
  router.use('/api/user', userRoutes);
  router.use('/api/sales', saleRoutes);

  module.exports = router;