<script lang="ts">

    export let initialCount: number;
    export let maxCount: number;

    let count = initialCount
    $: string = `You clicked ${count} times`;

    function increment():void {
        if(count === maxCount) return;
        count++;
    }

</script>

<button on:click={increment}>Clicks {count}</button>
<h3>{string}</h3>

<style>
    button {
        background-color: #6794d8;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 0.5em 1em;
        color: #FFF;
        font-size: 1em;
        display: inline-block;
        text-decoration: none;
        margin: 0;
        cursor: pointer;
    }
</style>
