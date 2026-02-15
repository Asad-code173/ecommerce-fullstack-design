import { Category } from "../Models/CategoryModal.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import slug from "slug"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import type { Request, Response } from "express";



const insertCategory = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new ApiError(400, "This is required")
        }
        const exisitedCategory = await Category.findOne({ name })

        if (exisitedCategory) {
            throw new ApiError(409, "Category Already exsist");
        }
        const createNewCategory = await Category.create({ name, slug: slug(name) })

        return res
            .status(201)
            .json(new ApiResponse(200, createNewCategory, "Category created Successfully"));

    } catch (error) {
        console.log("Error " + error);

    }
})

const getCategory = asyncHandler(async (req: Request, res: Response) => {

    const categories = await Category.find({});

    // Check if categories were found
    if (!categories || categories.length === 0) {
        throw new ApiError(404, "No Categories Found")
    }

    return res
        .status(201)
        .json(new ApiResponse(200, categories, "Categories fetched  Successfully"));

});

const getSingleCategory = asyncHandler(async (req: Request, res: Response) => {
    const slugParam = req.params.slug;
    if (!slugParam) {
        throw new ApiError(400, "Invalid category slug");

    }
    const singleCategory = await Category.findOne({ slug: slugParam });
    if (!singleCategory) {
        throw new ApiError(404, "Category not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, singleCategory, "Category fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate
            (id,
                { name, slug: slug(name) },
                { new: true }
            )
        if (!category) {
            throw new ApiError(500, "Some thing went wrong while updating Category")
        }
        return res
            .status(201)
            .json(new ApiResponse(200, category, "Category updated Successfully"));
    } catch (error) {
        console.log(error);

    }

})

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, "Category deleted successfully"));
    } catch (error) {
        console.log("Error in deleting category", error);

    }
});
export {
    insertCategory,
    getCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
}
