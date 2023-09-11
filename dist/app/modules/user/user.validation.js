"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required"
        }),
        email: zod_1.z.string({
            required_error: "email is required"
        }),
        contactNo: zod_1.z.string({
            required_error: "contactNo is required"
        }),
        address: zod_1.z.string({
            required_error: "address is required"
        }),
        profileImg: zod_1.z.string({
            required_error: "profileImg is required"
        })
    })
});
exports.userValidation = {
    update
};
