/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from "@prisma/client";
import { BookData } from "./book.interface";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const includeCategory = {
  include: {
    Category: true,
  },
};

export const BookService = {
  createBook: async (bookData: BookData): Promise<Book> => {
    const existingBook = await prisma.book.findFirst({
      where: {title: bookData.title}
    })
    if(existingBook) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Books Already Exist")
    }
    return prisma.book.create({
      data: { ...bookData, categoryId: bookData.categoryId },
      ...includeCategory,
    });
  },

  getAllBooks: async (paginationOptions: any, filterOptions: any, orderByOptions: any): Promise<Book[]> => {
    return prisma.book.findMany({
      ...paginationOptions,
      where: filterOptions,
      orderBy: orderByOptions,
      ...includeCategory,
    });
  },

  countBooks: async (filterOptions: any): Promise<number> => {
    return prisma.book.count({
      where: filterOptions,
    });
  },

  getBookById: async (bookId: string): Promise<Book | null> => {
    return prisma.book.findUnique({
      where: { id: bookId },
      ...includeCategory,
    });
  },

  getBooksByCategoryId: async (categoryId: string): Promise<Book[]> => {
    try {
      return prisma.book.findMany({
        where: { categoryId },
        ...includeCategory,
      });
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "An error occurred while fetching books by category");
    }
  },

  updateBook: async (bookId: string, updates: Partial<Book>): Promise<Book> => {
    return prisma.book.update({
      where: { id: bookId },
      data: updates,
      ...includeCategory,
    });
  },

  deleteBook: async (bookId: string): Promise<Book> => {
    return prisma.book.delete({
      where: { id: bookId },
    });
  },
};
