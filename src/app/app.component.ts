import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers : [ WebsocketService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'websockets frontend';
  dataPoint : number;
  url : string;

  constructor(private wsService : WebsocketService){
    this.url = environment.webSocketUrl;
    this.wsService.createObservableSocket(this.url)
      .subscribe(
        data => {
          let a = JSON.parse(data);
          this.dataPoint = a.result;
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


}
