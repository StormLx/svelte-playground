import {readable} from "svelte/store";

const userLocation = readable<GeolocationPosition | null>(null, (set) => {
    let watch: number | null = null;
    if (navigator.geolocation) {
        watch = navigator.geolocation.watchPosition((position) => {
            set(position);
            console.log(position)
        }, (error) => {
            console.log(error);
        });
    }
    return () => {
        console.log("Location store unsubscribed");
        if(watch && navigator.geolocation) {
            navigator.geolocation.clearWatch(watch);
        }
        set(null);
    }
});

export default userLocation;
