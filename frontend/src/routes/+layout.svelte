<script lang="ts">
	import Nav from "../lib/Nav.svelte";
	import Header from "../lib/Header.svelte";
</script>

<Nav />
<div class="page-container">
	<div class="slot-container">
		<slot></slot>
	</div>
</div>

<style>
	:global(:root) {
		--text: #ddd;
		--background: #1d1d1d;
		--nav-background: #333;
		--card-background: #272727;
		--dark-border: #666;
		--link: #ac9bb0;
		--link-hover: #6f99b4;
		--meta-title: #9390c9;
	}

	:global(body) {
		color: var(--text);
	}

	:global(a) {
		text-decoration: none;
		color: var(--link);
	}

	:global(a:hover) {
		color: var(--link-hover);
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(p, h1, h2, h3, h4, h5, h6) {
		margin: 0;
		padding: 0;
		border: 0;
		overflow-wrap: break-word;
	}

	:global(body) {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;

		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;

		background: var(--background);
	}

	.page-container {
		display: flex;
		justify-content: center;
	}
	.slot-container {
		/* border: 1px solid; */

		width: 80%;
		height: auto;
		margin: 2em;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
