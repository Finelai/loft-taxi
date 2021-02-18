import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { receiveRoute, getAdressList } from "modules/map";

export class Map extends Component {
  static propTypes = {
    adressList: PropTypes.array
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
  }

  componentWillUnmount() {
    this.map.remove();
  }

  handleRouteSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="map-wrapper">
        { this.props.adressList ? (
          <form onSubmit={this.handleRouteSubmit}>
            <select name="address1">
              <option value={this.props.adressList[0]}></option>
              <option value={this.props.adressList[1]}></option>
              <option value={this.props.adressList[2]}></option>
            </select>
            <select name="address2">
              <option value={this.props.adressList[0]}></option>
              <option value={this.props.adressList[1]}></option>
              <option value={this.props.adressList[2]}></option>
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
  adressList: getAdressList(state)
});

export default connect(
  mapStateToProps,
  { receiveRoute }
)(Map);
