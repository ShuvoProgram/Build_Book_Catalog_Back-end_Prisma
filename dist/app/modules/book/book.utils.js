"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookQueryOptions = void 0;
const getBookQueryOptions = (req) => {
    const { page = '1', size = '10', sortBy = 'createdAt', sortOrder = 'desc', minPrice, maxPrice, category, search, } = req.query;
    const paginationOptions = {
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
    };
    const filterOptions = {};
    if (minPrice)
        filterOptions.price = { gte: Number(minPrice) };
    if (maxPrice)
        filterOptions.price = Object.assign(Object.assign({}, filterOptions.price), { lte: Number(maxPrice) });
    if (category)
        filterOptions.categoryId = category;
    if (search) {
        filterOptions.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { author: { contains: search, mode: 'insensitive' } },
            { genre: { contains: search, mode: 'insensitive' } },
        ];
    }
    const orderByOptions = {};
    orderByOptions[sortBy] = sortOrder;
    return { paginationOptions, filterOptions, orderByOptions };
};
exports.getBookQueryOptions = getBookQueryOptions;
