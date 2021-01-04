class Tooltip {

    static renderedToolotip;

    initialize() {
        this.addEventListeners();
    }

    getTemplate(text) {
        return `
        <div class="tooltip" id="container">${text}</div>
        `;
    }

    render(event) {
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate(event.target.dataset.tooltip);
        this.element = element.firstElementChild;
        this.element.style.position='absolute';
        this.element.style.left=event.clientX +'px';
        this.element.style.top= event.clientY +'px';
        document.body.append(this.element)
        Tooltip.renderedToolotip = this.element;
    }

    addEventListeners() {
        document.addEventListener('pointerover', () => this.pointOverHandler(event));
        document.addEventListener('pointerout', () => this.pointOutHandler(event));
    }

    pointOverHandler(event) {
        if (event.target.dataset.tooltip != undefined) {
            document.addEventListener('mousemove', this.mouseMoveHandler(event));
        }
    }
 
    mouseMoveHandler(event) {
         if (Tooltip.renderedToolotip) {
            Tooltip.renderedToolotip.remove();
        }
        this.render(event);
    }

    pointOutHandler(event) {
        if (event.target.dataset.tooltip != undefined) {
            document.removeEventListener('mousemove', this.mouseMoveHandler(event));
            this.destroy();
        }
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}

const tooltip = new Tooltip();

export default tooltip;
