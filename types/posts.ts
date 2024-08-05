export interface post {
	id: number;
	thread_id: number;
	content: string;
	created_at: string;
}

export function isPost(obj: any): obj is post {
	return (
		obj &&
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.thread_id === "number" &&
		typeof obj.content === "string" &&
		typeof obj.created_at === "string"
	);
}