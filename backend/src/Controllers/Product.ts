import { Product } from "../Models/ProductModal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import slug from "slug";
import { Category } from "../Models/CategoryModal.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/Cloduinary.js";
import type { Request, Response } from "express";
import type { ResourceApiResponse } from "cloudinary";

const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, price, category, stock, isFeatured, isDeal, isRecommended,
        discountPercentage
    } = req.body;

    if (!name || !description || !price || !category) {
        throw new ApiError(400, "This field is required");
    }
    // check for Image
    const photoLocalPath = req.file?.path;
    console.log(photoLocalPath);

    if (!photoLocalPath) {
        throw new ApiError(400, "Product Image is Required");
    }
    const photoFile = req.file;
    const maxFileSize = 4 * 1024 * 1024
    if (photoFile && photoFile.size > maxFileSize) {
        throw new ApiError(400, "Image size must be less than 4 MB");
    }
    // upload to cloudinary 
    const photo = await uploadOnCloudinary(photoLocalPath)
    if (!photo) {
        throw new ApiError(500, "Failed to upload photo. Please try again.");
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
        throw new ApiError(404, "Category not found");
    }
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        throw new ApiError(409, "Product already exists");
    }
    const product = await Product.create({
        name,
        description,
        price: Number(price),
        category: existingCategory._id,
        stock: Number(stock) || 0,
        image: photo.secure_url,
        slug: slug(name),
        isFeatured: isFeatured || false,
        isDeal: isDeal || false,
        isRecommended: isRecommended || false,
        discountPercentage: discountPercentage
    })
    return res
        .status(201)
        .json(new ApiResponse(200, product, "Product created Successfully"));



})


// get products
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const products = await Product.find({})
            .populate("category", "name") 
           

        if (!products || products.length === 0) {
            throw new ApiError(404, "No products found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, products, "Products fetched successfully"));

    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
});


// get-product

const getProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const slugparam = req.params.slug;
        if (!slugparam) {
            throw new ApiError(400, "Invalid Product slug");
        }
        const product = await Product.findOne({ slug: slugparam })
            .populate("category", "name") // only fetch category name

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, product, "Product fetched successfully"));

    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
});

// update Product

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Product ID is required");
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      throw new ApiError(404, "Product not found");
    }

    const {
      name,
      description,
      price,
      stock,
      isFeatured,
      isDeal,
      isRecommended,
      discountPercentage,
      category, 
    } = req.body;

    // Update image if provided
    if (req.file?.path) {
      await deleteFromCloudinary(existingProduct.image);

      const uploaded = await uploadOnCloudinary(req.file.path);
      if (!uploaded) {
        throw new ApiError(500, "Failed to upload new image");
      }

      existingProduct.image = uploaded.secure_url;
    }

    if (name) {
      existingProduct.name = name;
      existingProduct.slug = slug(name);
    }

    if (description) existingProduct.description = description;
    if (price !== undefined) existingProduct.price = Number(price);
    if (stock !== undefined) existingProduct.stock = Number(stock);

    if (isFeatured !== undefined) existingProduct.isFeatured = isFeatured;
    if (isDeal !== undefined) existingProduct.isDeal = isDeal;
    if (isRecommended !== undefined) existingProduct.isRecommended = isRecommended;

    if (discountPercentage !== undefined && discountPercentage !== "") {
      existingProduct.discountPercentage = Number(discountPercentage);
    }

    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        throw new ApiError(404, "Category not found");
      }
      existingProduct.category = existingCategory._id;
    }

    await existingProduct.save();

    return res
      .status(200)
      .json(new ApiResponse(200, existingProduct, "Product updated successfully"));

  } catch (error) {
    return res.status(500).json(new ApiError(500,"Internal Server Error")
    );
  }
});




const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            throw new ApiError(404, "Product Not Found")
        }
        return res
            .status(200)
            .json(new ApiResponse(200, product, "Product deleted Successfully"))

    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));

    }



})

export {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}