import fetchJson from './utils/fetch-json.js';

export default class ColumnChart {
    chartHeight = 50;
    subElements = {};

    constructor({
        data = [],
        label = '',
        link = '',
        value = 0
    } = {}) {

        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;
        this.url = new URL('https://course-js.javascript.ru/api/dashboard/orders');
        this.render();
    }

    //[ 30, 40, 20, 80, 35, 15 ];
    getColumnBody(data) {
        console.log("2222222", data)
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
          console.log("3333", this.getColumnBody(this.data))
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
        console.log("URL", this.url)
        this.url.searchParams.set("from", from);
        this.url.searchParams.set("to", to);
       
        let promise = fetchJson(this.url);
        const result = await promise;
        console.log(result);
        console.log(Object.values(result))
        this.data = Object.values(result);
        console.log(" DATA = ",this.data)
      
        this.render();
    }


    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        // NOTE: удаляем обработчики событий, если они есть
    }

}