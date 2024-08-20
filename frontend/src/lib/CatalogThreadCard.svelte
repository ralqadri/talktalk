<script lang="ts">
  	import type { thread } from "$customTypes/threads";

	export let thread: thread;
</script>

<a href={`/thread/${thread.id}`} class="thread-card-link">
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
</a>

<style>
	.thread-card-link {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.thread-card-link:hover .thread-title {
		color: var(--link-hover) !important;
	}

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

		margin: 0.5em 0 0.5em 0;
		padding: 1em;

		width: 320px;
		height: 320px;
	}

	.thread-card:hover {
		border: 1px solid var(--link-hover);
	}

	@media (max-width: 1000px) {
		.thread-card {
			width: 100%;
			height: auto; /* Adjust height as needed */
		}
	}

	.thread-title {
		color: var(--thread-title);
		font-size: 0.85em;
		word-break: break-all;
	}

	.thread-content {
		/* font-size: 0.75em; */
		word-break: break-all;
	}
</style>
