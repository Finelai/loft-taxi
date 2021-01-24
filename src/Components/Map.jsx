import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

export class Map extends Component {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZmluZWxhaSIsImEiOiJja2tiaTFrYTQwN3E1Mm9wYXluNGtuMnU3In0.S8tn23vSkyNWpUlrZPM7Ew";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.3056504, 59.9429126],
      zoom: 10,
      compact: true,
      attributionControl: false,
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className="map-wrapper">
        <div data-testid="map" className="map" ref={this.mapContainer} />
      </div>
    );
  }
}

export default Map;
