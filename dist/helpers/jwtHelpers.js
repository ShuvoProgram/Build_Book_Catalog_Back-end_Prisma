"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const secret = config_1.default.jwt.secret || '';
const expireTime = config_1.default.jwt.expires_in || '30d';
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expireTime,
    });
};
const generateRefreshToken = (payload) => {
    const refreshToken = jsonwebtoken_1.default.sign({ _id: payload._id, role: payload.role }, config_1.default.jwt.refresh_secret, { expiresIn: config_1.default.jwt.refresh_expires_in });
    return refreshToken;
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
const getUserRoleFromToken = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        return decodedToken.role || null;
    }
    catch (error) {
        return null;
    }
};
const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        return decodedToken.userId || null;
    }
    catch (error) {
        return null;
    }
};
exports.jwtHelpers = {
    createToken,
    generateRefreshToken,
    verifyToken,
    getUserRoleFromToken,
    getUserIdFromToken
};
