// ─── Cart Management ────────────────────────────────────────────
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('nt_cart') || '[]');
    this.updateCartCount();
  }

  add(productId) {
    const existing = this.items.find((item) => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ id: productId, qty: 1 });
    }
    this.save();
    this.showToast('เพิ่มสินค้าลงตะกร้าแล้ว! 🛒');
  }

  remove(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.save();
  }

  updateQty(productId, qty) {
    const item = this.items.find((i) => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      this.save();
    }
  }

  clear() {
    this.items = [];
    this.save();
  }

  save() {
    localStorage.setItem('nt_cart', JSON.stringify(this.items));
    this.updateCartCount();
  }

  updateCartCount() {
    const count = this.items.reduce((sum, item) => sum + item.qty, 0);
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach((el) => {
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
  }

  showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed bottom-6 right-6 z-50 px-6 py-4 bg-primary-600/90 backdrop-blur-xl text-white rounded-2xl shadow-glow-lg flex items-center gap-3 animate-slide-in';
    toast.innerHTML = `
      <svg class="w-5 h-5 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <span class="font-medium text-sm">${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease-out';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

const cart = new Cart();

// Global function for onclick handlers
function addToCart(productId) {
  cart.add(productId);
}

function checkout() {
  cart.showToast('ระบบชำระเงินจะเปิดให้บริการเร็วๆ นี้! 🚧');
}

// ─── Cart Page Rendering ────────────────────────────────────────
async function renderCartPage() {
  const cartContainer = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartSummary = document.getElementById('cart-summary');

  if (!cartContainer) return; // not on cart page

  if (cart.items.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartSummary.classList.add('hidden');
    return;
  }

  cartEmpty.classList.add('hidden');
  cartSummary.classList.remove('hidden');

  // Fetch product data
  const res = await fetch('/api/products');
  const products = await res.json();

  let subtotal = 0;
  let discount = 0;
  let html = '';

  cart.items.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (!product) return;

    const itemTotal = product.price * cartItem.qty;
    subtotal += itemTotal;
    if (product.originalPrice) {
      discount += (product.originalPrice - product.price) * cartItem.qty;
    }

    html += `
    <div class="card-glass p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up">
      <img src="${product.image}" alt="${product.name}" 
           class="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl">
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="font-display font-bold text-white text-lg">${product.name}</h3>
            <span class="badge-${product.category} mt-1">${product.category}</span>
          </div>
          <button onclick="removeFromCart(${product.id})" 
                  class="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                  title="ลบรายการ">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center gap-2">
            <button onclick="updateCartQty(${product.id}, ${cartItem.qty - 1})" 
                    class="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
              −
            </button>
            <span class="w-10 text-center font-medium text-white">${cartItem.qty}</span>
            <button onclick="updateCartQty(${product.id}, ${cartItem.qty + 1})" 
                    class="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
              +
            </button>
          </div>
          <span class="font-display text-xl font-bold text-white">$${itemTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>`;
  });

  cartContainer.innerHTML = html;

  document.getElementById('cart-subtotal').textContent = `$${(subtotal + discount).toFixed(2)}`;
  document.getElementById('cart-discount').textContent = `-$${discount.toFixed(2)}`;
  document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
}

function removeFromCart(productId) {
  cart.remove(productId);
  renderCartPage();
}

function updateCartQty(productId, qty) {
  cart.updateQty(productId, qty);
  renderCartPage();
}

// ─── Mobile Menu ────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// ─── Navbar scroll effect ───────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('shadow-lg', 'shadow-dark-900/50');
    } else {
      navbar.classList.remove('shadow-lg', 'shadow-dark-900/50');
    }
    lastScroll = currentScroll;
  });
}

// ─── Intersection Observer for Animations ───────────────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-fade-in-up').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// ─── Contact Form ───────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cart.showToast('ส่งข้อความเรียบร้อยแล้ว! ขอบคุณครับ 📨');
    contactForm.reset();
  });
}

// ─── Initialize Cart Page ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
});
