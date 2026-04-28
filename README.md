# SQL Eğitim Platformu 🗃️

Türkçe, interaktif, tarayıcı tabanlı SQL öğrenme platformu. Sıfırdan ileri seviyeye SQL öğrenin.

## 🌐 Canlı Demo

**[https://mehyaz.github.io/sql-egitim-platformu/](https://mehyaz.github.io/sql-egitim-platformu/)**

## ✨ Özellikler

- **42+ Alıştırma** — 3 seviyede yapılandırılmış müfredat (Başlangıç, Orta, İleri)
- **3 Örnek Veritabanı** — Okul, E-Ticaret, Kütüphane
- **Gerçek SQL Çalıştırma** — Tarayıcıda sql.js (SQLite WebAssembly) ile
- **SQL Playground** — Serbest SQL sorgu çalıştırma modu
- **İlerleme Takibi** — localStorage ile otomatik kayıt
- **İpucu ve Çözüm** — Her alıştırmada yardım sistemi
- **Şema Gezgini** — Tablo yapılarını görüntüleme
- **Responsive Tasarım** — Masaüstü ve mobilde çalışır

## 🛠 Teknoloji

| Bileşen | Teknoloji |
|---------|-----------|
| SQL Motoru | sql.js v1.12.0 (SQLite WebAssembly) |
| Arayüz | Vanilla HTML/CSS/JavaScript |
| Font | Inter (Google Fonts) |
| Hosting | GitHub Pages |
| Dağıtım | GitHub Actions |

## 🏗 Mimari

Tamamen istemci taraflı (client-side) statik uygulama. Sunucu tarafı işlem yok.

- SQL sorguları tarayıcıda WebAssembly ile çalıştırılır
- Veritabanları sayfa yüklendiğinde bellekte oluşturulur
- İlerleme localStorage'da saklanır
- Tüm bağımlılıklar CDN üzerinden yüklenir

## 🚀 Yerel Çalıştırma

```bash
# Projeyi klonlayın
git clone https://github.com/meyaz/sql-egitim-platformu.git
cd sql-egitim-platformu

# Herhangi bir HTTP sunucusu ile çalıştırın
python3 -m http.server 8080
# veya
npx serve .
```

Tarayıcıda `http://localhost:8080` adresini açın.

## 📚 Müfredat

21 zorunlu konu, 3 seviyede:

### Başlangıç
1. Veri Türleri
2. Veri Tabanı Oluşturma
3. Anahtarlar ve İndeksler
4. Tablo İşlemleri
5. Tablo Oluşturma
6. Tablolara Veri Girişi
7. INSERT INTO Komutu
8. SELECT Komutu

### Orta
9. Karşılaştırma Operatörleri
10. WHERE Şart İfadesi
11. Mantıksal Operatörler
12. Hesaplama Fonksiyonları
13. LIKE Komutu
14. ORDER BY Komutu
15. UPDATE Komutu
16. DELETE Komutu

### İleri
17. İlişkisel Veri Tabanı
18. İlişkisel VT Tasarımı
19. Tablolar Arası İlişkiler
20. İlişkisel VT Veri Girişi
21. İlişkisel VT Sorgular

## 📄 Lisans

MIT
