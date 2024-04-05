import InternalError from './internalError';
import { HttpStatusCode } from '@constants';
import { InternalError as IInternalError } from 'models/interfaces';

export default class NotFoundError extends InternalError {
    httpCode: number;

    constructor({ message, httpCode }: IInternalError) {
        super({ message });

        this.httpCode = httpCode || HttpStatusCode.NOT_FOUND;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
