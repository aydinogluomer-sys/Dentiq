# Dentiq - Proje Anayasası (Rules)

## 1. Dosya ve Bileşen Sınırları
- **Maksimum Satır:** Hiçbir dosya 150 satırı, hiçbir UI bileşeni 200 satırı geçemez.
- **Parçalama (Chunking):** Sınır aşılıyorsa mantık `hooks/` klasörüne, UI ise alt bileşenlere bölünmelidir.

## 2. State ve Veri Akışı
- **Prop Drilling:** Maksimum 3 seviye derinliğe inilebilir.
- **Global State:** 4. seviye gerekiyorsa Zustand veya Context API kullanılacaktır.

## 3. İzci Kuralı (Scout Rule) & Temiz Kod
- **Temizlik:** Dokunulan her dosyada kullanılmayan import'lar ve `console.log`'lar silinecektir.
- **Sihirli Sayılar Yok:** Tüm metinler, renk kodları ve sabitler `src/constants/` dizininden gelmelidir. Hardcoded metin yasaktır.

## 4. Tasarım ve Stil Disiplini
- **Tailwind CSS:** Tüm stillendirmeler Tailwind utility class'ları ile yapılacaktır.
- **Renkler:** Keskin siyah (`#000`) yasaktır. Yumuşak antrasit (`#1A1A1A`), soft maviler ve sıcak bejler kullanılacaktır.
- **Beyaz Boşluk (White Space):** Section'lar arası minimum `120px` (mobilde `80px`) boşluk bırakılacaktır.
- **Stok Görsel Hissi:** Yasaktır. Görseller modern, aydınlık ve güven verici olmalıdır.

## 5. Performans ve CRO (Dönüşüm Optimizasyonu)
- **Görseller:** WebP/AVIF formatında ve lazy-load edilmelidir.
- **CTA Görünürlüğü:** Randevu formu "above the fold" hariç, sayfanın her %30'luk kaydırmasında bir CTA butonu ile tetiklenebilir olmalıdır.
- **Animasyon (GSAP):** 60fps hedefiyle, sadece `transform` ve `opacity` özellikleri anime edilecek. `will-change` sadece animasyon sırasında aktif olacaktır.
