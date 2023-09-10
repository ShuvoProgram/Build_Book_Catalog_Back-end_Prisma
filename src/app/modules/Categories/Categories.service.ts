/* eslint-disable @typescript-eslint/no-explicit-any */
import { Categories, Prisma } from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ICategoriesFilterRequest } from './Categories.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { categoriesSearchAbleFields } from './Categories.constants';

const createCategories = async (data: Categories): Promise<Categories> => {
   const existingCategories = await prisma.categories.findFirst({
      where: {title: data.title}
    })
    if(existingCategories) {
      throw new ApiError(httpStatus.FOUND, `Category ${data.title} already exists`)
    }
    const result = await prisma.categories.create({
    data
  });
  return result;
};

const getAllCategoriesFromDB = async (
  filters: ICategoriesFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Categories[]>> => {
  const {limit, page, skip} = paginationHelpers.calculatePagination(options);
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if(searchTerm) {
    andConditions.push({
      OR: categoriesSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  }

  if(Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: (filtersData as any)[key]
        }
      }))
    })
  }

  const whereConditions: Prisma.CategoriesWhereInput = andConditions.length > 0 ? {AND: andConditions} : {};

  const result = await prisma.categories.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? {
      [options.sortBy]: options.sortOrder} : {
        createdAt: 'desc'
      }
  })

  const total = await prisma.categories.count({
    where: whereConditions
  });

  return {
    meta: {
      total,
      page,
      limit
    },
    data: result
  }
}


export const CategoriesService = {
  createCategories,
  getAllCategoriesFromDB
}