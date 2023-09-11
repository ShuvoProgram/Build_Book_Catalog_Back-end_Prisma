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
exports.authService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const signup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user with the given email already exists
        const existingUser = yield prisma_1.default.user.findFirst({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new ApiError_1.default(http_status_1.default.FOUND, `User ${data.email} already exists`);
        }
        // Hash the user's password
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 12);
        // Create a new user
        const result = yield prisma_1.default.user.create({
            data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User creation failed");
        }
        return result;
    }
    catch (error) {
        // Handle and re-throw the error as an ApiError
        if (error instanceof ApiError_1.default) {
            throw error;
        }
        else if (error instanceof Error) {
            // Handle other unexpected errors
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message || "Internal server error");
        }
        else {
            // Handle non-Error objects
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }
});
const signin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma_1.default.user.findFirst({
            where: { email: data.email }
        });
        if (!existingUser) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `User ${data.email} doesn't exist`);
        }
        const checkPassword = bcrypt_1.default.compareSync(data.password, existingUser.password);
        if (!checkPassword) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Email address or password not valid");
        }
        const access_token = jwtHelpers_1.jwtHelpers.createToken({
            userId: existingUser.id,
            role: existingUser.role,
        });
        return { access_token };
    }
    catch (error) {
        console.log(error);
        // Handle any unexpected errors and re-throw them as ApiError
        if (error instanceof ApiError_1.default) {
            throw error;
        }
        else {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }
});
exports.authService = {
    signup,
    signin
};
