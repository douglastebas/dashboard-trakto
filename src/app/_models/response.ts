import { Design } from "./design"

export class Response {
    data?: Array<Design>;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    nextCursor?: String;
}