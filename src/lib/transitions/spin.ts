import {cubicInOut} from "svelte/easing";

export default function spin(node: HTMLElement, {delay = 0, duration = 400, easing = cubicInOut, spin = 1}) {

    const opacity = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: (t: any) => {
            return `
            opacity: ${t * opacity};
            transform: scale(${t}) rotate(${t * spin}turn);
            `;
        }
    }

}
