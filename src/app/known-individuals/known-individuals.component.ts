import { Component, OnInit } from '@angular/core';
import { InputBoxService } from '../shared-components/input-box/input-box.service';
import { Subscription } from 'rxjs/Subscription';
import { FaceApiService } from '../services/face-api-service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import * as _ from 'lodash';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-known-individuals',
  templateUrl: './known-individuals.component.html',
  styleUrls: ['./known-individuals.component.css']
})
export class KnownIndividualsComponent implements OnInit {
  public busy: Subscription;
  public personGroups = [];
  public personList = [];
  public faceList= [];
  public selectedGroupId: string;
  public selectedPerson: any;
  public toasterConfig: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    positionClass: 'toast-bottom-center'
  });
  
  constructor(
    private faceApi: FaceApiService,
    private inputBox: InputBoxService,
    public toastr: ToasterService) { } 

  ngOnInit() {
    this.busy = this.faceApi.getPersonGroups().subscribe(data => this.personGroups = data);
  }

  addPersonGroup() {
    this.inputBox.show({ title: 'Add Group', label: 'Enter group name'}).then(result => {
      let personGroupId = UUID.UUID();
      this.busy = this.faceApi.createPersonGroup(personGroupId, result).subscribe(data => {
        this.personGroups.push({ personGroupId: personGroupId, name: result });
        this.toastr.pop('success', 'Created', 'New Person Group created');
      });
    });
  }

  deletePersonGroup() {
    this.busy = this.faceApi.deletePersonGroup(this.selectedGroupId).subscribe(data => {
      _.remove(this.personGroups, { personGroupId: this.selectedGroupId});
      this.selectedGroupId = null;
      this.toastr.pop('success', 'Deleted', 'Person Group deleted');
    });
  }

  trainPersonGroup() {
    this.busy = this.faceApi.trainPersonGroup(this.selectedGroupId).subscribe(data => {
      this.toastr.pop('info', 'Training Initiated', 'Training has been initiated...');
    });
  }

  getPersonGroupTrainingStatus() {
    this.busy = this.faceApi.getPersonGroupTrainingStatus(this.selectedGroupId).subscribe(data => {
        console.log('***result of training status', data);
        switch (data.status) {
          case 'succeeded':
            this.toastr.pop('success', 'Training Succeeded');
            break;
          case 'running':
            this.toastr.pop('info', 'Training still in progress...', 'Check back later');
            break;
          case 'failed':
            this.toastr.pop('error', 'Error during Training', data.message);
            break;
          default:
            break;
        }
    });
  }

  addPerson() {
    this.inputBox.show({ title: 'Add Person', label: 'Enter person name' }).then(result => {
      this.busy = this.faceApi.createPerson(this.selectedGroupId, result).subscribe(savedItem => {
        let person = { personId: savedItem.personId, name: result };
        this.personList.push(person);
        this.toastr.pop('success', 'Created', 'New Person created');
      });
    });
  }
  
  deletePerson() {
    this.busy = this.faceApi.deletePerson(this.selectedGroupId, this.selectedPerson.personId).subscribe(data => {
      _.remove(this.personList, { personId: this.selectedPerson.personId });
      this.selectedPerson = null;
      this.toastr.pop('success', 'Deleted', 'Person deleted');
    });
  }

  onGroupsChange() {
    if (this.selectedGroupId) {
      this.busy = this.faceApi.getPersons(this.selectedGroupId).subscribe(data => this.personList = data);
    } else {
      this.selectedPerson = null; 
    }
  }

  personClick(person) {
    this.faceList = []; 
    this.selectedPerson = person;
    let obsList = [];
    _.forEach(this.selectedPerson.persistedFaceIds, faceId => obsList.push(this.faceApi.getPersonFace(this.selectedGroupId, this.selectedPerson.personId, faceId)));

    Observable.forkJoin(obsList).subscribe(data => this.faceList = data);
  }

  addFace() {
    this.inputBox.show({ title: 'Add Face', label: 'Enter Face URL'}).then(result => {
      this.busy = this.faceApi.addPersonFace(this.selectedGroupId, this.selectedPerson.personId, result).subscribe(data => {
        this.faceList.push({ persistedFaceId: data.persistedFaceId, userData: result});
        this.toastr.pop('success', 'Created', 'New Face added');
      });
    });
  }

  deleteFace(face) {
    this.busy = this.faceApi.deletePersonFace(this.selectedGroupId, this.selectedPerson.personId, face.persistedFaceId).subscribe(data => {
      _.remove(this.faceList, { persistedFaceId: face.persistedFaceId});
      this.toastr.pop('success', 'Deleted', 'Face deleted');
    });
  }

}
