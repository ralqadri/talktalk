<script>
	export let post;
</script>

<div class="post-card">
	<div class="meta post-meta">
		ID: #{post.id} —
		{new Date(post.created_at).toLocaleString()}
	</div>
	<div class="post-content">{post.content}</div>
</div>

<style>
	.meta {
		font-size: 0.75em;
		color: var(--meta-text);
	}

	.post-card {
		background: var(--card-background);
		border: 1px solid var(--dark-border);

		/* margin: 1em 0 1em 0; */
		padding: 1em;
	}
</style>
