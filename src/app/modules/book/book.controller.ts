import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import httpStatus from "http-status";

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
  })
}