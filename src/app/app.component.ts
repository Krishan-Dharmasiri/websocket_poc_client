import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { environment } from 'src/environments/environment';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers : [ WebsocketService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'websockets frontend';
  dataPoint : number;
  data:any[] = [];
  url : string;

  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Close Prices'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'ABC',
        type: 'line',
        data: []
      }
    ]
  });
  

  constructor(private wsService : WebsocketService){
    this.url = environment.webSocketUrl;
    this.wsService.createObservableSocket(this.url)
      .subscribe(
        data => {
          let a = JSON.parse(data);
          this.dataPoint = a.result;
          this.data.push(a);

          if(this.lineChart){
            this.lineChart.addPoint(a.result)
          }
          
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('The observable stream is complete.')
        }
      );
  }

  sendMessageToServer(){
    console.log('Client sent a message to the Websocket server.')
    this.wsService.sendMessage('Hello from the Angular Client...')
  }

  getAverage(){
    return (this.data.length == 0) ? 0 : this.data.reduce((sum, item) => sum + item.result, 0) / this.data.length
  }

  getCount(){
    return this.data.length;
  }

  getOnlyResults(){
    return this.data.map(item => item.result)
  }


}
