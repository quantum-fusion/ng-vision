import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { FaceApiService } from '../services/face-api-service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/concat'; 
import 'rxjs/add/observable/forkJoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-face-analysis',
  templateUrl: './face-analysis.component.html',
  styleUrls: ['./face-analysis.component.css']
})
export class FaceAnalysisComponent implements OnInit {

  public busy: Subscription;
  public detectedFaces: any;
  public identifiedPersons = [];
  public imageUrl: string;
  public multiplier: number;
  public personGroups = [];
  public selectedFace: any;
  public selectedGroupId: string;
  public toasterConfig: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    positionClass: 'toast-bottom-center'
  });
  @ViewChild('mainImg') mainImg;


  constructor(
    private modal: NgbModal,
    private faceApi: FaceApiService,
    public toastr: ToasterService) { }

  ngOnInit() {
    this.busy = this.faceApi.getPersonGroups().subscribe(data => this.personGroups = data);
  }

  analyzeFaces() {
    //TODO: validate that PersonGroup was selected and image loaded
    // 1. Detect faces
    this.busy = this.faceApi.detectFaces(this.imageUrl).flatMap(data => {
      this.detectedFaces = data;
      let faceIds = _.map(this.detectedFaces, 'faceId');
      // 2. Identify Faces
      return this.faceApi.identifyFaces(this.selectedGroupId, faceIds);
    }).flatMap(data => {
      let identifiedFaces = data;
      let obsList = [];
      _.forEach(identifiedFaces, identifiedFace => {
        if (identifiedFace.candidates.length > 0) {
          let detectedFace = _.find(this.detectedFaces, { faceId: identifiedFace.faceId });
          detectedFace.identifiedPerson = true;
          detectedFace.identifiedPersonId = identifiedFace.candidates[0].personId;
          detectedFace.identifiedPersonConfidence = identifiedFace.candidates[0].confidence;
          obsList.push(this.faceApi.getPerson(this.selectedGroupId, identifiedFace.candidates[0].personId));
        }
      });

      // 3. Call getPerson() for each identified face
      return Observable.concat(...obsList);
    }).subscribe(data => this.identifiedPersons.push(data));
  }


  faceClicked(item) {
    let identifiedPerson = _.find(this.identifiedPersons, { personId: item.identifiedPersonId });
    item.identifiedPerson = identifiedPerson;
    this.selectedFace = item;
  }

  imageLoaded($event) {
    this.detectedFaces = [];
    let img = this.mainImg.nativeElement;
    this.multiplier = img.clientWidth / img.naturalWidth;
    this.selectedFace = null;
  }

  viewResults(content) {
    this.modal.open(content);
  }

}
