<div class="page-container">
	<div class="header"></div>

	<div class="slot-container">
		<slot></slot>
	</div>
</div>

<style>
	:global(body) {
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;
	}

	.page-container {
		display: flex;
		justify-content: center;
	}
	.slot-container {
		border: 1px solid red;

		width: 80%;
		height: auto;

		display: flex;
		flex-direction: column;
	}
</style>
