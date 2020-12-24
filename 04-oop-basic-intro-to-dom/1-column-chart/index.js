export default class ColumnChart {
    constructor({data ='11',label='22', link='', value=''} = {}) {
   
        this.data = data;
        this.label=label;
        this.link=link;
        this.value=value;
        this.chartHeight = 50;
        this.render();
      }

   

      render() {

        const chart = document.createElement('div');   
         [...this.data].forEach(element => {
            chart.innerHTML += `
            <div style="--value: ${element}" data-tooltip= "25%"></div>
            `
        }); 

        const element = document.createElement('div');
          element.innerHTML = `<div class="column-chart">
          <div class="column-chart__title">
           Total ${this.label}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header" style="--chart-height: 50">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
                ${chart.innerHTML}
            </div>
            <div class="column-chart__link"></div>
          </div>
        </div>`
        // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
        // который мы создали на строке 7
        this.element = element.firstElementChild;
      }

      update (newData) {
        this.value = newData  
        this.render();
      }
    
    
      remove () {
        this.element.remove();
      }
    
      destroy() {
        this.remove();
        // NOTE: удаляем обработчики событий, если они есть
      }

}