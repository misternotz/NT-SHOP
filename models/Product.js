const products = [
  {
    id: 1,
    name: 'Advanced Police System',
    category: 'script',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    description: 'ระบบตำรวจขั้นสูงสำหรับ FiveM พร้อมระบบ MDT, จัดการอุปกรณ์, และระบบแจ้งเตือน',
    features: ['MDT System', 'Equipment Management', 'Alert System', 'ESX/QBCore Compatible'],
    badge: 'HOT',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Luxury Car Pack Vol.1',
    category: 'prop',
    price: 19.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    description: 'แพ็ครถหรู 10 คัน คุณภาพสูง ปรับแต่ง LOD สำหรับ FiveM โดยเฉพาะ',
    features: ['10 Luxury Vehicles', 'High Quality Models', 'Optimized LODs', 'Custom Handling'],
    badge: null,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: 'City Life Map Pack',
    category: 'map',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    description: 'แพ็คแมปเมือง สร้างสรรค์สำหรับ Roleplay รวมคาเฟ่ ร้านอาหาร ห้างสรรพสินค้า',
    features: ['5 Interior Maps', 'Optimized Performance', 'Custom Props', 'Easy Installation'],
    badge: 'SALE',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 4,
    name: 'Drug System Pro',
    category: 'script',
    price: 24.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    description: 'ระบบยาเสพติดแบบครบวงจร ตั้งแต่ปลูก แปรรูป จนถึงขาย พร้อมระบบ AI NPC',
    features: ['Growing System', 'Processing', 'AI NPCs', 'Anti-Cheat Built-in'],
    badge: 'NEW',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 5,
    name: 'Custom Weapon Pack',
    category: 'prop',
    price: 14.99,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&h=400&fit=crop',
    description: 'แพ็คอาวุธคัสตอม 15 ชิ้น พร้อมเท็กเจอร์ HD และเอฟเฟกต์สมจริง',
    features: ['15 Custom Weapons', 'HD Textures', 'Realistic Effects', 'Custom Sounds'],
    badge: 'SALE',
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 6,
    name: 'Hospital Interior',
    category: 'map',
    price: 19.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'อินทีเรียโรงพยาบาลสมบูรณ์ พร้อมห้องฉุกเฉิน ห้องผ่าตัด ล็อบบี้',
    features: ['Full Hospital', 'Emergency Room', 'Surgery Room', 'Lobby & Parking'],
    badge: null,
    rating: 4.8,
    reviews: 91,
  },
  {
    id: 7,
    name: 'Racing System',
    category: 'script',
    price: 34.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    description: 'ระบบแข่งรถครบวงจร สร้างเส้นทาง วางเดิมพัน ลีดเดอร์บอร์ด ทั้งหมดในสคริปต์เดียว',
    features: ['Route Creator', 'Betting System', 'Leaderboard', 'Multi-Framework'],
    badge: 'NEW',
    rating: 4.9,
    reviews: 45,
  },
  {
    id: 8,
    name: 'Anime Vehicle Pack',
    category: 'prop',
    price: 22.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    description: 'แพ็ครถสไตล์อนิเมะ 8 คัน พร้อมเอฟเฟกต์พิเศษ ไฟนีออน พร้อมใช้งาน',
    features: ['8 Anime Cars', 'Neon Effects', 'Custom Liveries', 'Sound Pack'],
    badge: null,
    rating: 4.4,
    reviews: 78,
  },
  {
    id: 9,
    name: 'Underground Club Map',
    category: 'map',
    price: 15.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=400&fit=crop',
    description: 'แมปไนท์คลับใต้ดิน บรรยากาศสุดมันส์ พร้อมไฟ LED DJ Booth บาร์',
    features: ['DJ Booth', 'LED Lighting', 'Bar Area', 'VIP Section'],
    badge: 'HOT',
    rating: 4.7,
    reviews: 112,
  },
];

class Product {
  static getAll() {
    return products;
  }

  static getById(id) {
    return products.find((p) => p.id === parseInt(id));
  }

  static getByCategory(category) {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  }

  static search(query, productsArray = products) {
    if (!query) return productsArray;
    const lowerQuery = query.toLowerCase();
    return productsArray.filter((p) => p.name.toLowerCase().includes(lowerQuery));
  }
}

module.exports = Product;
