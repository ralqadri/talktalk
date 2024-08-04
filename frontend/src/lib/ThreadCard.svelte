<script>
	export let threadInfo;
</script>

<div class="thread-card">
	<div class="meta thread-meta">
		ID: #{threadInfo.id} —
		{new Date(threadInfo.created_at).toLocaleString()}
	</div>
	<div class="thread-info">
		<div class="thread-title">
			<h1>{threadInfo.title}</h1>
		</div>
		<div class="thread-content">
			<h2>{threadInfo.content}</h2>
		</div>
	</div>
</div>

<style>
	.meta {
		font-size: 0.75em;
		color: var(--meta-text);
	}

	.thread-card {
		background: var(--card-background);
		border: 1px solid var(--thread-border);

		margin: 1em 0 1em 0;
		padding: 1em;
	}

	.thread-title {
		color: var(--thread-title);
	}
</style>
