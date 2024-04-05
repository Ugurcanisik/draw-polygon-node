import { InternalError as IInternalError } from 'models/interfaces';
import { HttpStatusCode } from '@constants';

export default class InternalError extends Error implements IInternalError {
    httpCode: number;

    constructor({ message, httpCode }: IInternalError) {
        super(message);

        this.httpCode = httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
