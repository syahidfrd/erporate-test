const axios = require('axios');
const Product = require('../models/product');
const xml2js = require('xml2js');

/**
 * Save Product to local storage
 */
exports.exportProduct = async (req, res) => {
  try {
    /**
     * GET Daftar Product
     */
    const url =
      'https://api.elevenia.co.id/rest/prodservices/product/listing?page=1';

    /**
     * GET Detail Product by Product Number
     */
    const url2 =
      'https://api.elevenia.co.id/rest/prodservices/product/details/';

    const Header = {
      'Content-Type': 'text/xml;charset=UTF-8',
      openapikey: process.env.API_KEY_ELEVENIA
    };

    const resp = await axios.get(url, {
      headers: Header
    });

    const result = await xml2js.parseStringPromise(resp.data);
    const dataProduct = result.Products.product;

    await Promise.all(
      dataProduct.map(async (val, i) => {
        const resp2 = await axios.get(url2 + val.prdNo[0], { headers: Header });

        const detailProduct = await xml2js.parseStringPromise(resp2.data);

        const data = detailProduct.Product;

        await new Product({
          name: data.prdNm[0],
          stock: data.stock[0],
          image: data.prdImage01[0],
          description: data.htmlDetail[0],
          price: data.selPrc[0]
        }).save();
      })
    );

    res.status(200).json({
      message: 'Products succesfully exported'
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
};

exports.index = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      message: 'Data Product',
      data: product,
      length: product.length
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    await new Product(req.body).save();
    res.status(200).json({
      message: 'Product created'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: 'Product Updated'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: 'Product deleted'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(401).json({
        error: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Data product by id',
      data: product
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
