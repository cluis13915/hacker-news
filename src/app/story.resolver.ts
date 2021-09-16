import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoriesService } from './services/stories.service';
import { Story } from './types/story.type';

@Injectable({
  providedIn: 'root'
})
export class StoryResolver implements Resolve<Story> {
  constructor(private store: StoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Story> {
    const { id } = route.params;

    if (!id) {
      throw Error('This resolver require the id param.');
    }

    return this.store.fetchById(id);
  }
}
