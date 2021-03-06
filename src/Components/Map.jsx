import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import {
  receiveAddressList,
  receiveRoute,
  getAddressList,
  getMapRoute,
} from "modules/map";
import { getUserCard } from "modules/user";
import MapForm from "./MapForm";

export class Map extends React.Component {
  static propTypes = {
    addressList: PropTypes.array,
    mapRoute: PropTypes.array,
    receiveAddressList: PropTypes.func,
    receiveRoute: PropTypes.func,
    userCard: PropTypes.object
  };

  drawRoute = (map, coordinates) => {
    map.flyTo({
      center: coordinates[0],
      zoom: 15,
    });

    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#ffc617",
        "line-width": 8,
      },
    });
  };

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

    this.map.on("load", () => {
      this.drawRoute(this.map, this.props.mapRoute);
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentDidUpdate() {
    // получаем список адресов
    console.log(this.props.userCard);
    if (this.props.userCard.number) {
      console.log("получаем адреса");
      receiveAddressList();
    }
  }

  render() {
    return (
      <div className="map-wrapper">
        {this.props.userCard.number && this.props.addressList && this.props.addressList.length > 0 ? (
          <MapForm />
        ) : (
          <div className="map__modal">
            <p>У вас не заполнены платежные данные</p>
            <Link to="/profile">Перейти в профиль</Link>
          </div>
        )}
        <div data-testid="map" className="map" ref={this.mapContainer} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addressList: getAddressList(state),
  mapRoute: getMapRoute(state),
  userCard: getUserCard(state)
});

export default connect(mapStateToProps, { receiveAddressList, receiveRoute })(
  Map
);
