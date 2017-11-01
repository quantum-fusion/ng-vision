import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnownIndividualsComponent } from './known-individuals/known-individuals.component';
import { FaceAnalysisComponent } from './face-analysis/face-analysis.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'known-individuals', component: KnownIndividualsComponent },
  { path: 'test-faces', component: FaceAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
