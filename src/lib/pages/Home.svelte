<script>
    import settings from "$lib/store/settings.store";

    import { spring } from "svelte/motion";


    const scale = spring(1, {
        stiffness: 0.1,
        damping: 0.1,
    });


</script>


<h1>Home</h1>

<button on:click={() => $scale += 1}>Make it big</button>
<button on:click={() => $scale -= 1}>Make it small</button>

<input type="range" name="range" id="range" bind:value={$scale} max="10" step=".5">


<div style="width: 100px; height: 100px; background-color: purple; transform: scale({$scale}); transform-origin: 0 0;"></div>



