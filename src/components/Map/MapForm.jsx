import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAddressList, receiveRoute } from "modules/map";
import { useForm } from "react-hook-form";

const MapForm = (props) => {
  const { register, handleSubmit } = useForm();

  const onRouteSubmit = (data) => {
    const { address1, address2 } = data;
    const { receiveRoute } = props;
    receiveRoute({ address1, address2 });
  };

  const handleAddressSelect = (event) => {
    if (event.target.name === "address1") {
      props.filteredAddressList[0] = event.target.value;
    } else {
      props.filteredAddressList[1] = event.target.value;
    }
  };

  return (
    <form onSubmit={handleSubmit(onRouteSubmit)}>
      <select name="address1" onChange={handleAddressSelect} ref={register}>
        {props.addressList.filter(item => !props.filteredAddressList.includes(item)).map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>
      <select name="address2" onChange={handleAddressSelect} ref={register}>
        {props.addressList.filter(item => !props.filteredAddressList.includes(item)).map((item, i) => (
          <option key={i}>{item}</option>
        ))}
      </select>
      <input type="submit" value="Вызвать такси" />
    </form>
  );
};

MapForm.propTypes = {
  addressList: PropTypes.array,
  receiveRoute: PropTypes.func,
  filteredAddressList: PropTypes.array
};

const mapStateToProps = (state) => ({
  filteredAddressList: [],
  addressList: getAddressList(state)
});

export default connect(
  mapStateToProps,
  { receiveRoute }
)(MapForm);
