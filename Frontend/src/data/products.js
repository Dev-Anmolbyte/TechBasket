// Sample product data for the TechBasket frontend

import { FaWeight } from "react-icons/fa"

//const USD_TO_INR =83.5;


export const products = [
  //this is perfect for processor
  {
    id: 1,
    name: 'AMD 7000 Series Ryzen 9 7900X Desktop Processor 12 cores 24 Threads 76 MB Cache 4.7 GHz Up to 5.6 GHz Socket AM5, 600 Series Chipset (100-100000589WOF)',
    brand: 'AMD',
    category: 'Processors',
    price: 700,
    image: 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg',
    rating: 5,
    reviews: 245,
    inStock: true,
    description: 'High-performance 12-core processor for gaming and content creation',
    specifications: {
      cores: '12',
      threads: '24',
      baseClockSpeed: '4.7 GHz',
      boostClockSpeed: '5.6 GHz',
      socket: 'AM5',
      tdp: '170W'
    }
  },
  {
    id: 2,
    name: 'Intel® Core™ i7-13700K Processor 30M Cache, up to 5.40 GHz',
    brand: 'Intel',
    category: 'Processors',
    price: 349.99,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRRj_sVCo9QKNC8MB76ulcnH1kZb9ZBXRSzxO_c-tUizj8CSxCDQPt74FbEkSR6zdoO6v4pyu7rewPbvBqGSwX0HcHSXom-',
    rating: 4,
    reviews: 180,
    inStock: true,
    description: '16-core processor with excellent gaming performance',
    specifications: {
      cores: '16',
      threads: '24',
      baseClockSpeed: '3.4 GHz',
      boostClockSpeed: '5.4 GHz',
      socket: 'LGA1700',
      tdp: '125W'
    }
  },
  //-----------------Processor Adding End--------------------

  //graphic adding start
  {
    id: 3,
    name: 'ASUS Tuf Gaming Geforce RTX 4080 16Gb Gddr6X Oc Edition - Black (Tuf-Rtx4080-O16G-Gaming) - Pci_E',
    brand: 'NVIDIA',
    category: 'Graphics Cards',
    price: 1199.99,
    image: 'https://m.media-amazon.com/images/I/71dfNA+N52L.jpg',
    rating: 5,
    reviews: 320,
    inStock: true,
    description: 'High-end graphics card for 4K gaming and ray tracing',
    specifications: {
      memory: '16GB GDDR6X',
      coreClock: '2205 MHz',
      boostClock: '2505 MHz',
      memorySpeed: '22.4 Gbps',
      interface: 'PCIe 4.0',
      powerConsumption: '320W'
    }
  },
  {
    id: 4,
    name: 'AMD Radeon RX 7800 XT',
    brand: 'AMD',
    category: 'Graphics Cards',
    price: 899.99,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRrRHtzBy1zyvkaaiY0W5qvDuliHn3EE-VDdk5XxWoUiawiii0uzkoyhNLLBrEXlMHbNsGh4-7tVfj_DKXIVy2Q8IC5uZF3h3__YtWPipP14yyzOOXGnvCx',
    rating: 4,
    reviews: 150,
    inStock: false,
    description: 'Powerful graphics card for 1440p gaming',
    specifications: {
      memory: '16GB GDDR6',
      coreClock: '1295 MHz',
      boostClock: '2430 MHz',
      memorySpeed: '19.5 Gbps',
      interface: 'PCIe 4.0',
      powerConsumption: '263W'
    }
  },
  //-----------------GPU Adding End--------------------
  {
    id: 5,
    name: 'Corsair Vengeance RGB Pro 32GB',
    brand: 'Corsair',
    category: 'Memory',
    price: 250,
    image: 'https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Memory/CMW32GX4M2E3200C16/Gallery/Vengeance_RGB_Pro_01.webp',
    rating: 5,
    reviews: 89,
    inStock: true,
    description: 'High-performance DDR4 memory with RGB lighting',
    specifications: {
      capacity: '32GB (2x16GB)',
      type: 'DDR5',
      speed: '3200 MHz',
      latency: 'CL16',
      voltage: '1.35V',
      rgb: 'Yes'
    }
  },
  {
    id: 6,
    name: 'G.Skill Trident Z5 RGB 32GB',
    brand: 'G.Skill',
    category: 'Memory',
    price: 280,
    image: 'https://m.media-amazon.com/images/I/41MthU0ly5L._SY300_SX300_QL70_FMwebp_.jpg',
    rating: 5,
    reviews: 67,
    inStock: true,
    description: 'Premium DDR5 memory for next-gen systems',
    specifications: {
      capacity: '32GB (2x16GB)',
      type: 'DDR5',
      speed: '6000 MHz',
      latency: 'CL36',
      voltage: '1.35V',
      rgb: 'Yes'
    }
  },
  //-----------------RAM Adding End--------------------
  {
    id: 7,
    name: 'Samsung 980 PRO SSD 2TB PCIe 4.0 M.2 Internal Solid State Drive, Fastest Speed for Gaming, Heat Control, Direct Storage and Memory Expansion for Video Editing, Heavy Graphics, MZ-V9P2T0BW',
    brand: 'Samsung',
    category: 'Storage',
    price: 150,
    image:'https://m.media-amazon.com/images/I/61sFhWjzfqL._SX679_.jpg',
    rating: 5,
    reviews: 234,
    inStock: true,
    description: 'High-speed NVMe SSD for fast data access',
    specifications: {
      capacity: '2TB',
      type: 'NVMe SSD',
      interface: 'PCIe 4.0',
      readSpeed: '7000 MB/s',
      writeSpeed: '5100 MB/s',
      formFactor: 'M.2 2280'
    }
  },
  {
    id: 8,
    name: 'WD_Black Western Digital SN7100 NVMe 2TB, Upto 7250MB/s R, 6900MB/s W, 5Y Warranty, PCIe Gen 4 NVMe M.2 (2280), Gaming Storage, Internal Solid State Drive (SSD) (WDS200T4X0E-00CJA0)',
    brand: 'Western Digital',
    category: 'Storage',
    price: 110,
    image: 'https://m.media-amazon.com/images/I/516yn6znnLL._SX522_.jpg',
    rating: 4,
    reviews: 156,
    inStock: true,
    description: 'Reliable NVMe SSD for gaming and productivity',
    specifications: {
      capacity: '1TB',
      type: 'NVMe SSD',
      interface: 'PCIe 4.0',
      readSpeed: '5150 MB/s',
      writeSpeed: '4900 MB/s',
      formFactor: 'M.2 2280'
    }
  },
  //-----------------Storage Adding End--------------------
  
  //this is perfect for mouse (pheripherals)
  {
    id: 9,
    name: 'Kreo Pegasus',
    brand: 'Kreo',
    category: 'Prepherals',
    price: 35.9,
    image: 'https://kreo-tech.com/cdn/shop/files/Artboard_3_4.png?v=1753673135&width=1000',
    rating: 4,
    reviews: 156,
    inStock: true,
    description: 'Best Mouse with Gaming Grade Sensor',
    specifications: {
      sensor: 'Pixart 3395 Sensor',
      type: 'mouse',
      battery: '30+ Hours battery life',
      connectivity: 'BT, 2.4GHz or Wired',
      buttons: 'Huano switches',
      polling_rate: '1000Hz',
      Weight: '58g'
    }
  },

  {
    id: 10,
    name: 'Kreo Ikarus',
    brand: 'Kreo',
    category: 'Prepherals',
    price: 60,
    image: 'https://kreo-tech.com/cdn/shop/files/IkarusW2_dd78f891-e1a9-41c3-8dff-ffafde2dde29.png?v=1753673066&width=1000',
    rating: 4,
    reviews: 156,
    inStock: true,
    description: 'Best Mouse with Gaming Grade Sensor',
    specifications: {
      sensor: 'Pixart 3395 Sensor',
      type: 'mouse',
      battery: '30+ Hours battery life',
      connectivity: 'BT, 2.4GHz or Wired',
      buttons: 'Huano switches',
      polling_rate: '1000Hz',
      Weight: '58g'
    }
  },

  {
    id: 10,
    name: 'Kreo chimera',
    brand: 'Kreo',
    category: 'Prepherals',
    price: 25,
    image: 'https://kreo-tech.com/cdn/shop/files/ChimeraB2.png?v=1753673171&width=1000',
    rating: 4,
    reviews: 156,
    inStock: true,
    description: 'Best Mouse with Gaming Grade Sensor',
    specifications: {
      sensor: 'Pixart 3325 Sensor',
      type: 'mouse',
      battery: '24+ Hours battery life',
      connectivity: 'BT, 2.4GHz or Wired',
      buttons: 'HUANO Silent and Tactile Switches',
      polling_rate: '1000Hz',
      Weight: '77g'
    }
  },
  //-----------------Mouse Adding End--------------------

  //this is perfect for Headphones (pheripherals)
  {
    id: 11,
    name: 'Cosmic Byte Proteus',
    brand: 'Cosmic Byte',
    category: 'Prepherals',
    price: 24,
    image: 'https://cdns3.thecosmicbyte.com/wp-content/uploads/0-646cbcc3ee7cf.jpg',
    rating: 4,
    reviews: 156,
    inStock: true,
    description: 'Best Mouse with Gaming Grade Sensor',
    specifications: {
      sensor: 'Pixart 3395 Sensor',
      type: 'mouse',
      battery: '30+ Hours battery life',
      connectivity: 'BT, 2.4GHz or Wired',
      buttons: 'Huano switches',
      polling_rate: '1000Hz',
      Weight: '58g'
    }
  },

  {
    id: 12,
    name: ' Beluga V2 Gaming Headphones',
    brand: 'Kreo',
    category: 'Prepherals',
    price: 24,
    image: 'https://kreo-tech.com/cdn/shop/files/Artboard_3_8.png?v=1753673090&width=1000',
    rating: 4,
    reviews: 156,
    inStock: true,
    description: 'Best Mouse with Gaming Grade Sensor',
    specifications: {
      Driver: '53mm Driver',
      type: 'headphone',
      technology: 'Dual chamber',
      connectivity: 'Wired',
      comfort: 'Leatherette',
      polling_rate: '1000Hz',
      Weight: '58g'
    }
  },

]




export const categories = [
  'All Categories',
  'Processors',
  'Graphics Cards',
  'Memory',
  'Storage',
  'Motherboards',
  'Power Supplies',
  'Cooling',
  'Cabinet',
  'Prepherals'
]

export const brands = [
  'All Brands',
  'AMD',
  'Intel',
  'NVIDIA',
  'Corsair',
  'G.Skill',
  'Samsung',
  'Western Digital',
  'ASUS',
  'MSI',
  'Kreo',
  'Cosmic byte'
]