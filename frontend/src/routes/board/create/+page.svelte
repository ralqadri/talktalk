<script lang="ts">
	import type { PageData } from "./$types";
	import { isBoard } from "$customTypes/boards";
	import { apiFetch } from "$lib";
	import { fade } from "svelte/transition";
	async function createBoard() {
		if (!name || !description || !board_code) {
			error = "name and/or description and/or board code are required!";
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

		if (res.ok) window.location.href = `/board/${res.content.id}`;
		else {
			console.error(res.error);
			error = `Failed to create board: ${res.error}`;
		}
	}

	let name = "";
	let description = "";
	let board_code = "";
	let error = "";

	export let data: PageData;
	let authenticated = data.authenticated;
	let username = "";
	let password = "";

	async function authenticate() {
		const res = await apiFetch(
			fetch,
			(obj): obj is { isAdmin?: boolean } =>
				obj && (!obj.isAdmin || typeof obj.isAdmin === "boolean"),
			"/api/auth",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			}
		);

		if (res.ok) authenticated = true;
		else {
			console.error(res.error);
			error = `Failed to authenticate: ${res.error}`;
		}
	}
</script>

{#if authenticated}
	<div class="header">
		<h2>start a new board</h2>
	</div>
	<form class="board-create" on:submit|preventDefault={createBoard}>
		<div class="name-container">
			<label for="name">name</label>
			<input type="text" id="name" bind:value={name} />
		</div>
		<!-- TODO: Make the CSS of this tidier -->
		<div class="boardcode-container">
			<label for="board-code">code</label>
			<!-- TODO: Put a limit to this later -->
			<input type="text" id="board-code" bind:value={board_code} />
		</div>
		<div class="description-container">
			<label for="description">description</label>
			<textarea id="description" bind:value={description}></textarea>
		</div>
		<div class="submit">
			<button type="submit">create board</button>
		</div>
	</form>
{:else}
	<form class="board-create" on:submit|preventDefault={authenticate}>
		<p>
			You must be logged in to create a board.<br />Enter your credentials
			below:
		</p>
		<div class="username-container">
			<label for="username">username</label>
			<input type="text" id="username" bind:value={username} />
		</div>
		<div class="password-container">
			<label for="password">password</label>
			<input id="password" bind:value={password} type="password" />
		</div>
		<div class="submit">
			<button type="submit">login</button>
		</div>
	</form>
{/if}
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

	.name-container,
	.username-container,
	.password-container,
	.boardcode-container {
		display: flex;
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
