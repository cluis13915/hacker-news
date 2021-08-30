import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Story } from '../types/story.type';
import { StoriesService } from '../services/stories.service';

@Injectable({
  providedIn: 'root'
})
export class AllCountriesResolver implements Resolve<Story[]> {
  constructor(private store: StoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Story[]> {
    return this.store.fetch();
  }
}
