<script lang="ts">
    import settings from "$lib/store/settings.store";
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet">

    {#if $settings.colorScheme === "dark"}
        <style>
            :root {
                --backgroundColor: #1d1d1d;
                --textColor: #fff;
            }
        </style>
    {:else}
        <style>
            :root {
                --backgroundColor: lightgray;
                --textColor: #000;
            }
        </style>
    {/if}

</svelte:head>
