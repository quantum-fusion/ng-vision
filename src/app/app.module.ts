import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusyModule } from 'angular2-busy';
import { ToasterModule } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { KnownIndividualsComponent } from './known-individuals/known-individuals.component';
import { InputBoxComponent } from './shared-components/input-box/input-box.component';
import { InputBoxService } from './shared-components/input-box/input-box.service';
import { FormsModule } from '@angular/forms';
import { FaceApiService } from './services/face-api-service';
import { FaceAnalysisComponent } from './face-analysis/face-analysis.component';
import { ObjectAnalysisComponent } from './object-analysis/object-analysis.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    InputBoxComponent,
    NavMenuComponent,
    KnownIndividualsComponent,
    FaceAnalysisComponent,
    ObjectAnalysisComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ToasterModule
  ],
  providers: [
    FaceApiService,
    InputBoxService 
  ],
  bootstrap: [
    AppComponent,
    NavMenuComponent
  ],
  entryComponents: [
    InputBoxComponent
  ]
})
export class AppModule { }
