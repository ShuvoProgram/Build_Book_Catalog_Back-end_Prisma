/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config';
const secret: string = config.jwt.secret || '';
const expireTime: string = config.jwt.expires_in || '30d';

const createToken = (payload: object): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const generateRefreshToken = (payload: Record<string, unknown>): string => {
  const refreshToken = jwt.sign(
    {_id: payload._id, role: payload.role},
    config.jwt.refresh_secret as string,
    {expiresIn: config.jwt.refresh_expires_in}
  );
  return refreshToken;
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

const getUserRoleFromToken = (token: string): string | null => {
  try {
    const decodedToken: any = jwt.verify(token, secret);
    return decodedToken.role || null;
  } catch (error) {
    return null;
  }
};

const getUserIdFromToken = (token: string): string | null => {
  try {
    const decodedToken: any = jwt.verify(token, secret);
    return decodedToken.userId || null;
  } catch (error) {
    return null;
  }
}

export const jwtHelpers = {
  createToken,
  generateRefreshToken,
  verifyToken,
  getUserRoleFromToken,
  getUserIdFromToken
};
