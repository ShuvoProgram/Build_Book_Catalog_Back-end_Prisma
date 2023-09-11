"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const profile_service_1 = require("./profile.service");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
exports.UserProfileController = {
    getUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Extract the token from the request headers
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
            }
            // Decode the token to get the userId
            const userId = jwtHelpers_1.jwtHelpers.getUserIdFromToken(token); // Ensure to handle token type as shown previously
            // Retrieve the user's profile data based on userId
            const userProfile = yield profile_service_1.UserProfileService.getUserProfile(userId);
            if (!userProfile) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User profile not found');
            }
            res.status(http_status_1.default.OK).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'User profile retrieved successfully',
                data: userProfile,
            });
        }
        catch (error) {
            res.status(error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR,
                message: error.message || 'Internal Server Error',
                data: null,
            });
        }
    }),
};
