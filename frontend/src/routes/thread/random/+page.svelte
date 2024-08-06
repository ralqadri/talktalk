<script lang="ts">
	import { isThread } from "$customTypes/threads";
	import { apiFetch } from "$lib";

	let title = "";
	let content = "";

	async function fetchData() {
		const res = await apiFetch(fetch, isThread, "/api/threads/random", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, content }),
		});
	}

	fetchData();
</script>
