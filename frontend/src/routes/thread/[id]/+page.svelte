<script lang="ts">
	import { fade } from "svelte/transition";
	import type { PageData } from "./$types";
	import PostCard from "$lib/PostCard.svelte";
	import ThreadCard from "$lib/ThreadCard.svelte";
	import { apiFetch } from "$lib";
	import { isPost } from "$customTypes/posts";

	export let data: PageData;

	let { error, posts, threadInfo } = data;

	async function createPost() {
		if (!content) {
			empty_error = "Content is required!";
			setTimeout(() => {
				empty_error = "";
			}, 3000);
			return;
		}

		const res = await apiFetch(fetch, isPost, `/api/posts/${threadInfo.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ content }),
		});

		if (res.ok) {
			posts = [res.content, ...posts];
			content = "";
		} else {
			console.error(res.error);
			error = `Failed to create post: ${res.error}`;
		}
		empty_error = "";
	}

	function handleCtrlEnter(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === "Enter") {
			event.preventDefault();
			let form: HTMLFormElement | null = document.querySelector("form");
			if (form) {
				createPost();
			}
		}
	}

	let content = "";
	let empty_error = "";
</script>

<div class="thread-container">
	<ThreadCard thread={threadInfo} />

	{#if error}
		<p transition:fade>{error}</p>
	{:else}
		{#each posts as post}
			<PostCard {post} />
		{/each}
	{/if}

	<div class="post-create">
		<form on:submit|preventDefault={createPost}>
			<textarea
				id="content"
				placeholder="type a reply here..."
				bind:value={content}
				on:keydown={handleCtrlEnter}
			></textarea>
			<button type="submit">Post</button>
			<button
				class="refresh"
				on:click|preventDefault={() => window.location.reload()}>Refresh</button
			>
			{#if empty_error}
				<span transition:fade>{empty_error}</span>
			{/if}
		</form>
	</div>
</div>

<style>
	.thread-container {
		margin: 0;
		padding: 0;
		width: 100%;
		overflow-wrap: break-word;

		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.post-create {
		margin-top: 2em;

		display: flex;
		flex-direction: column;
	}

	.post-create textarea {
		width: 100%;
		height: 5em;
		background: var(--input-background);
		color: var(--text);
		font-family: inherit;
		font-size: inherit;
		resize: none;
	}

	.post-create button {
		width: 20%;
		background: var(--input-background);
		color: var(--text);
		border: 1px solid var(--dark-border);

		padding: 0.5em;
		cursor: pointer;

		margin-left: auto;
	}
	.post-create button.refresh {
		width: 10%;
	}

	.post-create button:hover {
		border: 1px solid white;
	}

	@media (max-width: 1000px) {
		.post-create {
			gap: 0.25em;
		}
		.post-create button,
		.post-create button.refresh {
			width: 100%;
			margin-bottom: 0.15em;
		}
	}
</style>
