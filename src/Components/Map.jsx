import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { receiveAddressList, receiveRoute, getAddressList, getMapRoute } from "modules/map";

export class Map extends Component {
  static propTypes = {
    addressList: PropTypes.array,
    mapRoute: PropTypes.array,
    receiveAddressList: PropTypes.func,
    receiveRoute: PropTypes.func
  };

  drawRoute = (map, coordinates) => {
    map.flyTo({
      center: coordinates[0],
      zoom: 15
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
            coordinates
          }
        }
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#ffc617",
        "line-width": 8
      }
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

    // получаем список адресов
    receiveAddressList();
  }

  componentDidUpdate() {
    if (mapRoute !== undefined && mapRoute.length !== 0) {
      this.drawRoute(this.map, mapRoute);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  handleRouteSubmit = event => {
    event.preventDefault();

    const address1 = event.target.address1.value;
    const address2 = event.target.address2.value;

    const { receiveRoute } = this.props;
    receiveRoute({ address1, address2 });
  };

  render() {
    return (
      <div className="map-wrapper">
        { this.props.addressList ? (
          <form onSubmit={this.handleRouteSubmit}>
            <select name="address1">
              {this.props.addressList.map((item,i) => <option key={i}>{item}</option>)}
            </select>
            <select name="address2">
              {this.props.addressList.map((item,i) => <option key={i}>{item}</option>)}
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

const mapStateToProps = state => ({
  addressList: getAddressList(state),
  mapRoute: getMapRoute(state)
});

export default connect(
  mapStateToProps,
  { receiveAddressList, receiveRoute }
)(Map);
