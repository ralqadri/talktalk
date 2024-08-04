<script lang="ts">
import type { PageData } from './$types';
export let data: PageData;

let { error, posts, threadInfo } = data;

async function createPost() {
    if (!content) {
        alert("Content is required");
        return;
    }

    const res = await fetch(`/api/posts/${threadInfo.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    });

    if (res.ok) {
        const { content: newPost } = await res.json();
        posts = [{
            id: newPost.id,
            thread_id: newPost.thread_id,
            content: newPost.content,
            created_at: new Date().toLocaleString(),
        }, ...posts];
        content = "";
    } else {
        const data = await res.json();
        console.error(data.error);
        error = `Failed to create post: ${data.error}`;
    }
}

let content = "";
</script>

<div class="thread">
    <p>{new Date(threadInfo.created_at).toLocaleString()}</p>
    <h1>{threadInfo.title} (ID: {threadInfo.id})</h1>
    <h3>{threadInfo.content}</h3>
    {#if error}
        <p>{error}</p>
    {:else}
    
        <div class="post-create">
            <form on:submit|preventDefault={createPost}>
                <textarea id="content" bind:value={content}></textarea>
                <button type="submit">Post</button>
            </form>
        </div>
        {#each posts as post}
            <div class="post">
                <div class="post-header">
                    <span class="post-id">{post.id}</span>
                    <span class="post-date">{new Date(post.created_at).toLocaleString()}</span>
                </div>
                <div class="post-content">{post.content}</div>
            </div>
        {/each}
    {/if}
</div>