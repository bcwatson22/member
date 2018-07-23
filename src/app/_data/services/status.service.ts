import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Status } from './../models/status';

import { STATUS } from './../mock-status';

@Injectable()
export class StatusService {

 constructor(
   private http: Http
 ) {
 }

 // Simple method to provide the components with the statusData through a resolved promise, which the component will call in preparation 
 // for checking for relevant issues e.g. the BroadbandComponent will call this to make sure it has the data before then calling
 // checkForIssues() in the UtilsService which will filter out unresolved issues of the type broadband.
  getStatus(): Promise<Status[]> {

    return Promise.resolve(STATUS);

  }

}
