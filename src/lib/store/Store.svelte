<script>
    import Home from "$lib/pages/Home.svelte";
    import Settings from "$lib/pages/Settings.svelte";
    import userLocation from '$lib/store/location.store';
    import {onMount} from "svelte";

    let path = '';

    onMount(onRouteChange);

    function onRouteChange() {
        const current = location.hash.slice(1);
        if (current === '/' || current === '/settings') {
            path = current
        } else {
            location.hash = '/'
        }
    }
</script>

<svelte:window on:hashchange={onRouteChange}/>

{#if $userLocation}
    {$userLocation.coords.latitude} - {$userLocation.coords.longitude}
{/if}

<nav>
    <a href="#/">Home</a>
    <a href="#/settings">Settings</a>
</nav>

{#if path === '/'}
    <Home/>
{/if}
{#if path === '/settings'}
    <Settings/>
{/if}


<style></style>
