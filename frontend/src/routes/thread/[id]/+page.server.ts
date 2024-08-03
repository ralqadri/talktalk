import type { PageServerLoad } from './$types';
import type { post } from "$customTypes/posts";

export const load: PageServerLoad = async ({ params, fetch }) => { 
    let posts: post[] = [];
    let error: string = "";
    const res = await fetch(`/api/posts/${params.id}`);
    const data = await res.json();
    if (res.ok)
        posts = data.posts;
    else
        error = data.error;

    return { 
        posts,
        error,
    };
};