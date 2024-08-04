import type { PageServerLoad } from './$types';
import type { post } from "$customTypes/posts";
import type { thread } from '$customTypes/threads';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => { 
    let posts: post[] = [];
    let error: string = "";
    let threadInfo: thread;

    const threadRes = await fetch(`/api/threads/${params.id}`);
    const threadData = await threadRes.json();
    if (threadRes.ok)
        threadInfo = threadData;
    else
        redirect(302, "/");

    const postRes = await fetch(`/api/posts/${params.id}`);
    const postData = await postRes.json();
    if (postRes.ok)
        posts = postData.posts;
    else
        error = postData.error;

    return {
        threadInfo,
        posts,
        error,
    };
};