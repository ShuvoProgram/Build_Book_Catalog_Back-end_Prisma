/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IUserFilterRequest } from "./user.interface";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { userSearchAbleFields } from "./user.constants";
import prisma from "../../../shared/prisma";

const getAllUserFromDB = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const {limit, page, skip} = paginationHelpers.calculatePagination(options);
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if(searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {AND: andConditions} : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? {
      [options.sortBy]: options.sortOrder} : {
        createdAt: 'desc'
      }
  })

  const total = await prisma.user.count({
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

const getByIdFromDB = async(id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id
    }
  })
  return result;
}

const updateIntoDB = async (id: string, payload: Partial<User>): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data: payload
  })
  return result;
}

const deleteFromDB = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id
    }
  })
  return result;
}

export const UserService = {
  getAllUserFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB
}