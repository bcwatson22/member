import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserData } from './../models/user-data';

import { USERDATA } from './../mock-user-data';

@Injectable()
export class UserDataService {

   constructor(private http: Http) {
   }

  //  getUserData(): Observable<UserData[]> {
   //
  //     return this.http.get('http://billywatson.net/plusnet/userData.json')
  //        .map((res: Response) => res.json())
  //        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   //
  //  }

  // Simple method to provide the components with the userData through a resolved promise, which the component will bind to one of its
  // class properties before then calling bindDataByKey() in the UtilsService which will filter out the data based on the target key.
  getUserData(): Promise<UserData[]> {

    return Promise.resolve(USERDATA);

  }

}
