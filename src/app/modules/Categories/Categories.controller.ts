import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoriesService } from "./Categories.service";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { categoriesFilterAbleFields } from "./Categories.constants";

const createCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.createCategories(req.body);
sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories created successfully',
        data: result
    });
})

const getAllCategoriesFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoriesFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await CategoriesService.getAllCategoriesFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully!",
        meta: result.meta,
        data: result.data
  })
})

const updateIntoDB = catchAsync(async(req: Request, res: Response) => {
  const {id} = req.params;
  const payload = req.body;
  const result = await CategoriesService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: result
  })
})

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await CategoriesService.deleteFromDB(id);
  sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: result
    });
})

export const CategoriesController = {
  createCategories,
  getAllCategoriesFromDB,
  updateIntoDB,
  deleteFromDB
}