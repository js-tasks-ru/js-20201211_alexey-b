import fetchJson from './utils/fetch-json.js';

export default class ColumnChart {
    chartHeight = 50;
    subElements = {};

    constructor({
        data = [],
        label = '',
        link = '',
        value = 0,
        url
    } = {}) {

        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;
        this.url = url;
        this.target =  new URL('https://course-js.javascript.ru/' + this.url);
        this.render();
    }


    getColumnBody(data) {

        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;
    
        return data
          .map(item => {
            const percent = (item / maxValue * 100).toFixed(0);
    
            return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
          })
          .join('');
      }

      getLink() {
        return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
      }

      get template() {
        return `
          <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
              Total ${this.label}
              ${this.getLink()}
            </div>
            <div class="column-chart__container">
               <div data-element="header" class="column-chart__header">
                 ${this.value}
               </div>
              <div data-element="body" class="column-chart__chart">
                ${this.getColumnBody(this.data)}
              </div>
            </div>
          </div>
        `;
      }

      render() {
        const element = document.createElement('div');
    
        element.innerHTML = this.template;
    
        this.element = element.firstElementChild;
    
        if (this.data.length) {
          this.element.classList.remove('column-chart_loading');
        }
    
        this.subElements = this.getSubElements(this.element);
      }

      getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');
    
        return [...elements].reduce((accum, subElement) => {
          accum[subElement.dataset.element] = subElement;
    
          return accum;
        }, {});
      }

    async update(from = new Date(), to = new Date()) {

        this.target.searchParams.set("from", from);
        this.target.searchParams.set("to", to);
       
        const result = await fetchJson(this.target);
        this.data = Object.values(result);
        this.render();
    }


    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
 
    }

}