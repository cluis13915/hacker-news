import { Component } from '@angular/core';
import { StoriesService } from './services/stories.service';
import { Story } from './types/story.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tabActive = 1;

  latestStories: Story[] = [];
  lastUpdate: Date | null = null;

  constructor(private storiesService: StoriesService) {
    // Create socket connection and subscribe to server response.
    this.storiesService.getSocketConnection().subscribe((data: Story[]) => {
      this.latestStories = data;
      this.lastUpdate = new Date();
    });
  }
}
