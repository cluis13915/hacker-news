import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StoriesResponse, Story } from '../types/story.type';
import { RequestService } from './request.service';

export interface FetchParams {
  page?: number,
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  public loadingList: boolean = false;

  constructor(private req: RequestService, private notifier: NotifierService) { }

  fetch(params?: FetchParams): Observable<StoriesResponse> {
    let page = params && params.page || 1;
    let size = params && params.size || 10;

    this.loadingList = true;

    return this.req.get<StoriesResponse>(`/stories?page=${page}&size=${size}`)
      .pipe(
        tap(() => (this.loadingList = false)),
        catchError((error) => {
          this.loadingList = false;
          this.notifier.notify('error', 'Ocurrió un error al obtener los registros.');

          throw error;
        })
      );
  }

  onChangePage(pageOfItems: Array<any>) {
    console.log(pageOfItems);
  }
}
