# Dentiq - Mimari ve Veri Akışı (Architecture)

## 1. Teknoloji Yığını
- **Framework:** React 18+ (Vite SPA) *Not: Platform optimizasyonu gereği Vite kullanılmıştır.*
- **Styling:** Tailwind CSS v4
- **Animasyon:** GSAP & Lenis (Smooth Scroll)
- **Form & Validasyon:** React Hook Form + Zod

## 2. Geliştirme Sıralaması (Strict Feature Flow)
Yeni bir özellik eklenirken şu sıra izlenecektir:
1. **Tip Tanımı (`src/types/index.ts`):** Verinin şekli (interface/type) tanımlanır.
2. **Sabitler (`src/constants/index.ts`):** Metinler ve mock datalar eklenir.
3. **API/Servis Katmanı (`src/services/`):** Form gönderimi veya dış veri çekme işlemleri yazılır.
4. **UI Katmanı (`src/components/`):** Görsel bileşenler ve GSAP animasyonları inşa edilir.

## 3. Dizin Hiyerarşisi
```text
src/
├── components/
│   ├── ui/          # Temel, aptal (dumb) bileşenler (Button, Input)
│   └── sections/    # Sayfayı oluşturan büyük bloklar (Hero, About, Contact)
├── hooks/           # Animasyon tetikleyicileri (useGSAP), form yönetimi
├── lib/             # Yardımcı fonksiyonlar (cn, formatters)
├── constants/       # Site metinleri, iletişim bilgileri, menü linkleri
├── types/           # TypeScript arayüzleri
├── App.tsx          # Ana sayfa birleştiricisi
└── main.tsx         # Uygulama giriş noktası
```

## 4. Veri Akışı (Data Flow) - Randevu Formu
1. **Kullanıcı Girdisi:** Randevu formu (İsim, Telefon) doldurulur.
2. **İstemci Doğrulaması:** Zod ile anlık validasyon yapılır.
3. **Gönderim:** API Route / Webhook (örn. Formspree/Resend) tetiklenir.
4. **Geri Bildirim:** Kullanıcıya GSAP animasyonlu "Başarılı" mesajı gösterilir.
