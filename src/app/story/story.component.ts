import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Story } from '../types/story.type';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  public story: Story | undefined;
  @ViewChild('modalElm', { static: true }) modalElm?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.story = this.route.snapshot.data.story;

    const modal = this.modal.open(this.modalElm, { backdrop: true });

    modal.result.then(() => this.closeModal(), () => this.closeModal());
  }

  closeModal(): void {
    this.modal.dismissAll();
    this.router.navigate(['/']);
  }
}
