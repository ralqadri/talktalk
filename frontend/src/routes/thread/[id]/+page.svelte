<script lang="ts">
import type { PageData } from './$types';
export let data: PageData;

const { error, posts, threadInfo } = data;
</script>

<div class="thread">
    <p>{new Date(threadInfo.created_at).toLocaleString()}</p>
    <h1>{threadInfo.title} (ID: {threadInfo.id})</h1>
    <h3>{threadInfo.content}</h3>
    {#if error}
        <p>{error}</p>
    {:else}
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