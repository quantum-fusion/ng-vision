import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FaceApiService {
  private readonly baseUrl = 'https://eastus.api.cognitive.microsoft.com/face/v1.0';

  constructor(private http: Http) { }

  // ***** Person Group Operations *****

  getPersonGroups() {
    return this.httpGet(`${this.baseUrl}/persongroups`);
  }

  createPersonGroup(personGroupId, personGroupName) {
    return this.httpPut(`${this.baseUrl}/persongroups/${personGroupId}`, { name: personGroupName });
  }

  deletePersonGroup(personGroupId) {
    return this.httpDelete(`${this.baseUrl}/persongroups/${personGroupId}`);
  }

  trainPersonGroup(personGroupId) {
    return this.httpPost(`${this.baseUrl}/persongroups/${personGroupId}/train`, null);
  }

  getPersonGroupTrainingStatus(personGroupId) {
    return this.httpGet(`${this.baseUrl}/persongroups/${personGroupId}/training`);
  }

  // ***** Person Operations *****

  getPersons(personGroupId) {
    return this.httpGet(`${this.baseUrl}/persongroups/${personGroupId}/persons`);
  }

  getPerson(personGroupId, personId) {
    return this.httpGet(`${this.baseUrl}/persongroups/${personGroupId}/persons/${personId}`);
  }

  createPerson(personGroupId, personName) {
    return this.httpPost(`${this.baseUrl}/persongroups/${personGroupId}/persons`, { name: personName }).map(response => response.json());
  }

  deletePerson(personGroupId, personId) {
    return this.httpDelete(`${this.baseUrl}/persongroups/${personGroupId}/persons/${personId}`);
  }

  addPersonFace(personGroupId, personId, url) {
    return this.httpPost(`${this.baseUrl}/persongroups/${personGroupId}/persons/${personId}/persistedfaces?userData=${url}`, {url : url}).map(response => response.json());
  }

  getPersonFace(personGroupId, personId, faceId) {
    return this.httpGet(`${this.baseUrl}/persongroups/${personGroupId}/persons/${personId}/persistedFaces/${faceId}`);
  } 

  deletePersonFace(personGroupId, personId, faceId) {
    return this.httpDelete(`${this.baseUrl}/persongroups/${personGroupId}/persons/${personId}/persistedFaces/${faceId}`);
  }


  // ***** Face Operations *****

  detectFaces(imageUrl) {
    return this.httpPost(`${this.baseUrl}/detect?returnFaceAttributes=age,gender,facialHair,smile,glasses,emotion`, { url: imageUrl }).map(response => response.json());
  }

  identifyFaces(personGroupId, faceIds) {
    let request = {
      personGroupId: personGroupId,
      faceIds: faceIds
    };
    return this.httpPost(`${this.baseUrl}/identify`, request).map(response => response.json());
  }



  // Private Methods

  private httpGet(url) {
    let headers = this.createHttpHeaders();
    return this.http.get(url, { headers: headers }).map(response => response.json());
  }

  private httpPost(url, item) {
    let headers = this.createHttpHeaders();
    return this.http.post(url, item, { headers: headers });
  }

  private httpPut(url, item) {
    let headers = this.createHttpHeaders();
    return this.http.put(url, item, { headers: headers });
  }

  private httpDelete(url) {
    let headers = this.createHttpHeaders();
    return this.http.delete(url, { headers: headers });
  }

  private createHttpHeaders() {
    let headers = new Headers();
    //TODO: remove hard-coding (just temporary)
    headers.append('Ocp-Apim-Subscription-Key', '<enter-key-here>');
    return headers;
  }
}
