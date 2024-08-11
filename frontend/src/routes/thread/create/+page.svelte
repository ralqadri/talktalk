<!-- NOTE: Tbh I think I should move this page to the threads/homepage page and just have it as a toggleable feature -->
<!-- But I'm lazy so I'll do that later -->
<script lang="ts">
	import { isThread } from "$customTypes/threads";
	import { apiFetch } from "$lib";
	import { fade } from "svelte/transition";
	async function createThread() {
		if (!title || !content) {
			error = "title and content are required!";
			setTimeout(() => {
				error = "";
			}, 3000);
			return;
		}

		const res = await apiFetch(fetch, isThread, "/api/threads", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, content }),
		});

		if (res.ok) {
			window.location.href = `/thread/${res.content.id}`;
		} else {
			console.error(res.error);
			error = `Failed to create thread: ${res.error}`;
		}
	}

	let title = "";
	let content = "";
	let error = "";
</script>

<div class="header">
	<h2>start a new thread</h2>
</div>
<form class="thread-create" on:submit|preventDefault={createThread}>
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
</form>
{#if error}
	<p transition:fade>{error}</p>
{/if}

<style>
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
		/* margin-left: auto; */
		padding: 0.5em;
		cursor: pointer;

		background: var(--input-background);
		color: var(--text);
		border: 1px solid var(--dark-border);
	}

	.thread-create button:hover {
		border: 1px solid var(--link-hover);
		color: var(--link-hover);
	}

	@media (max-width: 1000px) {
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
</style>
