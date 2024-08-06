<script lang="ts">
	import CatalogThreadCard from "$lib/CatalogThreadCard.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;

	const { error, threads } = data;
</script>

<div class="header">
	<h2>Threads</h2>
</div>
<div class="threads_section">
	{#if error}
		<p>{error}</p>
	{:else}
		{#each threads as thread}
			<CatalogThreadCard {thread} />
		{/each}
	{/if}
</div>

<style>
	.threads_section {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		gap: 0.5em;
	}

	@media (max-width: 1000px) {
		.threads_section {
			flex-direction: column;
		}
	}

	.header {
		display: flex;
		justify-content: center;

		margin-bottom: 1em;
	}
</style>
