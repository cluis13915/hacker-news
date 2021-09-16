import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
export const WS_ENDPOINT = environment.wsUrl;
  
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private subject: Subject<MessageEvent> | undefined;
  
  public connect(): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create();
      console.log('Successfully connected to ' + WS_ENDPOINT);
    }

    return this.subject;
  }
  
  private create(): AnonymousSubject<MessageEvent> {
    const ws = new WebSocket(WS_ENDPOINT, 'echo-protocol');
    const observable = new Observable<MessageEvent>((observer) => {
      ws.onmessage = observer.next.bind(observer);
      ws.onerror = observer.error.bind(observer);
      ws.onclose = observer.complete.bind(observer);

      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
      error: (error: any) => console.log('WS Observer error:', error),
      complete: () => console.log('WS Observer completed.'),
    };

    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
