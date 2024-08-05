import type { PageServerLoad } from './$types';
import { isThread, type thread } from "$customTypes/threads";
import { apiFetch } from '$lib';
import { isArray } from '$customTypes';

export const load: PageServerLoad = async ({ fetch }) => {
    let threads: thread[] = [];
    let error: string = "";
    const res = await apiFetch(fetch, (obj) => isArray(obj, isThread), "/api/threads");
    if (res.ok)
        threads = res.content;
    else
        error = res.error;

    return { 
        threads,
        error,
    };
};