export interface board {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export function isBoard(obj: any): obj is board {
    return (
        obj &&
        typeof obj === "object" &&
        typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.description === "string" &&
        typeof obj.created_at === "string"
    );
}