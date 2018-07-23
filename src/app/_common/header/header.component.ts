import { Component, OnInit, Input, Output } from '@angular/core';
import { UtilsService } from './../../_data/services/utils.service';
import { SearchResultService } from './../../_data/services/search-result.service';
import { ModalAnimation } from './../../_animations/modal';
import { BreadcrumbComponent } from './../breadcrumb/breadcrumb.component';
import { SearchPipe } from './../../_pipes/search.pipe';

@Component({
  selector: 'heading',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    ModalAnimation
  ],
  providers: [
    UtilsService,
    SearchResultService,
    SearchPipe
  ]
})

export class HeaderComponent implements OnInit {

  @Input() public title: string;

  public searchText: any;

  public searchResultState: string;
  public searchProgressPercent: string;
  public searchProgressValue: string;

  public searchResults: any;

  constructor(
    public utils: UtilsService,
    private searchService: SearchResultService,
    private search: SearchPipe
  ) {

  }

  ngOnInit() {

    // Assign the Help data JSON supplied from our searchService to the component property this.searchResults.
    this.searchService.getSearchResults().then(
      (val) => {
        this.searchResults = val[0];
      }
    );

  }

  // This method is called whenever the user presses a key on the search input field. It uses the (ngModelChange) Output event, and
  // passes the content payload in the 'event' parameter. If it's the first character in the field it will animate in the search result
  // modal by changing the searchResultState property and also makes the focused input element sit about the modal bg. It will then also
  // calculate the percentage of results against the total, and assign this to the searchProgressPercent property which is used as an
  // animation parameter for the 'progress' animation in the SearchResultsComponent. We also set the searchProgressValue property (to
  // save querying the pipe too many times) which is used to tell the user how many results there are, through the progressValue Input
  // on the SearchResultsComponent. If the user deletes the last character it will hide the modal and revert the input and state.
  searchPress(event: any): void {

    let $searchBar = <HTMLElement>document.querySelectorAll('header .text-input')[0];

    if (event.length) {

      if (event.length === 1) {

        $searchBar.style.zIndex = '10';
        this.searchResultState = 'animate';

      }

      let numOfResults = this.howManyResults(event);

      this.searchProgressPercent = this.utils.calculatePercentage(numOfResults, this.searchResults.help.length);
      this.searchProgressValue = numOfResults.toString();

    } else {

      this.revertSearchState($searchBar);

    }

  }

  // Call the custom SearchPipe manually instead of in the template HTML, as we need the value for both the progress bar width and to
  // tell the user how many results there are.
  howManyResults(term: string): number {

    let results = this.search.transform(this.searchResults.help, term);

    return results.length;

  }

  // Extracted the revert code into its own method as it's called in two places.
  revertSearchState(searchBar: any): void {

    searchBar.style.zIndex = 'auto';

    this.searchResultState = null;
    this.searchProgressPercent = '100';

  }

  // This is called when the revertSearch() is emitted from the child SearchResultsComponent, when the user clicks the modal bg.
  clearSearch(): void {

    let $searchBar = <HTMLElement>document.querySelectorAll('header .text-input')[0],
        $searchInput = <HTMLInputElement>$searchBar.querySelectorAll('input[type="text"]')[0];

    this.revertSearchState($searchBar);

    $searchInput.value = '';

  }

}
