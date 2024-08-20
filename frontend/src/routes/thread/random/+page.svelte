<script lang="ts">
	import { isThread } from "$customTypes/threads";
	import { apiFetch } from "$lib";
	import { onMount } from "svelte";

	async function fetchRandomThread() {
		const res = await apiFetch(fetch, isThread, "/api/threads/random", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok)
			window.location.href = `/thread/${res.content.id}`;
		else
			console.error(res.error);
	}

	onMount(async () => await fetchRandomThread());
</script>
