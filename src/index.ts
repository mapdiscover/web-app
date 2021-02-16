import "./style/test.scss";
import { MDCTextField, numbers } from "@material/textfield";
import { MDCList } from "@material/list";
import $ from "jquery";
import { random, size } from "lodash";

$(".mdc-text-field")
  .toArray()
  .forEach((v) => new MDCTextField(v));
$(".mdc-list")
  .toArray()
  .forEach((v) => new MDCList(v));

function makeSearchResult(text: string, icon: string, term: string) {
  return `<li class="mdc-list-item">
    <i class="material-icons mdc-list-item__graphic">${icon}</i>
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text bold pre">${text.substr(
      0,
      term.length
    )}</span>
    <span class="mdc-list-item__text pre">${text.substr(term.length)}</span>
</li>`;
}

function makePosition(place: place) {
  return `<div class="position" style="left:${place.x}px; top:${place.y}px;"> 
    <div class="mdc-card">
      <div class="mdc-card-wrapper__text-section">
        <h2 class="mdc-typography mdc-typography--headline6">${place.name}</h2>
        <ul class="mdc-list">
          <li class="mdc-list-item">
            <i class="material-icons mdc-list-item__graphic">phone</i>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">040 123456</span>
          </li>
          <li class="mdc-list-item">
            <i class="material-icons mdc-list-item__graphic">public</i>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
              <a href="http://example.com" target="_blank">example.com</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}

const recentSearches: searchResults = ["ich", "bin", "faul"];
type place = {
  x: number;
  y: number;
  name: string;
};

const searchTerms: searchResults = [
  "Ab hey",
  "AB hallo",
  "ab moin",
  "test",
  "test 2",
  "wow",
];

const searchBar = $("#search") as JQuery<HTMLInputElement>;
$("#searchResults").on("MDCList:action", () => {
  var w = window.innerWidth;
  var h = window.innerHeight;
  const places: place[] = [];
  const rnd = random(10);
  for (let i = 0; i < rnd; i++) {
    places.push({
      x: random(w),
      y: random(h),
      name: random(true).toString(),
    });
  }
  console.log(places);
  showSearchResults(places);
});
searchBar.on("focusin input", () => {
  const input = (searchBar.val() as string).toLowerCase();
  if (/^\s*$/.test(input))
    showSearchTerms(recentSearches, { icon: "schedule" });
  else {
    showSearchTerms(
      searchTerms.filter((v) =>
        typeof v == "object"
          ? v.text.toLowerCase().startsWith(input)
          : v.toLowerCase().startsWith(input)
      ),
      { term: input }
    );
  }
});
searchBar.on("focusout", () => {
  $(".showForSearch").hide("fast");
});

type searchResults = ({ icon: string; text: string } | string)[];

function showSearchTerms(
  values: searchResults,
  { icon = "place", term = "" }: { icon?: string; term?: string } = {}
) {
  const searchResults = $("#searchResults");
  searchResults.children().remove();
  for (const value of values) {
    searchResults.append(
      makeSearchResult(
        typeof value == "object" ? value.text : value,
        typeof value == "object" ? value.icon : icon,
        term
      )
    );
  }
  if (values.length > 0) {
    $(".showForSearch").show("fast");
  }
}

function showSearchResults(values: place[]) {
  $(".position").remove();
  for (const value of values.sort((a, b) => Math.min(a.y - b.y , a.x - b.x))) {
    $("body").append(makePosition(value));
  }
}
