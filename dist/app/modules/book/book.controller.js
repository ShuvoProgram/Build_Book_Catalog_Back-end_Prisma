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
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const book_service_1 = require("./book.service");
const http_status_1 = __importDefault(require("http-status"));
const book_utils_1 = require("./book.utils");
exports.BookController = {
    createBook: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookData = req.body;
        const book = yield book_service_1.BookService.createBook(bookData);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Book created successfully',
            data: book,
        });
    })),
    getAllBooks: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { paginationOptions, filterOptions, orderByOptions } = (0, book_utils_1.getBookQueryOptions)(req);
        const [books, totalCount] = yield Promise.all([
            book_service_1.BookService.getAllBooks(paginationOptions, filterOptions, orderByOptions),
            book_service_1.BookService.countBooks(filterOptions),
        ]);
        const totalPage = Math.ceil(totalCount / Number(paginationOptions.take));
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Books fetched successfully',
            meta: {
                page: Number(paginationOptions.skip) / Number(paginationOptions.take) + 1,
                size: Number(paginationOptions.take),
                total: totalCount,
                totalPage,
            },
            data: books,
        });
    })),
    getBookById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookId = req.params.id;
        const book = yield book_service_1.BookService.getBookById(bookId);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Book fetched successfully',
            data: book,
        });
    }),
    getBooksByCategoryId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const categoryId = req.params.categoryId;
        const books = yield book_service_1.BookService.getBooksByCategoryId(categoryId);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Books with associated category data fetched successfully',
            data: books,
        });
    }),
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookId = req.params.id;
        const updates = req.body;
        const updatedBook = yield book_service_1.BookService.updateBook(bookId, updates);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookId = req.params.id;
        const deletedBook = yield book_service_1.BookService.deleteBook(bookId);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Book is deleted successfully',
            data: deletedBook,
        });
    }),
};
