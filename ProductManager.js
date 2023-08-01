const fs = require("fs");

class ProductManager {

constructor(path) {
  this.path = path;
}

async addProduct() {
  try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
  } catch (error) {
      return [];
  }
}

async CreateProduct(Product) {
  const newProduct = {
    Id: Product.Id ?? "sin id",
    Title: Product.Title ?? "sin titulo",
    Description: Product.Description ?? "sin descripcion",
    Price: Product.Price ?? "sin precio",
    Code: Product.Code ?? "sin codigo",
    Stock: Product.Stock ?? "sin stock"
  };

  const products = await this.addProduct();
  products.push(newProduct);


  try{
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
     
    console.log("producto agregado correctamente")
  } catch(e) {
    console.log("error al crear ese producto", e);
  }
} 

 async getProductById(id) {
  try {
    const productos = await this.addProduct();
    const product = productos.find((o) => o.id === id);
    return product || null;
  } catch (error) {
    throw new Error("Error al obtener el id");
  }

}

async deleteProduct(id) {
  try {
    let productos = await this.addProduct();
    productos = productos.filter((o) => o.id !== id);
    await this.addProduct(productos);
  } catch (error) {
    throw new Error("error al eliminar el objeto")
  }
}


}



module.exports = ProductManager;