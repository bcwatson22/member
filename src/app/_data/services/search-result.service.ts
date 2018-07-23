import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SearchResult } from './../models/search-result';

import { SEARCHRESULTS } from './../mock-search-results';

@Injectable()
export class SearchResultService {

   constructor(
     private http: Http
   ) {
   }

  // Simple method to provide the components with the list of Help articles through a resolved promise, which the HeaderComponent will
  // bind to one of its class properties e.g. this.searchService.getSearchResults().then....
  getSearchResults(): Promise<SearchResult[]> {

    return Promise.resolve(SEARCHRESULTS);

  }

}
