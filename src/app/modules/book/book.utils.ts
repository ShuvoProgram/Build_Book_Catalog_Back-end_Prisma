/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

export const getBookQueryOptions = (req: Request) => {
  const {
    page = '1',
    size = '10',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    minPrice,
    maxPrice,
    category,
    search,
  } = req.query as {
    page?: string;
    size?: string;
    sortBy?: string;
    sortOrder?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    search?: string;
  };

  const paginationOptions = {
    skip: (Number(page) - 1) * Number(size),
    take: Number(size),
  };

  const filterOptions: any = {};
  if (minPrice) filterOptions.price = { gte: Number(minPrice) };
  if (maxPrice) filterOptions.price = { ...filterOptions.price, lte: Number(maxPrice) };
  if (category) filterOptions.categoryId = category;
  if (search) {
    filterOptions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { author: { contains: search, mode: 'insensitive' } },
      { genre: { contains: search, mode: 'insensitive' } },
    ];
  }

  const orderByOptions: any = {};
  orderByOptions[sortBy] = sortOrder;

  return { paginationOptions, filterOptions, orderByOptions };
};