export class Design {
    id?: string;
    title?: string;
    updated_at?: string;
    cover?: {
        raw: string;
        medium: string;
        high: string;
        low: string;
    };
    thumbs?: {
        raw: string;
        medium: string;
        high: string;
        low: string;
    }
}