import crypto from 'crypto';
import * as nanoid from 'nanoid';

const generateRandomString = (length = 12) => nanoid.nanoid(length);

const randomUUID = () => crypto.randomUUID();

const getRndInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export { generateRandomString, randomUUID, getRndInteger };
