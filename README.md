# 🛒 E-Commerce Clothify

**E-Commerce Clothify**, kullanıcıların ürünleri görüntüleyip satın alabileceği, Ürünlere yorum yapabileceği, modern ve tam işlevsel bir e-ticaret web uygulamasıdır. Uygulama, kullanıcı kimlik doğrulaması, ürün yönetimi, alışveriş sepeti ve sipariş işlemleri gibi temel e-ticaret özelliklerini sunar.

🔗 [Canlı Uygulama](https://ecommerce-clothify.onrender.com)

---

## 🚀 Özellikler

- **Kullanıcı Kimlik Doğrulama**: Güvenli giriş ve kayıt işlemleri.
- **Ürün Yönetimi**: Ürünleri listeleme, detaylarını görüntüleme, filtreleme ve stok takibi.
- **Alışveriş Sepeti**: Ürünleri sepete ekleme, çıkarma ve toplam tutarı hesaplama.
- **Sipariş İşlemleri**: Sipariş oluşturma ve sipariş geçmişini görüntüleme.
- **Yorum İşlemleri**: Ürünlere yorum ekleme ve ürün derecelendirmesi.
- **Admin Panel**: Ürün ekleme, güncelleme, silme, siparişleri görüntüleme ve slide ekleme.
- **Responsive Tasarım**: Tüm cihazlarda uyumlu ve kullanıcı dostu arayüz.

---

## 🛠️ Teknoloji Yığını

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Veritabanı**: MongoDB
- **Kimlik Doğrulama**: JSON Web Tokens (JWT)
- **Durum Yönetimi**: Redux Toolkit

---

## 📁 Proje Yapısı

```
ecommerce-clothify/
├── server/
│   ├── src/
│     ├── config/
│     ├── controllers/
│     ├── helpers/
│     ├── middlewares/
│     ├── models/
│     ├── routes/
│     └── server.js
├── client/
│   ├── src/
│     ├── assets/
│     ├── components/
│     ├── config/
│     ├── lib/
│     ├── pages/
│     ├── store/
│     ├── App.jsx
│     └── main.jsx
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/omerFaruk0zkn/ecommerce-clothify.git
cd ecommerce-clothify
```

### 2. Ortam Değişkenlerini Ayarlayın

#### Backend (`/server` dizininde `.env` dosyası oluşturun):

```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_token_secret
CLIENT_URL=your_client_url
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### Frontend (`/client` dizininde `.env` dosyası oluşturun):

```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Bağımlılıkları Yükleyin ve Uygulamayı Başlatın

#### Backend:

```bash
cd server
npm install
npm run dev
```

#### Frontend:

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Test ve Geliştirme

- **Geliştirme Ortamı**: Vite ile hızlı geliştirme ve sıcak yeniden yükleme.
- **Hata Ayıklama**: Hem istemci hem de sunucu tarafında kapsamlı hata ayıklama araçları.
