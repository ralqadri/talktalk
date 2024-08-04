<script lang="ts">
import type { PageData } from './$types';
export let data: PageData;

const { error, threads } = data;
</script>

<h1>TalkTalk</h1>
<div class="threads_section">
    <a href="/thread/create">Create a new thread</a>
    <h2>Threads</h2>
    {#if error}
        <p>{error}</p>
    {:else}
        {#each threads as thread}
            <div class="thread">
                <a href={`/thread/${thread.id}`}>
                    <h3>{thread.title} (#{thread.id}) - {new Date(thread.created_at).toLocaleString()}</h3>
                    <p>{thread.content}</p>
                </a>
            </div>
        {/each}
    {/if}
</div>
