export interface thread {
	id: number;
	board_id: number;
	title: string;
	content: string;
	created_at: string;
}

export function isThread(obj: any): obj is thread {
	return (
		obj &&
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.board_id === "number" &&
		typeof obj.title === "string" &&
		typeof obj.content === "string" &&
		typeof obj.created_at === "string"
	);
}