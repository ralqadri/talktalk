import type { PageServerLoad } from './$types';
import { isArray } from '$customTypes';
import { isThread, type thread } from "$customTypes/threads";
import { isBoard, type board } from '$customTypes/boards';
import { redirect } from '@sveltejs/kit';
import { apiFetch } from '$lib';

export const load: PageServerLoad = async ({ params, fetch }) => { 
    let threads: thread[] = [];
    let error: string = "";
    let boardInfo: board;

    const boardRes = await apiFetch(fetch, isBoard, `/api/boards/${params.id}`);
    if (boardRes.ok)
        boardInfo = boardRes.content;
    else {
        console.error(boardRes);
        redirect(302, "/");
    }

    const threadRes = await apiFetch(fetch, (obj) => isArray(obj, isThread), `/api/threads/board/${boardInfo.id}`);
    if (threadRes.ok)
        threads = threadRes.content;
    else
        error = threadRes.error;

    return {
        boardInfo,
        threads,
        error,
    };
};