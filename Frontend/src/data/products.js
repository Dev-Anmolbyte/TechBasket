// Sample product data for the TechBasket frontend

const USD_TO_INR =83.5;


export const products = [
  {
    id: 1,
    name: 'AMD Ryzen 9 7900X',
    brand: 'AMD',
    category: 'Processors',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=300&fit=crop',
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
    name: 'Intel Core i7-13700K',
    brand: 'Intel',
    category: 'Processors',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
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
  {
    id: 3,
    name: 'NVIDIA GeForce RTX 4080',
    brand: 'NVIDIA',
    category: 'Graphics Cards',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
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
  {
    id: 5,
    name: 'Corsair Vengeance RGB Pro 32GB',
    brand: 'Corsair',
    category: 'Memory',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc04fe9b37?w=400&h=300&fit=crop',
    rating: 5,
    reviews: 89,
    inStock: true,
    description: 'High-performance DDR4 memory with RGB lighting',
    specifications: {
      capacity: '32GB (2x16GB)',
      type: 'DDR4',
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
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop',
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
  {
    id: 7,
    name: 'Samsung 980 PRO 2TB',
    brand: 'Samsung',
    category: 'Storage',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
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
    name: 'WD Black SN770 1TB',
    brand: 'Western Digital',
    category: 'Storage',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
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
  {
    id: 9,
    name: 'WD Black SN770 1TB',
    brand: 'Western Digital',
    category: 'Storage',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
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
  {
    id: 10,
    name: 'Intel Core i7-13700K',
    brand: 'Intel',
    category: 'Processors',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
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
  }
]




export const categories = [
  'All Categories',
  'Processors',
  'Graphics Cards',
  'Memory',
  'Storage',
  'Motherboards',
  'Power Supplies',
  'Cooling'
]

export const brands = [
  'All Brands',
  'AMD',
  'Intel',
  'NVIDIA',
  'Corsair',
  'G.Skill',
  'Samsung',
  'Western Digital'
]