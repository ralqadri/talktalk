import type { PageServerLoad } from './$types';
import { isBoard, type board } from "$customTypes/boards";
import { apiFetch } from '$lib';
import { isArray } from '$customTypes';

export const load: PageServerLoad = async ({ fetch }) => {
    let boards: board[] = [];
    let error: string = "";
    const res = await apiFetch(fetch, (obj) => isArray(obj, isBoard), "/api/boards");
    if (res.ok)
        boards = res.content;
    else
        error = res.error;

    return {
        boards,
        error,
    };
};