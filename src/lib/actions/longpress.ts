export default function longpress(node: HTMLElement, options) {

    let timer = 0;

    function handleMouseDown() {
        const {duration = 2000} = options;

        timer = setTimeout(() => {
            console.log('longpress');
            node.dispatchEvent(new CustomEvent('longpress'));
        }, duration);
    }

    function handleMouseUp() {
        clearTimeout(timer);
    }

    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('mouseup', handleMouseUp);

    return {
        update(newOptions: any) {
            options = newOptions;
        },
        destroy() {
            node.removeEventListener('mousedown', handleMouseDown);
            node.removeEventListener('mouseup', handleMouseUp);
            clearTimeout(timer);
        }
    }
}
