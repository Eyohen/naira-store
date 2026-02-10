export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "USB LED Light",
    price: 150,
    description: "Flexible USB LED light for laptops and power banks. Perfect for reading or working in low light.",
    category: "Accessories",
    image: "/products/usb-light.svg",
    inStock: true
  },
  {
    id: 2,
    name: "Phone Ring Holder",
    price: 200,
    description: "360-degree rotating phone ring holder with magnetic car mount support. Anti-drop grip.",
    category: "Accessories",
    image: "/products/ring-holder.svg",
    inStock: true
  },
  {
    id: 3,
    name: "Earphone Cable Organizer",
    price: 100,
    description: "Silicone cable winder for earphones and charging cables. Keeps your cables tangle-free.",
    category: "Accessories",
    image: "/products/cable-organizer.svg",
    inStock: true
  },
  {
    id: 4,
    name: "Micro USB Cable (1m)",
    price: 350,
    description: "Durable micro USB charging cable. 1 meter length with reinforced connectors.",
    category: "Cables",
    image: "/products/usb-cable.svg",
    inStock: true
  },
  {
    id: 5,
    name: "SIM Card Tray Ejector",
    price: 50,
    description: "Metal SIM card ejector tool. Compatible with all smartphones.",
    category: "Tools",
    image: "/products/sim-ejector.svg",
    inStock: true
  },
  {
    id: 6,
    name: "Phone Dust Plug Set",
    price: 80,
    description: "Set of 5 silicone dust plugs for charging port and headphone jack protection.",
    category: "Accessories",
    image: "/products/dust-plug.svg",
    inStock: true
  },
  {
    id: 7,
    name: "Screen Cleaning Kit",
    price: 250,
    description: "Microfiber cloth and cleaning solution spray for phones, tablets, and laptops.",
    category: "Accessories",
    image: "/products/cleaning-kit.svg",
    inStock: true
  },
  {
    id: 8,
    name: "Finger Touch Stylus",
    price: 300,
    description: "Universal capacitive stylus pen for smartphones and tablets. Precise touch control.",
    category: "Accessories",
    image: "/products/stylus.svg",
    inStock: true
  },
  {
    id: 9,
    name: "USB OTG Adapter",
    price: 450,
    description: "Micro USB to USB-A OTG adapter. Connect USB drives and accessories to your phone.",
    category: "Adapters",
    image: "/products/otg-adapter.svg",
    inStock: true
  },
  {
    id: 10,
    name: "Cable Protector (4pcs)",
    price: 180,
    description: "Cute animal-shaped cable protectors. Prevents cable fraying near the connector.",
    category: "Accessories",
    image: "/products/cable-protector.svg",
    inStock: true
  },
  {
    id: 11,
    name: "Phone Kickstand",
    price: 120,
    description: "Adhesive phone kickstand. Ultra-thin design, folds flat when not in use.",
    category: "Accessories",
    image: "/products/kickstand.svg",
    inStock: true
  },
  {
    id: 12,
    name: "Aux Audio Cable (1m)",
    price: 280,
    description: "3.5mm male to male aux cable. Gold-plated connectors for clear audio.",
    category: "Cables",
    image: "/products/aux-cable.svg",
    inStock: true
  }
];

export const categories = [...new Set(products.map(p => p.category))];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};
