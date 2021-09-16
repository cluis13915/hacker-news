import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StoriesResponse, Story } from '../types/story.type';
import { WebSocketService } from '../web-socket.service';
import { RequestService } from './request.service';

export interface FetchParams {
  page?: number,
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  public isLoading: boolean = false;

  constructor(
    private req: RequestService,
    private wsService: WebSocketService,
    private notifier: NotifierService
  ) { }

  fetch(params?: FetchParams): Observable<StoriesResponse> {
    let page = params && params.page || 1;
    let size = params && params.size || 10;

    this.isLoading = true;

    return this.req.get<StoriesResponse>(`/stories?page=${page}&size=${size}`)
      .pipe(
        tap(() => (this.isLoading = false)),
        map((response) => {
          response.data.forEach((story: Story) => {
            story.date = new Date(story.time * 1000);
          });

          return response;
        }),
        catchError((error) => {
          this.isLoading = false;
          this.notifier.notify('error', 'Error getting stories. Try reloading the page.');

          if (error.error.message) {
            this.notifier.notify('error', error.error.message);
          }

          throw error;
        })
      );
  }

  fetchById(id: string): Observable<Story> {
    this.isLoading = true;

    return this.req.get<Story>(`/stories/${id}`)
      .pipe(
        tap(() => (this.isLoading = false)),
        map((story) => {
          story.date = new Date(story.time * 1000)

          return story;
        }),
        catchError((error) => {
          this.isLoading = false;
          this.notifier.notify('error', 'Error getting story item. Try reloading the page.');

          if (error.error.message) {
            this.notifier.notify('error', error.error.message);
          }

          throw error;
        })
      );
  }

  getSocketConnection() {
    return this.wsService.connect()
      .pipe(map(response => JSON.parse(response.data)));
  }
}
