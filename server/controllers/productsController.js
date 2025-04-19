const Product = require("../model/product");
const Seller = require("../model/seller");

exports.registerProduct = async (req, res) => {
  try {
    const {
      category,
      name,
      mrp,
      price,
      sellerId,
      manufacturer,
      weight,
      stock,
      img1,
      img2,
      description,
      expiry,
    } = req.body;

    if (
      !category ||
      !name ||
      !mrp ||
      !price ||
      !sellerId ||
      !manufacturer ||
      !weight ||
      stock === undefined ||
      !expiry
    ) {
      return res.status(400).json({
        message: "Missing required fields in request body.",
      });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found." });
    }

    const newProduct = new Product({
      category,
      name,
      mrp,
      price,
      sellerId,
      manufacturer,
      weight,
      stock,
      img1,
      img2,
      description,
      expiry,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product registered successfully",
      product: newProduct,
    });

  } catch (error) {
    console.error("Error registering product:", error);
    return res.status(500).json({
      message: "Something went wrong while registering the product.",
      error: error.message,
    });
  }
};
exports.getProductById = async (req, res) => {
    try {
      const { productId } = req.params;  
      
     
      const product = await Product.findById(productId);
      
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      return res.status(200).json({
        message: "Product fetched successfully",
        product,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({
        message: "Something went wrong while fetching the product.",
        error: error.message,
      });
    }
  };
exports.editProduct = async (req, res) => {
    try {
        const { productId } = req.params; 
        console.log("productID : ", productId)
        const { category, name, mrp, price, manufacturer, weight, stock, img1, img2, description, expiry } = req.body;
  

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.category = category || product.category;
      product.name = name || product.name;
      product.mrp = mrp || product.mrp;
      product.price = price || product.price;
      product.manufacturer = manufacturer || product.manufacturer;
      product.weight = weight || product.weight;
      product.stock = stock !== undefined ? stock : product.stock; 
      product.img1 = img1 || product.img1;
      product.img2 = img2 || product.img2;
      product.description = description || product.description;
      product.expiry = expiry || product.expiry;
  
      await product.save();
  
     
      return res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({
        message: "Something went wrong while updating the product.",
        error: error.message,
      });
    }
  };

  
  exports.deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;  
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const seller = await Seller.findById(product.sellerId);
      if (!seller) {
        return res.status(404).json({ message: "Seller not found" });
      }
  

  
      await Product.findByIdAndDelete(productId);
  
      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({
        message: "Something went wrong while deleting the product.",
        error: error.message,
      });
    }
  };


  