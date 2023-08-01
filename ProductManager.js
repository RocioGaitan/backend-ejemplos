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

 async saveObject(productos) {
   try {
     await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
     console.log("Productos guardados correctamente en el archivo");
    } catch (error) {
      console.error("Error al guardar los productos en el archivo:", error.message);
   }
 }

 async deleteProduct(id) {
   try {
     let productos = await this.addProduct();
     productos = productos.filter((o) => o.Id !== id);
     await this.saveObject(productos);
    } catch (error) {
     throw new Error("error al eliminar el objeto");
    }
  }


 async updateProduct(objeto) {
   try {
     const productos = await this.addProduct();
     const productIndex = productos.findIndex((o) => o.Id === objeto.Id);

     if (productIndex === -1) {
      throw new Error("El producto con el ID proporcionado no existe.");
     }

     productos[productIndex] = {
      ...productos[productIndex],
      ...objeto
     };

     await this.saveObject(productos);

     console.log("Producto actualizado correctamente");
    } catch (error) {
     console.error("Error al actualizar el producto:", error.message);
    }
  }

}



module.exports = ProductManager;