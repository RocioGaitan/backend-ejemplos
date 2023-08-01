const ProductManager = require('./ProductManager.js');

const PM = new ProductManager('./Products.json');

const newProduct = {
    Id: "1",
    Title: "Taza homero js",
    Description: "taza de ceramica",
    Price: "1500",
    Code: "001",
    Stock: 10
}

PM.CreateProduct(newProduct);

