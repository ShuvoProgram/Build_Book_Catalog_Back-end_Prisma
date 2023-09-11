"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
exports.BookValidation = {
    create: zod_1.z.object({
        body: zod_1.z.object({
            title: zod_1.z.string(),
            author: zod_1.z.string(),
            genre: zod_1.z.string(),
            price: zod_1.z.number(),
            publicationDate: zod_1.z.string(),
            categoryId: zod_1.z.string(),
        })
    }),
    update: zod_1.z.object({
        body: zod_1.z.object({
            title: zod_1.z.string().optional(),
            author: zod_1.z.string().optional(),
            genre: zod_1.z.string().optional(),
            price: zod_1.z.number().optional(),
            publicationDate: zod_1.z.string().optional(),
        })
    }),
};
