import axios from "axios";
import { GoogleMapInitializer } from "./utils/google-maps";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
GoogleMapInitializer.initialize();

const form = document.querySelector("form");
const addressInput = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
declare var google:any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  console.log(enteredAddress);
  const url =
    GOOGLE_URL +
    "?address=" +
    encodeURI(enteredAddress) +
    "&key=" +
    GOOGLE_API_KEY;
  axios
    .get<GoogleGeocodingResponse>(url)
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 12
      });
      new google.maps.Marker({position: coordinates, map: map});
    })
    .catch((error) => {
      console.log(error);
    });
}
form?.addEventListener("submit", searchAddressHandler);
