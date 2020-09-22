import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
 
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
        console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
       <p key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </p>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}


        onChange={handleInput}
        disabled={false}
        placeholder={props.placeholder}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
export default PlacesAutocomplete














// import React from "react";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import useOnclickOutside from "react-cool-onclickoutside";
// import { Dropdown } from 'semantic-ui-react'
 
// const PlacesAutocomplete = (props) => {
//   const {
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       /* Define search scope here */
//     },
//     debounce: 300,
//   });
//   const ref = useOnclickOutside(() => {
//     // When user clicks outside of the component, we can dismiss
//     // the searched suggestions by calling this method
//     clearSuggestions();
//   });

//   const handleInput = (e) => {
//     // Update the keyword of the input element
//     setValue(e.target.value);
    
//   };

//   const handleSelect = ({ description }) => () => {
//     // When user selects a place, we can replace the keyword without request data from API
//     // by setting the second parameter as "false"
//     setValue(description, false);
//     props.click(description)
//     clearSuggestions();

//     // Get latitude and longitude via utility functions
//     getGeocode({ address: description })
//       .then((results) => getLatLng(results[0]))
//       .then(({ lat, lng }) => {
//         console.log("📍 Coordinates: ", { lat, lng });
//       })
//       .catch((error) => {
//         console.log("😱 Error: ", error);
//       });
//   };

// const stateOptions= data.map(x => {
//   return x;
//   console.log(x);
//   // return ({
//   //   id,
//   //   text:"ttt",
//   //   structured_formatting: { main_text, secondary_text },
//   // })
// });

//   const renderSuggestions = () =>
//     data.map((suggestion) => {
//       const {
//         id,
//         structured_formatting: { main_text, secondary_text },
//       } = suggestion;
// console.log(suggestion)
//       return (
//        <p key={id} onClick={handleSelect(suggestion)}>
//           {/* <strong>{main_text}</strong> <small>{secondary_text}</small> */}
//         </p>
//       );
//     });
//   return (
//     <div ref={ref}>
//       <input
//         value={value}
//         onChange={handleInput}
//         disabled={false}
//         placeholder={props.placeholder}
//       />

// {/* <Dropdown placeholder='State' search selection options={stateOptions} /> */}
//       {/* We can use the "status" to decide whether we should display the dropdown or not */}
//       {status === "OK" && <ul>{renderSuggestions()}</ul>}
//     </div>
//   );
// };
// export default PlacesAutocomplete