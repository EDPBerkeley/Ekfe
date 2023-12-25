import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";


const IP_ADDRESS = "172.20.19.150"
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

const PRODUCT_CATEGORIES = {
  "Home": [
    "Home Decor",
    "Cleaning Supplies",
    "Bedding & Linens",
    "Lighting",
    "Home Improvement Tools",
    "Gardening Supplies",
    "Air Purifiers",
    "Home Fragrances",
    "Security Systems",
    "Storage Solutions"
  ],
  "Kitchen": [
    "Cookware",
    "Utensils",
    "Small Appliances",
    "Food Storage",
    "Tableware",
    "Bakeware",
    "Kitchen Linens",
    "Kitchen Gadgets",
    "Cutlery",
    "Barware"
  ],
  "Electronics": [
    "Computers & Accessories",
    "Mobile Devices",
    "Audio & Video Equipment",
    "Smart Home Devices",
    "Cameras & Photography",
    "Gaming Consoles",
    "Wearable Technology",
    "Networking Devices",
    "Electronic Components",
    "Batteries & Chargers"
  ],
  "Clothing": [
    "Women's Fashion",
    "Men's Fashion",
    "Kids' & Baby Clothing",
    "Footwear",
    "Accessories",
    "Activewear",
    "Outerwear",
    "Undergarments",
    "Formal Wear",
    "Sleepwear"
  ],
  "Books": [
    "Fiction",
    "Non-Fiction",
    "Children's Books",
    "Educational",
    "E-Books",
    "Cookbooks",
    "Biographies",
    "Self-Help",
    "Graphic Novels",
    "Reference Books"
  ],
  "Furniture": [
    "Living Room Furniture",
    "Bedroom Furniture",
    "Office Furniture",
    "Outdoor Furniture",
    "Storage Solutions",
    "Dining Furniture",
    "Bar Furniture",
    "Kids' Furniture",
    "Accent Pieces",
    "Mattresses"
  ],
  "Beauty": [
    "Skincare Products",
    "Makeup",
    "Hair Care Products",
    "Fragrances",
    "Nail Care",
    "Beauty Tools",
    "Men's Grooming",
    "Bath & Body Products",
    "Sun Care Products",
    "Beauty Supplements"
  ],
  "Sports & Outdoors": [
    "Fitness Equipment",
    "Outdoor Gear",
    "Athletic Apparel",
    "Water Sports Equipment",
    "Camping & Hiking Gear",
    "Cycling Gear",
    "Sports Nutrition",
    "Team Sports Equipment",
    "Winter Sports Gear",
    "Fishing Equipment"
  ],
  "Toys & Games": [
    "Educational Toys",
    "Board Games",
    "Electronic Toys",
    "Puzzles",
    "Dolls & Action Figures",
    "Outdoor Toys",
    "Crafts & Arts",
    "Musical Toys",
    "Role Playing Games",
    "Construction Toys"
  ],
  "Jewelry": [
    "Necklaces & Pendants",
    "Earrings",
    "Rings",
    "Bracelets",
    "Watches",
    "Body Jewelry",
    "Fine Jewelry",
    "Costume Jewelry",
    "Jewelry Boxes & Organizers",
    "Jewelry Making Supplies"
  ],
  "Grocery": [
    "Fresh Produce",
    "Meat & Seafood",
    "Dairy & Eggs",
    "Bakery Items",
    "Snacks & Beverages",
    "Frozen Foods",
    "Pantry Staples",
    "Organic Products",
    "International Cuisine",
    "Specialty Diet Foods"
  ],
  "Automotive": [
    "Car Accessories",
    "Automotive Tools",
    "Car Care Products",
    "Replacement Parts",
    "Motor Oils & Fluids",
    "Car Electronics",
    "Tires & Wheels",
    "Motorcycle Gear",
    "Auto Safety & Security",
    "Vehicle Covers"
  ],
  "Pet Supplies": [
    "Pet Food",
    "Toys & Play Items",
    "Grooming Products",
    "Healthcare Items",
    "Bedding & Accessories",
    "Feeding & Watering Supplies",
    "Pet Clothing & Accessories",
    "Aquariums & Supplies",
    "Pet Training Products",
    "Pet Travel & Carriers"
  ],
  "Health & Wellness": [
    "Vitamins & Supplements",
    "Personal Care Items",
    "Fitness & Weight Management",
    "Medical Devices",
    "Natural Remedies",
    "First Aid Supplies",
    "Prescription Medications",
    "Sexual Wellness",
    "Sleep & Snoring Aids",
    "Mobility Aids"
  ],
  "Office & School Supplies": [
    "Writing Instruments",
    "Notebooks & Paper Products",
    "Desk Organizers",
    "School Supplies",
    "Office Technology",
    "Art Supplies",
    "Filing & Storage",
    "Printers & Ink",
    "Office Furniture",
    "Calendars & Planners"
  ]
};


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
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dde2e3"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c6e8b3"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "on"
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
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c1d1d6"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#a9b8bd"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f8fbfc"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#979a9c"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#827e7e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#3b3c3c"
      },
      {
        "visibility": "off"
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
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a6cbe3"
      },
      {
        "visibility": "on"
      }
    ]
  }
]

export {ICONWRAPPER, CATEGORIES, MAPSTYLE, IP_ADDRESS};
