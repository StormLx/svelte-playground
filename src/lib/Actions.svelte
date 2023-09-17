<script lang="ts">
    import longpress from '$lib/actions/longpress.js'

    import tippy from 'tippy.js';
    import 'tippy.js/dist/tippy.css';



    // let duration = 0;
</script>

<!--<label for="range">-->
<!--    <input type="range" name="range" id="range" bind:value={duration} max="4000">-->
<!--    {duration} ms-->
<!--</label>-->

<!--<button use:longpress={{duration}} on:longpress={()=> alert('hello')}>Hello</button>-->

<button use:tippy={{content: 'Test', placement: 'bottom', theme: 'dark'}} class="tooltip">Test</button>

<style></style>
