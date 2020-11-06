import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input } from 'semantic-ui-react'
import '../../../css/AddressInput.css'

const PlacesAutocomplete = (props) => {
  const {
    value,


    suggestions: { status, data },
    setValue,

    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  
  const handleInput = (e) => {
    // Update the keyword of the input element
   
    
    setValue(e.target.value);
  
    
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    props.click(description)
    clearSuggestions();
    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
      })
      .catch((error) => {
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion, i) => {
      const {

        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (

        <p key={i} onClick={handleSelect(suggestion)} id="p"  >

          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </p>
      );
    });
  if (value === "" && props.from === "fromPlace" && props.address !== null){
  
    setValue(props.address)
    props.reset();
  }
  


  return (
    <div ref={ref}>

      <Input
        value={value}
        onChange={handleInput}
        disabled={false}
        placeholder={props.placeholder}
        id="address"
        className="seven wide column"
        icon={props.icon}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul id="seggestions_ul">{renderSuggestions()}</ul>}
    </div>
  );
};
export default PlacesAutocomplete














