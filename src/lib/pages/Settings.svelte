

<script>
    import settings from "$lib/store/settings.store";


</script>

<h2>Settings</h2>


<label for="dark">
    <input type="radio" name="colorScheme" id="dark" value="dark" bind:group={$settings.colorScheme}/> Dark
</label>

<label for="light">
    <input type="radio" name="colorScheme" id="light" value="light" bind:group={$settings.colorScheme}/> Light
</label>
