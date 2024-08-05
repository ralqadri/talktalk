<script lang="ts">
	import { isThread } from '$customTypes/threads';
	import { apiFetch } from '$lib';
	import { fade } from 'svelte/transition';
	async function createThread() {
		if (!title || !content) {
			error = "Title and content are required";
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

<h1>Create a new thread</h1>
<form on:submit|preventDefault={createThread}>
	<label for="title">Title</label>
	<input type="text" id="title" bind:value={title} />
	<label for="content">Content</label>
	<textarea id="content" bind:value={content}></textarea>
	<button type="submit">Create</button>
</form>
{#if error}
	<p transition:fade>{error}</p>
{/if}
