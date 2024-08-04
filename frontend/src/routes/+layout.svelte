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
	:global(*) {
		color: white;
	}

	:global(a) {
		text-decoration: none;
		color: #ac9bb0;
	}

	:global(a:hover) {
		color: #6f99b4;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(body) {
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;

		background: #1d1d1d;
	}

	.page-container {
		display: flex;
		justify-content: center;
	}
	.slot-container {
		width: 80%;
		height: auto;

		display: flex;
		flex-direction: column;
	}
</style>
