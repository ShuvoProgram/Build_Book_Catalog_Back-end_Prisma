import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import pick from "../../../shared/pick";
import { userFilterAbleFields } from "./user.constants";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const getAllUserFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await UserService.getAllUserFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully!",
        meta: result.meta,
        data: result.data
  })
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await UserService.getByIdFromDB(id);
  sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Single fetched successfully',
        data: result
    });
})

const updateIntoDB = catchAsync(async(req: Request, res: Response) => {
  const {id} = req.params;
  const payload = req.body;
  const result = await UserService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully',
        data: result
  })
})

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await UserService.deleteFromDB(id);
  sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result
    });
})

export const UserController = {
  getAllUserFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB
}