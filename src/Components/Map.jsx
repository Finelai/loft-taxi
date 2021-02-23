import React, { Component } from "react";
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

export class Map extends Component {
  static propTypes = {
    addressList: PropTypes.array,
    mapRoute: PropTypes.array,
    receiveAddressList: PropTypes.func,
    receiveRoute: PropTypes.func,
    userCard: PropTypes.object,
    filteredAddressList: PropTypes.array
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

    // получаем список адресов
    if (this.props.userCard.number) {
      receiveAddressList();
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  handleRouteSubmit = (event) => {
    event.preventDefault();

    const address1 = event.target.address1.value;
    const address2 = event.target.address2.value;

    const { receiveRoute } = this.props;
    receiveRoute({ address1, address2 });
  };

  handleAddressSelect = (event) => {
    if (event.target.name === "address1") {
      this.props.filteredAddressList[0] = event.target.value;
    } else {
      this.props.filteredAddressList[1] = event.target.value;
    }
  };

  render() {
    return (
      <div className="map-wrapper">
        {this.props.userCard.number &&
        this.props.addressList &&
        this.props.addressList.length > 0 ? (
          <form onSubmit={this.handleRouteSubmit}>
            <select name="address1" onChange={this.handleAddressSelect}>
              {this.props.addressList.filter(item => !this.props.filteredAddressList.includes(item)).map((item, i) => (
                <option key={i}>{item}</option>
              ))}
            </select>
            <select name="address2" onChange={this.handleAddressSelect}>
              {this.props.addressList.filter(item => !this.props.filteredAddressList.includes(item)).map((item, i) => (
                <option key={i}>{item}</option>
              ))}
            </select>
            <input type="submit" value="Вызвать такси" />
          </form>
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
  filteredAddressList: [],
  addressList: getAddressList(state),
  mapRoute: getMapRoute(state),
  userCard: getUserCard(state)
});

export default connect(mapStateToProps, { receiveAddressList, receiveRoute })(
  Map
);
