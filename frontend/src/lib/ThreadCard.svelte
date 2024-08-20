<script lang="ts">
  	import type { thread } from "$customTypes/threads";

	export let thread: thread;
</script>

<div class="thread-card">
	<div class="meta thread-meta">
		<a href={`/thread/${thread.id}`}>
			ID: #{thread.id} —
			{new Date(thread.created_at).toLocaleString()}
		</a>
	</div>
	<div class="thread-info">
		<div class="thread-title">
			<h1>{thread.title}</h1>
		</div>
		<div class="thread-content">
			{thread.content}
		</div>
	</div>
</div>

<style>
	.meta {
		font-size: 0.75em;
		color: var(--meta-text);
	}

	.meta a {
		color: inherit;
	}

	.meta a:hover {
		color: var(--link-hover);
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

	.thread-content {
		font-size: 1.2em;
	}
</style>
