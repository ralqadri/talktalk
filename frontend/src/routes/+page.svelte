<script lang="ts">
	import CatalogCard from "$lib/CatalogCard.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;

	const { error, boards } = data;
</script>

<div class="header">
	<h2>boards</h2>
</div>
<div class="boards_section">
	{#if error}
		<p>{error}</p>
	{:else}
		{#each boards as board}
			<CatalogCard
				id={board.id}
				title={board.name}
				content={board.description}
				created_at={board.created_at}
				link={`/board/${board.id}`}
			/>
		{/each}
	{/if}
</div>

<style>
	.boards_section {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		gap: 0.5em;
	}

	@media (max-width: 1000px) {
		.boards_section {
			flex-direction: column;
		}
	}

	.header {
		display: flex;
		justify-content: center;

		margin-bottom: 1em;
	}
</style>
