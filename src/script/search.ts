import { MDCList, MDCListActionEvent } from "@material/list";
import { MDCTextField } from "@material/textfield";
import { Place } from "./place";
import { Requests } from "./request";
import $ from "jquery";
import { values } from "lodash";

class RecentSearches {
  static max = 5;
  static getN(n: number = this.max) {
    return (
      localStorage.getItem("recentSearches")?.split("\n") || []
    ).slice(0, n);
  }
  static push(term: string) {
    let recentSearches = this.getN();
    recentSearches.unshift(term);
    recentSearches = Array.from(new Set(recentSearches)).slice(
      0,
      RecentSearches.max
    );
    localStorage.setItem("recentSearches", recentSearches.join("\n"));
    console.log(localStorage.getItem("recentSearches"));
  }
}

export class Search extends EventTarget {
  places: Place[];
  searchList: MDCList;
  searchBar: MDCTextField;

  constructor(searchBarID: string, searchListID: string) {
    super();
    this.searchBar = new MDCTextField(
      document.getElementById(searchBarID)
    );
    this.searchList = new MDCList(
      document.getElementById(searchListID)
    );
    this.searchList.listen(
      "MDCList:action",
      (e: MDCListActionEvent) => {
        this.clear();
        let term = this.searchSuggestions[e.detail.index];
        RecentSearches.push(term);
        this.dispatchEvent(new SearchEvent(term));
      }
    );

    //TODO at input event
    ["focusin", "input"].forEach((s) =>
      this.searchBar.listen(s, () => {
        console.log("searching...", this.searchInput);
        this.showSearchTerms();
        // if (/^\s*$/.test(input))
        //   showSearchTerms(recentSearches, { icon: "schedule" });
        // else {
        //   showSearchTerms(
        //     [
        //       ...new Set(
        //         searchTerms
        //           .filter((v) => v.name.toLowerCase().startsWith(input))
        //           .map((e) => e.name)
        //       ),
        //     ],
        //     { term: input }
        //   );
        // }
      })
    );
    this.searchBar.listen("focusout", () => {
      console.log("Stopped searching");
      $(".showForSearch").hide("fast");
    });
  }

  public get searchSuggestions(): string[] {
    return this.searchInput.length == 0
      ? RecentSearches.getN()
      : [
          ...new Set(
            Requests.getSuggestions().filter((v) =>
              v.toLowerCase().startsWith(this.searchInput)
            )
          ),
        ];
  }

  public get searchInput(): string {
    return this.searchBar.value.toLowerCase();
  }

  showSearchResults(values: Place[]) {
    // $(".position").remove();
    // for (const value of values.sort((a, b) => Math.min(a.y - b.y, a.x - b.x))) {
    //   $("body").append(makePosition(value));
    // }
  }

  showSearchTerms() {
    const searchResults = $("#searchResults");
    searchResults.children().remove();
    for (const value of this.searchSuggestions) {
      searchResults.append(
        makeSearchResult(value, "schedule", this.searchInput)
      );
    }
    if (this.searchSuggestions.length > 0) {
      $(".showForSearch").show("fast");
    }
  }

  clear() {
    this.searchBar.value = "";
  }
}

export class SearchEvent extends Event {
  term: string;

  constructor(term: string) {
    super("search");
    this.term = term;
  }
}
type searchResults = ({ icon: string; text: string } | string)[];

function makeSearchResult(text: string, icon: string, term: string) {
  return `<li class="mdc-list-item" value="${text}">
    <i class="material-icons mdc-list-item__graphic">${icon}</i>
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text bold pre">${text.substr(
      0,
      term.length
    )}</span>
    <span class="mdc-list-item__text pre">${text.substr(
      term.length
    )}</span>
</li>`;
}
