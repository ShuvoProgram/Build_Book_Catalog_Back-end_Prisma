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

export const jwtHelpers = {
  createToken,
  generateRefreshToken,
  verifyToken,
};
