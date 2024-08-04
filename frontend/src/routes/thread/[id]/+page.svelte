<script lang="ts">
	import type { PageData } from "./$types";
	import PostCard from "$lib/PostCard.svelte";
	import ThreadCard from "$lib/ThreadCard.svelte";
	export let data: PageData;

	let { error, posts, threadInfo } = data;

	async function createPost() {
		if (!content) {
			// TODO: Maybe bring back this popup (or make a handler) when content is empty
			// Currently it's removed to accomodate the refresh button functionality
			// and not let the alert pop up when refresh is clicked
			// alert("Content is required");
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
			(posts = [
				...posts,
				{
					id: newPost.id,
					thread_id: newPost.thread_id,
					content: newPost.content,
					created_at: new Date().toLocaleString(),
				},
			]),
				(content = "");
		} else {
			const data = await res.json();
			console.error(data.error);
			error = `Failed to create post: ${data.error}`;
		}
	}

	let content = "";
</script>

<div class="thread-container">
	<ThreadCard {threadInfo} />

	{#if error}
		<p>{error}</p>
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
			></textarea>
			<button type="submit">Post</button>
			<button class="refresh" on:click={() => window.location.reload()}
				>Refresh</button
			>
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
