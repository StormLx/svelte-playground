<script lang="ts">

    import {setContext} from "svelte";
    import formKey from "$lib/forms/form.key";
    import {writable} from "svelte/store";
    import {createEventDispatcher} from "svelte";

    export let initialValues = {};
    const formStore = writable({values: initialValues, errors: {}});
    const dispatch = createEventDispatcher();

    setContext(formKey, formStore);

    $: hasErrors = Object.keys($formStore.errors).length > 0;

</script>

<pre>
    {JSON.stringify($formStore, null, 2)}
</pre>

<form on:submit|preventDefault={() => {
    if(hasErrors) {
        dispatch("submit", $formStore.values);
    }
}}>

    <slot/>

    {#if hasErrors}
        <ul>
            {#each Object.entries($formStore.errors) as [key, values], index (index)}
                {#each values as value}
                    <li>{key} : {value}</li>
                {/each}
            {/each}
        </ul>
    {/if}

</form>




