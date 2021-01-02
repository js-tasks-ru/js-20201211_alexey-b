export default class NotificationMessage {
    static openItems;

    constructor(message = 'default text', {
        duration = '',
        type = ''
    } = {}) {

        if (NotificationMessage.openItems) {
            NotificationMessage.openItems.remove();
        }

        this.message = message;
        this.duration = duration;
        this.type = type;
        this.render();

    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.notificationBody;
        this.element = element.firstElementChild;
        NotificationMessage.openItems = this.element;
    }

    show(target) {

        //document.querySelectorAll('.notification').forEach(e => e.parentNode.removeChild(e));
        // NotificationMessage.openItems.forEach(e => e.parentNode.removeChild(e));   //не могу добиться чтобы это работало

        if (target) {
            target.appendChild(this.element);
        }
        else {
            document.body.appendChild(this.element);
        }
        setTimeout(function () { this.remove() }.bind(this), this.duration);
    }

    get notificationBody() {
        return `
      <div class="notification ${this.type}" style="--value:${this.duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">${this.message}
          </div>
        </div>
      </div>
        `;
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        NotificationMessage.openItems = null;
    }
}
