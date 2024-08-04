<script lang="ts">
	async function createThread() {
		if (!title || !content) {
			error = "Title and content are required";
			return;
		}

		const res = await fetch("/api/threads", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, content }),
		});

		if (res.ok) {
			const { content } = await res.json();
			window.location.href = `/thread/${content.id}`;
		} else {
			const data = await res.json();
			console.error(data.error);
			error = `Failed to create thread: ${data.error}`;
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
	<p>{error}</p>
{/if}
