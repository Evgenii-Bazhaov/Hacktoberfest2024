// Google Maps API Key URLs

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const fetchAddressFromGoogle = (latitude, longitude) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
};

export const fetchInputAddressFromGoogle = (query) => {
  return `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`;
};

export const fetchPlaceIdDetail = (placeId) => {
  return `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
};
