import L from "leaflet";
import Tangram from "tangram";
import { basicPOI, poiType, Requests } from "./request";

function icon(type: poiType, name: string) {
  const fn = (s: string) =>
    L.divIcon({
      html: `<i class="fa fa-${s}" style="font-size: 40px"></i>
            <span>${name}</span>`,
      iconSize: [45, 40],
      className: "myDivIcon",
    });

  switch (type) {
    case "supermarket": {
      return fn("shopping-cart");
    }
  }
}
async function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export class MapUtil {
  async showPois(pois: basicPOI[]) {
    this.pois.forEach((p) => this.map.removeLayer(p));
    this.pois = [];
    if (pois.length > 1) {
      this.map.fitBounds(
        new L.LatLngBounds(
          pois.map((p) => [
            p.geometry.coordinates[1],
            p.geometry.coordinates[0],
          ])
        ).pad(0.2)
      );
    } else {
      this.map.setView([
        pois[0].geometry.coordinates[1],
        pois[0].geometry.coordinates[0],
      ]);
      if (this.map.getZoom() > 17) {
        this.map.setZoom(17);
      }
    }
    // I'm trying to work around https://github.com/Leaflet/Leaflet/issues/5994
    await sleep(0.5);
    pois.forEach((v) => {
      let marker = L.marker(
        [v.geometry.coordinates[1], v.geometry.coordinates[0]],
        {
          icon: icon(v.properties.type, v.properties.name),
        }
      ).addTo(this.map);
      let i = Requests.getDetails(v.properties["poi-id"]);
      let po = L.popup({
        closeButton: false,
      }).setContent(`
        <h2 class="mdc-typography mdc-typography--headline6">${i.name}</h2>
        <ul class="mdc-list">
          <li class="mdc-list-item">
            <i class="material-icons mdc-list-item__graphic">query_builder</i>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">${i["opening-times"].pattern}</span>
          </li>
          <li class="mdc-list-item">
            <i class="material-icons mdc-list-item__graphic">home</i>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
            ${i.address["street-name"]} ${i.address["house-number"]}
            </span>
          </li>
          <li class="mdc-list-item">
            <i class="material-icons mdc-list-item__graphic">public</i>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
              <a href="${i.website}" target="_blank">${i.website}</a>
            </span>
          </li>
        </ul>
      
      `);
      marker.bindPopup(po);

      this.pois.push(marker);
      // marker.on(
      //   "click",
      //   () => {}
      //   // .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      // );
    });
  }
  map: L.Map;
  pois: L.Marker[];
  constructor(
    id: string,
    startLocation: [number, number] = [
      53.542257379522276,
      9.982664481923932,
    ],
    startZoom = 15
  ) {
    this.map = L.map(id);

    Tangram.leafletLayer({
      scene: {
        import: [
          "https://www.nextzen.org/carto/bubble-wrap-style/10/bubble-wrap-style.zip",
          //"https://www.nextzen.org/carto/bubble-wrap-style/10/themes/label-10.zip",
          "https://www.nextzen.org/carto/bubble-wrap-style/10/themes/bubble-wrap-road-shields-usa.zip",
          "https://www.nextzen.org/carto/bubble-wrap-style/10/themes/bubble-wrap-road-shields-international.zip",
        ],
        global: {
          sdk_api_key: "jt5lKqhzRRGOfzJ5TI7DWA",
        },
      },
    }).addTo(this.map);

    this.pois = [];
    this.map.setView(startLocation, startZoom);
    this.setViewFromHash();

    let mover = () => this.setViewFromHash();
    window.addEventListener("hashchange", mover);

    this.map.on("zoomend moveend", () => {
      window.removeEventListener("hashchange", mover);
      const c = this.map.getCenter();
      window.location.hash = `${this.map.getZoom()}/${c.lat}/${
        c.lng
      }`;
      setTimeout(
        () => window.addEventListener("hashchange", mover),
        0.1
      );
    });
  }

  setViewFromHash() {
    const urlHash = window.location.hash
      .slice(1, window.location.hash.length)
      .split("/")
      .map(Number);
    if (urlHash.length == 3) {
      this.map.setView([urlHash[1], urlHash[2]], urlHash[0]);
    }
  }
}
