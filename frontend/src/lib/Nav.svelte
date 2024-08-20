<script lang="ts">
  	import { apiFetch } from "$lib";
	export let title: string = "talktalk";
	let subtitles: string[] = [
		"you gotta talk somehow",
		"are you seeing this?",
		"talk about nothing",
	];

	export let subtitle: string =
		subtitles[Math.floor(Math.random() * subtitles.length)];

	type Random = { id: number };
	async function fetchRandom (objectType: "thread" | "board") {
		const res = await apiFetch(
			fetch, 
			(obj): obj is Random => obj && typeof obj === "object" && typeof obj.id === "number", 
			`/api/${objectType}s/random`, 
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (res.ok) {
			console.log(window.location.href, `/${objectType}/${res.content.id}`);
			// window.location.href = `/${objectType}/${res.content.id}`;
		} else
			console.error(res.error);
	}
</script>

<div class="nav-bar">
	<div class="name">[{title}]</div>
	<div class="nav-links">
		<a href="/" class="link-home">home</a>
		<button
			class="link-random"
			on:click={() => fetchRandom("board")}
		>
			random board
		</button>
		<button
			class="link-random"
			on:click={() => fetchRandom("thread")}
		>
			random thread
		</button>
	</div>
	<div class="subtitle">{subtitle}</div>
</div>

<style>
	* {
		font-size: 1em;
	}

	.nav-bar {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1.5em;

		height: 3em;
		padding: 0 1em 0 1em;

		background-color: var(--background);
		border-bottom: 1px solid var(--dark-border);
		color: white;

		position: sticky;
		top: 0;
		z-index: 1000;
	}

	.nav-links {
		display: flex;
		gap: 1em;
	}

	.name {
		font-size: 1.5em;
		font-weight: bolder;
	}

	.subtitle {
		font-size: 1em;
		font-style: italic;
		color: var(--subtext);
		margin-left: auto;
	}

	.link-random {
		margin: 0;
		color: var(--link);
		background: none;
		border: none;
		padding: 0;
	}

	.link-random:hover {
		color: var(--link-hover);
	}

	@media (max-width: 600px) {
		.nav-bar {
			justify-content: center;
		}
		.subtitle {
			display: none;
		}
	}
</style>
