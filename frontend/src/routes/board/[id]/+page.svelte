<script lang="ts">
	import type { PageData } from "./$types";
    import { isThread } from "$customTypes/threads";
    import { apiFetch } from "$lib";
	import { fade } from "svelte/transition";
	import CatalogCard from "$lib/CatalogCard.svelte";

	export let data: PageData;

	const { error, threads, boardInfo } = data;

    async function createThread() {
		if (!title || !content) {
			thread_error = "title and content are required!";
			setTimeout(() => {
				thread_error = "";
			}, 3000);
			return;
		}

		const res = await apiFetch(fetch, isThread, `/api/threads/${boardInfo.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, content }),
		});

		if (res.ok)
			window.location.href = `/thread/${res.content.id}`;
		else {
			console.error(res.error);
			thread_error = `Failed to create thread: ${res.error}`;
		}
	}

	let title = "";
	let content = "";
	let thread_error = "";
</script>

<div class="header">
	<h2>boards</h2>
</div>
<div class="threads_section">
	{#if error}
		<p>{error}</p>
	{:else}
		{#each threads as thread}
			<CatalogCard
				id={thread.id}
				title={thread.title}
				content={thread.content}
				created_at={thread.created_at}
				link={`/thread/${thread.id}`}
			/>
		{/each}
	{/if}

    <div class="thread-create">
		<form on:submit|preventDefault={createThread}>
			<div class="title-container">
                <label for="title">title</label>
                <input type="text" id="title" bind:value={title} />
            </div>
            <div class="content-container">
                <label for="content">content</label>
                <textarea id="content" bind:value={content}></textarea>
            </div>
            <div class="submit">
                <button type="submit">create thread</button>
            </div>
			{#if thread_error}
				<span transition:fade>{thread_error}</span>
			{/if}
		</form>
	</div>
</div>

<style>
	.threads_section {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		gap: 0.5em;
	}

    .thread-create {
		margin-top: 2em;
		height: 600px;
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.thread-create label {
		font-style: italic;
	}

	.thread-create input,
	.thread-create textarea {
		width: 100%;

		border: 1px solid var(--dark-border);

		background: var(--input-background);
		color: var(--text);
		font-family: inherit;
		font-size: inherit;
		resize: none;
	}

	.thread-create textarea {
		height: 30vh;
	}

	.title-container {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	.submit button {
		width: 100%;
	}

	@media (max-width: 1000px) {
		.threads_section {
			flex-direction: column;
		}

        .thread-create {
			gap: 1em;
		}

		.title-container,
		.content-container,
		.submit {
			flex-direction: column;
			gap: 0.1em;
		}
		.thread-create button {
			width: 100%;
			margin-bottom: 0.15em;
		}
	}

	.header {
		display: flex;
		justify-content: center;

		margin-bottom: 1em;
	}
</style>
