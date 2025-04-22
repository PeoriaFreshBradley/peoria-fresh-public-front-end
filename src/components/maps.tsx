import { usePlacesWidget } from "react-google-autocomplete";

export const MAPS_API_KEY = 'AIzaSyBDc6zPhxsPctnZdweSiXu0gQsOJScqbMM';

const relevantAddressComponents = new Map<string, string>();
relevantAddressComponents.set('administrative_area_level_1', 'state');
relevantAddressComponents.set('country', 'country');
relevantAddressComponents.set('street_number', 'street_number');
relevantAddressComponents.set('route', 'street');
relevantAddressComponents.set('locality', 'city');
relevantAddressComponents.set('postal_code', 'postal');
export interface AddressType {
  state: string;
  country: string;
  city: string;
  postal: number;
  address: string;
};

export const toAddress = (obj:AddressType) => {
  return `${obj.address}, ${obj.city}, ${obj.state} ${obj.postal}, ${obj.country}`;
}

export const toShortAddress = (addr:AddressType) => {
  return `${addr.address}, ${addr.city}`;
}

export const MapsAutoComplete = ({giveMeTheAddress, clearOnValid}:any) => {
  const inputStyle = {
    width: '100%',
    padding: '10px',
    boxShadow: '2px 4px 9px 0px #11472a',
    borderRadius: '7px',
    borderColor: '#11472a',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontSize: 'medium',
    fontFamily: 'Rubik'
  };

  {/** Allows the autocomplete dropdown menu to be over a popup */} 
  setTimeout(() => {
    // Loop through all stylesheets
      for ( let i of document.styleSheets) {
        if (i.href === null) {
          i.insertRule(".container-alt { z-index: 13000!important;}", 0);
          break;
        }
      }
      // Add custom class to all autocomplete dropdown containers
      let containers = document.querySelectorAll('.pac-container');
      for (let i of containers) {
        i.classList.add('container-alt');
      }
  }, 1000);

  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey:MAPS_API_KEY,
    // Callback function when a place is selected from autocomplete dropdown
    onPlaceSelected: (place) => {
      let placeObject:any = {};

      for (let i of place.address_components) {
        if (relevantAddressComponents.has(i.types[0]))
          placeObject[relevantAddressComponents.get(i.types[0]) as string] = i.short_name;
      }

      if (clearOnValid && ref !== null && ref.current !== null) {
        ref.current.value = "";
      }

      const address = {
        address: `${placeObject.street_number} ${placeObject.street}`,
        city: placeObject.city,
        state: placeObject.state,
        postal: parseInt(placeObject.postal),
        country: placeObject.country
      } as AddressType;

      if (typeof giveMeTheAddress === 'function') {
        let validAddress = true;
        // Check if all required address components are present
        for (let i of ['state','country','street_number', 'street', 'city','postal']) {
          if (placeObject[i] === undefined)
            validAddress = false;
        }
        // Pass address and validity status to parent component
        giveMeTheAddress(address, validAddress);
      }
      else console.log(typeof giveMeTheAddress);
    },
    options: { types: ['address'] }
  });

   // Handle input value change
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Clear address if input field is empty
    if (value === ''){
      giveMeTheAddress({}, true);
    }
  };

  return <input ref={ref} placeholder="Enter an address" style={inputStyle} onChange={handleInputChange}/>;
}

interface EphemeralPlaceType {
  place?: string;
  locationObject?: any;
}

export const MapsEmbed = ({place, locationObject}: EphemeralPlaceType) => {
  let queryString;

  if (place) queryString = encodeURIComponent(place);
  else if (locationObject) queryString = encodeURIComponent(toAddress(locationObject));
  else throw "Unable to render map. Address-like object required.";

  return <iframe
  width={"600"}
  height={"450"}
  style={{border:0}}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=${queryString}`}
/>
}