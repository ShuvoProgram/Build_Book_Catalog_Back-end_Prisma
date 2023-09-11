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
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const includeCategory = {
    include: {
        Category: true,
    },
};
exports.BookService = {
    createBook: (bookData) => __awaiter(void 0, void 0, void 0, function* () {
        const existingBook = yield prisma_1.default.book.findFirst({
            where: { title: bookData.title }
        });
        if (existingBook) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Books Already Exist");
        }
        return prisma_1.default.book.create(Object.assign({ data: Object.assign(Object.assign({}, bookData), { categoryId: bookData.categoryId }) }, includeCategory));
    }),
    getAllBooks: (paginationOptions, filterOptions, orderByOptions) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_1.default.book.findMany(Object.assign(Object.assign(Object.assign({}, paginationOptions), { where: filterOptions, orderBy: orderByOptions }), includeCategory));
    }),
    countBooks: (filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_1.default.book.count({
            where: filterOptions,
        });
    }),
    getBookById: (bookId) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_1.default.book.findUnique(Object.assign({ where: { id: bookId } }, includeCategory));
    }),
    getBooksByCategoryId: (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return prisma_1.default.book.findMany(Object.assign({ where: { categoryId } }, includeCategory));
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "An error occurred while fetching books by category");
        }
    }),
    updateBook: (bookId, updates) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_1.default.book.update(Object.assign({ where: { id: bookId }, data: updates }, includeCategory));
    }),
    deleteBook: (bookId) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_1.default.book.delete({
            where: { id: bookId },
        });
    }),
};
