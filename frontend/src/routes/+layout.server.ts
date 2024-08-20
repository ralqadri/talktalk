import type { LayoutServerLoad } from "./$types";
import { apiFetch } from '$lib';

export const load: LayoutServerLoad = async ({ fetch }) => {
    let authenticated = false;
    const adminRes = await apiFetch(fetch, (obj): obj is { isAdmin?: boolean } => obj && (!obj.isAdmin || typeof obj.isAdmin === "boolean"), "/api/auth");
    if (adminRes.ok && adminRes.content.isAdmin)
        authenticated = true;

    return { authenticated };
};