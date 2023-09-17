<script lang="ts">
    import '../app.scss';
    import Head from "$lib/Head.svelte";
    import Form from "$lib/forms/Form.svelte";
    import Field from "$lib/forms/Field.svelte";
    import Button from "$lib/Button.svelte";
    import {Validators} from "$lib/utils/Validation";
    import Todos from "$lib/Todos.svelte";
    import Actions from "$lib/Actions.svelte";
    import Store from "$lib/store/Store.svelte";
</script>
<Head/>

<!--<Todos/>-->
<!--<Actions/>-->
<Store/>
<!--<Context/>-->


<!--<Form on:submit={(e)=>{-->
<!--    console.log(e.detail)-->
<!--}}>-->
<!--    <Field label="Username" name="username" type="text" validate={Validators.required}/>-->
<!--    <Field label="Email" name="email" type="email" validate={[Validators.email, Validators.required]}/>-->
<!--    <Field label="Password" name="password" type="password" validate={[Validators.required, Validators.minLength(10)]}/>-->
<!--    <Button>Submit</Button>-->
<!--</Form>-->



