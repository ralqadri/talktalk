<script lang="ts">
	export let title: string = "talktalk";
	let subtitles: string[] = [
		"you gotta talk somehow",
		"are you seeing this?",
		"talk about nothing",
	];

	export let subtitle: string =
		subtitles[Math.floor(Math.random() * subtitles.length)];
</script>

<div class="nav-bar">
	<div class="name">[{title}]</div>
	<div class="nav-links">
		<a href="/" class="link-home">home</a>
		<a href="/thread/create" class="link-newthread">start_thread</a>
		<!-- TODO: random thread link -->
		<a href="/thread/random" class="link-newthread">random</a>
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

	@media (max-width: 600px) {
		.nav-bar {
			justify-content: center;
		}
		.subtitle {
			display: none;
		}
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
</style>
