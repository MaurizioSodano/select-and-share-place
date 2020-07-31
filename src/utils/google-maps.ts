const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
// Create the script tag, set the appropriate attributes
let script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY; //"YOUR_API_KEY&callback=initMap';
script.defer = true;

export class GoogleMapInitializer {
  private static instance: GoogleMapInitializer;
  private constructor() {}
  static initialize() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new GoogleMapInitializer();
    document.head.appendChild(script);
    return this.instance;
  }

  /* // Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
}; */


}
