import type { PageServerLoad } from './$types';
import { isArray } from '$customTypes';
import { isPost, type post } from "$customTypes/posts";
import { isThread, type thread } from '$customTypes/threads';
import { redirect } from '@sveltejs/kit';
import { apiFetch } from '$lib';

export const load: PageServerLoad = async ({ params, fetch }) => { 
    let posts: post[] = [];
    let error: string = "";
    let threadInfo: thread;

    const threadRes = await apiFetch(fetch, isThread, `/api/threads/${params.id}`);
    if (threadRes.ok)
        threadInfo = threadRes.content;
    else {
        console.error(threadRes);
        redirect(302, "/");
    }

    const postRes = await apiFetch(fetch, (obj) => isArray(obj, isPost), `/api/posts/${threadInfo.id}`);
    if (postRes.ok)
        posts = postRes.content;
    else
        error = postRes.error;

    return {
        threadInfo,
        posts,
        error,
    };
};