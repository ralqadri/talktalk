<script lang="ts">
    import type { board } from "$customTypes/boards";

	export let board: board;
</script>

<a href={`/board/${board.id}`} class="board-card-link">
  <div class="board-card">
      <div class="meta board-meta">
          <a href={`/board/${board.id}`}>
              ID: #{board.id} —
              {new Date(board.created_at).toLocaleString()}
          </a>
      </div>
      <div class="board-info">
          <div class="board-title">
              <h1>{board.name}</h1>
          </div>
          <div class="board-content">
              {board.description}
          </div>
      </div>
  </div>
</a>

<style>
  .board-card-link {
      display: block;
      text-decoration: none;
      color: inherit;
  }

  .board-card-link:hover .board-title {
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

  .board-card {
      background: var(--card-background);
      border: 1px solid var(--board-border);

      margin: 0.5em 0 0.5em 0;
      padding: 1em;

      width: 320px;
      height: 320px;
  }

  .board-card:hover {
      border: 1px solid var(--link-hover);
  }

  @media (max-width: 1000px) {
      .board-card {
          width: 100%;
          height: auto; /* Adjust height as needed */
      }
  }

  .board-title {
      color: var(--board-title);
      font-size: 0.85em;
      word-break: break-all;
  }

  .board-content {
      /* font-size: 0.75em; */
      word-break: break-all;
  }
</style>
