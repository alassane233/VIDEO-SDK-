import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideoComponent} from "./video/video.component";

const routes: Routes = [
  {path : 'video', component : VideoComponent},
  { path: '',   redirectTo: 'video', pathMatch: 'full' }, // redirect to video
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
