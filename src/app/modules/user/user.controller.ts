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

export const UserController = {
  getAllUserFromDB
}