<script lang="ts">
	import Header from "../../src/lib/Header.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;

	const { error, threads } = data;
</script>

<div class="threads_section">
	<h2>Threads</h2>
	{#if error}
		<p>{error}</p>
	{:else}
		{#each threads as thread}
			<div class="thread">
				<a href={`/thread/${thread.id}`}>
					<h3>
						{thread.title} (#{thread.id}) - {new Date(
							thread.created_at
						).toLocaleString()}
					</h3>
					<p>{thread.content}</p>
				</a>
			</div>
		{/each}
	{/if}
</div>
