require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const initialProducts = [
  {
    name: 'Advanced Police System',
    category: 'script',
    price: 29.99,
    originalPrice: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    description: 'ระบบตำรวจขั้นสูงสำหรับ FiveM พร้อมระบบ MDT, จัดการอุปกรณ์, และระบบแจ้งเตือน',
    features: ['MDT System', 'Equipment Management', 'Alert System', 'ESX/QBCore Compatible'],
    badge: 'HOT',
    rating: 4.8,
    reviews: 124,
    stock: 999
  },
  {
    name: 'Luxury Car Pack Vol.1',
    category: 'prop',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    description: 'แพ็ครถหรู 10 คัน คุณภาพสูง ปรับแต่ง LOD สำหรับ FiveM โดยเฉพาะ',
    features: ['10 Luxury Vehicles', 'High Quality Models', 'Optimized LODs', 'Custom Handling'],
    rating: 4.6,
    reviews: 89,
    stock: 999
  },
  {
    name: 'City Life Map Pack',
    category: 'map',
    price: 39.99,
    originalPrice: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    description: 'แพ็คแมปเมือง สร้างสรรค์สำหรับ Roleplay รวมคาเฟ่ ร้านอาหาร ห้างสรรพสินค้า',
    features: ['5 Interior Maps', 'Optimized Performance', 'Custom Props', 'Easy Installation'],
    badge: 'SALE',
    rating: 4.9,
    reviews: 203,
    stock: 999
  },
  {
    name: 'Drug System Pro',
    category: 'script',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    description: 'ระบบยาเสพติดแบบครบวงจร ตั้งแต่ปลูก แปรรูป จนถึงขาย พร้อมระบบ AI NPC',
    features: ['Growing System', 'Processing', 'AI NPCs', 'Anti-Cheat Built-in'],
    badge: 'NEW',
    rating: 4.7,
    reviews: 67,
    stock: 999
  },
  {
    name: 'Custom Weapon Pack',
    category: 'prop',
    price: 14.99,
    originalPrice: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&h=400&fit=crop',
    description: 'แพ็คอาวุธคัสตอม 15 ชิ้น พร้อมเท็กเจอร์ HD และเอฟเฟกต์สมจริง',
    features: ['15 Custom Weapons', 'HD Textures', 'Realistic Effects', 'Custom Sounds'],
    badge: 'SALE',
    rating: 4.5,
    reviews: 156,
    stock: 999
  },
  {
    name: 'Hospital Interior',
    category: 'map',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    description: 'อินทีเรียโรงพยาบาลสมบูรณ์ พร้อมห้องฉุกเฉิน ห้องผ่าตัด ล็อบบี้',
    features: ['Full Hospital', 'Emergency Room', 'Surgery Room', 'Lobby & Parking'],
    rating: 4.8,
    reviews: 91,
    stock: 999
  },
  {
    name: 'Racing System',
    category: 'script',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    description: 'ระบบแข่งรถครบวงจร สร้างเส้นทาง วางเดิมพัน ลีดเดอร์บอร์ด ทั้งหมดในสคริปต์เดียว',
    features: ['Route Creator', 'Betting System', 'Leaderboard', 'Multi-Framework'],
    badge: 'NEW',
    rating: 4.9,
    reviews: 45,
    stock: 999
  },
  {
    name: 'Anime Vehicle Pack',
    category: 'prop',
    price: 22.99,
    originalPrice: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    description: 'แพ็ครถสไตล์อนิเมะ 8 คัน พร้อมเอฟเฟกต์พิเศษ ไฟนีออน พร้อมใช้งาน',
    features: ['8 Anime Cars', 'Neon Effects', 'Custom Liveries', 'Sound Pack'],
    rating: 4.4,
    reviews: 78,
    stock: 999
  },
  {
    name: 'Underground Club Map',
    category: 'map',
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=400&fit=crop',
    description: 'แมปไนท์คลับใต้ดิน บรรยากาศสุดมันส์ พร้อมไฟ LED DJ Booth บาร์',
    features: ['DJ Booth', 'LED Lighting', 'Bar Area', 'VIP Section'],
    badge: 'HOT',
    rating: 4.7,
    reviews: 112,
    stock: 999
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clear existing
    console.log('Cleared existing products');
    
    await Product.insertMany(initialProducts);
    console.log('Successfully seeded products!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
