import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoriesResponse } from '../types/story.type';
import { StoriesService } from '../services/stories.service';

@Injectable({
  providedIn: 'root'
})
export class AllCountriesResolver implements Resolve<StoriesResponse> {
  constructor(private store: StoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StoriesResponse> {
    return this.store.fetch();
  }
}
