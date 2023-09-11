import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import httpStatus from "http-status";
import { getBookQueryOptions } from "./book.utils";

export const BookController = {
  createBook: catchAsync(async (req: Request, res: Response) => {
     const bookData = req.body;
    const book = await BookService.createBook(bookData);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book created successfully',
      data: book,
    });
  }),

  getAllBooks: catchAsync(async(req: Request, res: Response) => {
    const {paginationOptions, filterOptions, orderByOptions} = getBookQueryOptions(req);

    const [books, totalCount] = await Promise.all([
      BookService.getAllBooks(paginationOptions, filterOptions, orderByOptions),
      BookService.countBooks(filterOptions),
    ]);

    const totalPage = Math.ceil(totalCount / Number(paginationOptions.take))

     res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Books fetched successfully',
      meta: {
        page: Number(paginationOptions.skip) / Number(paginationOptions.take) + 1,
        size: Number(paginationOptions.take),
        total: totalCount,
        totalPage,
      },
      data: books,
    });
  }),

   getBookById: async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const book = await BookService.getBookById(bookId);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book fetched successfully',
      data: book,
    });
  },

  getBooksByCategoryId: async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const books = await BookService.getBooksByCategoryId(categoryId);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Books with associated category data fetched successfully',
      data: books,
    });
  },

  updateBook: async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const updates = req.body;
    const updatedBook = await BookService.updateBook(bookId, updates);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  },

  deleteBook: async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const deletedBook = await BookService.deleteBook(bookId);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book is deleted successfully',
      data: deletedBook,
    });
  },
  
}