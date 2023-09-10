import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

const signup: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.signup(req.body);
    sendResponse(res, {
       statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
})

const signin = catchAsync(async (req: Request, res: Response) => {
  const {...loginData} = req.body;
  const result = await authService.signin(loginData);
  const {access_token, ...others} = result;
   const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('accessToken', access_token, cookieOptions)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User signin successfully!',
    data: {
      access_token,
      others
    },
  })
})

export const AuthController = {
  signup,
  signin
}