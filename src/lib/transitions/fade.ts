import {cubicInOut} from "svelte/easing";

export default function fade(node: HTMLElement, {delay = 0, duration = 400, easing = cubicInOut}) {

    const opacity = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        tick: (t: any) => {
            node.style.opacity = t * opacity + "";
        }
    }

}
