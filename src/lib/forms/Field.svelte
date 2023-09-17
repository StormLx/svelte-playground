<script lang="ts">

    import {v4 as uuid} from "uuid";
    import {getContext} from "svelte";
    import formKey from "$lib/forms/form.key";

    export let name: string | undefined;
    export let type: 'text' | 'password' | 'email' = 'text';
    export let label: string | undefined = undefined;
    export let validate: any = undefined;

    const id = uuid();
    const formStore = getContext(formKey);

    function validateField(validateFn: any) {
        // check if it's an array of fns or a single fn
        if (Array.isArray(validateFn)) {
            // Execute all the functions and update the errors in the store
            const errors = validateFn.map(fn => fn($formStore.values[name], name));
            $formStore.errors[name] = errors.filter(error => error);

            // If there are no errors, delete the key from the store
            if (!$formStore.errors[name]) {
                delete $formStore.errors[name];
            }

        } else {
            updateStore(name, validateFn);
        }

    }

    function updateStore(name, fn) {
        const error = fn($formStore.values[name], name);
        if (error) {
            $formStore.errors[name] = [error];
        } else {
            delete $formStore.errors[name];
        }
    }

    function validateFn(e) {
        const value = e.target.value;
        $formStore.values[name] = value;
        if (validate) {
            validateField(validate);
        }
    }

</script>

<div class="field">
    {#if label}
        <label for="{id}">{label}</label>
    {/if}
    <input {id}
           value={$formStore.values[name] || ''}
           {type}
           on:blur={validateFn}
           on:input={validateFn}
           placeholder="{label}">

    {#if $formStore.errors[name]}
        <p>
            <small>{@html $formStore.errors[name].join('<br/>')}</small>
        </p>
    {/if}
</div>

<style lang="scss">

  div.field {
    margin-bottom: 10px;

    p {
      margin: 0;
      color: red;
    }

  }

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }

  input {
    max-width: 100%;
    width: 250px;
    height: 30px;
  }

</style>
