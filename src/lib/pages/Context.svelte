<script>
    let form = {username :'', email: '', password: ''}
    let errors = {username: '', email: '', password: ''}

    function handleSubmit() {
        validate();
        if(isValid){
            alert('Form is valid')
        } else {
            alert('Form is not valid')
        }
    }

    function validate() {
        if (form.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long'
        } else {
            errors.username = ''
        }

        if (form.email.length < 3) {
            errors.email = 'Email must be at least 3 characters long'
        } else {
            errors.email = ''
        }

        if (form.password.length < 3) {
            errors.password = 'Password must be at least 3 characters long'
        } else {
            errors.password = ''
        }
    }

    $: isValid = Object.values(errors).every(x => x !== '');

</script>


<form on:submit|preventDefault={handleSubmit}>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" bind:value={form.username}><br>
    {#if errors.username}
        <small>{errors.username}</small> <br>
    {/if}
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" bind:value={form.email}><br>
    {#if errors.email}
        <small>{errors.email}</small> <br>
    {/if}
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" bind:value={form.password}><br>
    {#if errors.password}
        <small>{errors.password}</small> <br>
    {/if}

    <button type="submit">Submit</button>
</form>



<p>{JSON.stringify(form)}</p>




<style lang="scss">
    form {
        small {
            color: red;
        }
    }
</style>
