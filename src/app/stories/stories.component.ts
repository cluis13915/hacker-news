import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoriesService } from '../services/stories.service';
import { StoriesResponse, Story } from '../types/story.type';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  public stories: Story[] = [];
  public pageSize: number = 10;
  public page: number = 1;
  public count: number = 0;

  constructor(private storiesService: StoriesService, private router: Router) { }

  ngOnInit(): void {
    this.page = 1;
    this.fetchStories();
  }

  trackById(index: number, record: Story): string {
    return record._id;
  }

  fetchStories() {
    this.storiesService.fetch({ page: this.page })
      .subscribe((res: StoriesResponse) => {
        this.stories = res.data;
        this.pageSize = res.size;
        this.page = res.page;
        this.count = res.count;
      });
  }

  viewStory(story: Story) {
    this.router.navigate([`/stories/${story._id}`])
  }

  handlePageChange(event: number) {
    this.page = event;
    this.fetchStories();
  }
}
