import type { PageServerLoad } from './$types';
import type { thread } from "$customTypes/threads";

export const load: PageServerLoad = async ({ fetch }) => { 
    let threads: thread[] = [];
    let error: string = "";
    const res = await fetch(`/api/threads`);
    const data = await res.json();
    if (res.ok)
        threads = data.threads;
    else
        error = data.error;

    return { 
        threads,
        error,
    };
};