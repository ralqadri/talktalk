<script lang="ts">
	import { isBoard } from "$customTypes/boards";
	import { apiFetch } from "$lib";
	import { fade } from "svelte/transition";
	async function createBoard() {
		if (!name || !description) {
			error = "name and description are required!";
			setTimeout(() => {
				error = "";
			}, 3000);
			return;
		}

		const res = await apiFetch(fetch, isBoard, "/api/boards", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, description }),
		});

		if (res.ok)
			window.location.href = `/board/${res.content.id}`;
		else {
			console.error(res.error);
			error = `Failed to create board: ${res.error}`;
		}
	}

	let name = "";
	let description = "";
	let error = "";
</script>

<div class="header">
	<h2>start a new board</h2>
</div>
<form class="board-create" on:submit|preventDefault={createBoard}>
	<div class="name-container">
		<label for="name">name</label>
		<input type="text" id="name" bind:value={name} />
	</div>
	<div class="description-container">
		<label for="description">description</label>
		<textarea id="description" bind:value={description}></textarea>
	</div>
	<div class="submit">
		<button type="submit">create board</button>
	</div>
</form>
{#if error}
	<p transition:fade>{error}</p>
{/if}

<style>
	.board-create {
		margin-top: 2em;
		height: 600px;
		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.board-create label {
		font-style: italic;
	}

	.board-create input,
	.board-create textarea {
		width: 100%;

		border: 1px solid var(--dark-border);

		background: var(--input-background);
		color: var(--text);
		font-family: inherit;
		font-size: inherit;
		resize: none;
	}

	.board-create textarea {
		height: 30vh;
	}

	.name-container {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	.submit button {
		width: 100%;
	}

	@media (max-width: 1000px) {
		.board-create {
			gap: 1em;
		}

		.name-container,
		.description-container,
		.submit {
			flex-direction: column;
			gap: 0.1em;
		}
		.board-create button {
			width: 100%;
			margin-bottom: 0.15em;
		}
	}
</style>
