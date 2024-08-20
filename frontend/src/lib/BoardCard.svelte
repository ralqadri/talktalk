<script lang="ts">
    import type { board } from "$customTypes/boards";

  export let board: board;
</script>

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

<style>
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
      border: 1px solid var(--thread-border);

      margin: 1em 0 1em 0;
      padding: 1em;
  }

  .board-title {
      color: var(--thread-title);
  }

  .board-content {
      font-size: 1.2em;
  }
</style>
