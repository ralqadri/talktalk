export interface board {
	id: number;
	name: string;
	description: string;
	board_code: string;
	created_at: string;
}

export function isBoard(obj: any): obj is board {
	return (
		obj &&
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.name === "string" &&
		typeof obj.description === "string" &&
		typeof obj.board_code === "string" &&
		typeof obj.created_at === "string"
	);
}
