<script lang="ts">
	import { onMount } from "svelte";
	import Nav from "./Nav.svelte";
	let subtitles = [
		"talk about anything",
		"talk about everything",
		"talk about nothing",
		"there's nothing to talk about!",
	];

	export let title: string = "talktalk!!";
	export let subtitle: string =
		subtitles[Math.floor(Math.random() * subtitles.length)];

	// onMount(() => {});
</script>

<div class="header">
	<div class="banner">
		<!-- TODO: Put image(s) for banner(s) here later -->
		<img src="" alt="placeholder banner" />
	</div>
	<div class="title">
		<h1>{title}</h1>
		<span>{subtitle}</span>
	</div>
</div>

<style>
	h1 {
		font-size: 2em;
		text-align: center;
		margin: 20px 0;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.banner {
		/* TODO: Maybe not make these values like these later */
		width: 450px;
		height: 150px;
		overflow: hidden;
	}

	.banner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
