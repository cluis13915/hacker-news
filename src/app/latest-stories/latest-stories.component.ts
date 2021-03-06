import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Story } from '../types/story.type';

@Component({
  selector: 'app-latest-stories',
  templateUrl: './latest-stories.component.html',
  styleUrls: ['./latest-stories.component.scss']
})
export class LatestStoriesComponent implements OnInit {
  @Input() stories: Story[] = [];
  @Input() lastUpdate: Date | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  trackById(index: number, record: Story): string {
    return record._id;
  }

  viewStory(story: Story) {
    this.router.navigate([`/stories/${story._id}`])
  }
}
