<script lang="ts">
	export let [id, title, content, created_at, link]: [
		number,
		string,
		string,
		string,
		string,
	] = [0, "", "", "", ""];
</script>

<a href={link} class="catalogue-card-link">
	<div class="catalogue-card">
		<div class="meta catalogue-card-meta">
			<a href={link}>
				ID: #{id} —
				{new Date(created_at).toLocaleString()}
			</a>
		</div>
		<div class="catalogue-card-info">
			<div class="catalogue-card-title">
				<h1>{title}</h1>
			</div>
			<div class="catalogue-card-content">
				{content}
			</div>
		</div>
	</div>
</a>

<style>
	.catalogue-card-link {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	.catalogue-card-link:hover .catalogue-card-title {
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

	.catalogue-card {
		background: var(--card-background);
		border: 1px solid var(--catalogue-card-border);

		margin: 0.5em 0 0.5em 0;
		padding: 1em;

		width: 320px;
		height: 320px;
	}

	.catalogue-card:hover {
		border: 1px solid var(--link-hover);
	}

	.catalogue-card-title {
		color: var(--catalogue-card-title);
		font-size: 0.85em;
		word-break: break-all;
	}

	.catalogue-card-content {
		/* font-size: 0.75em; */
		word-break: break-all;
	}

	@media (max-width: 1000px) {
		.catalogue-card {
			width: 100%;
			height: auto; /* Adjust height as needed */
		}
	}
</style>
