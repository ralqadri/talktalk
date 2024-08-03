<script lang="ts">
    import { page } from '$app/stores';
    const post = {
        title: `Thread #${$page.params.id}`,
        content: `This is the content of thread #${$page.params.id}`
    }
</script>

<div class="thread">
    {post.title}
    {post.content}
</div>