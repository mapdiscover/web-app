// import { MDCList } from "@material/list";
// import { MDCListActionEvent } from "@material/list/types";
// import { MDCTextField } from "@material/textfield";
// import $ from "jquery";
import { MapUtil } from "./map";
import { Place } from "./place";
import { Requests } from "./request";
import { Search, SearchEvent } from "./search";

const map = new MapUtil("map");

const search = new Search("search", "searchResults");

search.addEventListener("search", (e: SearchEvent) => {
  map.showPois(Requests.getPois(e.term));
});

function makePosition(place: Place) {
  return `<div class="position" style="left:${place.lan}px; top:${place.lat}px;"> 
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
