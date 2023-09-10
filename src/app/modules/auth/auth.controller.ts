import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const signup: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.signup(req.body);
    sendResponse(res, {
       statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully',
        data: result
    })
})

export const AuthController = {
  signup
}