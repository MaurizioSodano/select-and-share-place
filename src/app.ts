import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


const form = document.querySelector("form");
const addressInput = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
//?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY"
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
    .get(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
form?.addEventListener("submit", searchAddressHandler);
