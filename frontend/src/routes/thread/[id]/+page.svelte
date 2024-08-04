<script lang="ts">
	import type { PageData } from "./$types";
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

<div class="thread">
	<!-- <p>{new Date(threadInfo.created_at).toLocaleString()}</p> -->
	<div class="thread-card">
		<div class="meta thread-meta">
			ID: #{threadInfo.id} —
			{new Date(threadInfo.created_at).toLocaleString()}
		</div>
		<div class="thread-content">
			<div class="thread-title">
				<h1>{threadInfo.title}</h1>
			</div>
			<div class="thread-content">
				<h2>{threadInfo.content}</h2>
			</div>
		</div>
	</div>

	{#if error}
		<p>{error}</p>
	{:else}
		<!-- <div class="post-create">
			<form on:submit|preventDefault={createPost}>
				<textarea id="content" bind:value={content}></textarea>
				<button type="submit">Post</button>
			</form>
		</div> -->
		{#each posts as post}
			<div class="post">
				<div class="meta post-meta">
					ID: #{post.id} - {new Date(post.created_at).toLocaleString()}
				</div>
				<!-- <div class="meta post-meta">
                    ID: #{threadInfo.id} - {new Date(threadInfo.created_at).toLocaleString()}
					<span class="post-id">{post.id}</span>
					<span class="post-date"
						>{new Date(post.created_at).toLocaleString()}</span
					>
				</div> -->
				<div class="post-content">{post.content}</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.thread {
		margin: 0;
		padding: 0;
		width: 100%;
		overflow-wrap: break-word;

		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.thread-card {
		background: var(--card-background);
		border: 1px solid var(--dark-border);

		margin: 1em 0 2em 0;
		padding: 1em;
	}

	.thread-meta {
	}

	.thread-title {
		color: var(--meta-title);
	}
</style>
