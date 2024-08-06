<script lang="ts">
	import { isThread } from "$customTypes/threads";
	import { apiFetch } from "$lib";
	import { onMount } from "svelte";

	async function fetchData() {
		const res = await apiFetch(fetch, isThread, "/api/threads/random", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			console.log(`/thread/${res.content.id}`);
			window.location.href = `/thread/${res.content.id}`;
		} else {
			console.error(res.error);
		}
	}

	fetchData();

	let title = "";
	let content = "";
</script>
