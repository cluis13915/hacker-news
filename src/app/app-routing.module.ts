import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryResolver } from './story.resolver';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  {
    path: 'stories/:id',
    component: StoryComponent,
    resolve: {
      story: StoryResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
