import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

const ICONWRAPPER = {
  Feather,
  Ionicons,
  FontAwesome,
  AntDesign
}

const CATEGORIES = [
  "Home",
  "Kitchen",
  "Electronics",
  "Clothing",
  "Books",
  "Furniture",
  "Beauty",
  "Sports & Outdoors",
  "Toys & Games",
  "Jewelry",
  "Grocery",
  "Automotive",
  "Pet Supplies",
  "Health & Wellness",
  "Office & School Supplies"
]

const MAPSTYLE = [
  {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "weight": "1.50"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8f8f8"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#b7de7e"
      }
    ]
  },
  {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#ceeec1"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#8b8b8b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#cfcfcf"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      },
      {
        "weight": "1.00"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#9a9999"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#bcbcbc"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#cacaca"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "saturation": "0"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#cfb2db"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#a2daf2"
      }
    ]
  }
]

export {ICONWRAPPER, CATEGORIES, MAPSTYLE};
