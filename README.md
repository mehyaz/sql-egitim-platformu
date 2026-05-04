# SQL Öğreniyorum - Eğitim Platformu 🗃️

Türkçe, interaktif, tarayıcı tabanlı SQL öğrenme platformu. Sıfırdan ileri seviyeye SQL'i pratik yaparak, anında geri bildirim alarak öğrenin.

## 🌐 Canlı Demo

**[https://sqlogreniyorum.web.app](https://sqlogreniyorum.web.app)**

## ✨ Özellikler

- **Geniş Kapsamlı Müfredat** — 3 seviyede (Başlangıç, Orta, İleri) yapılandırılmış, 30'dan fazla alıştırma.
- **Gerçek Zamanlı SQL Motoru** — Tarayıcıda `sql.js` (SQLite WebAssembly) ile harici bir sunucuya ihtiyaç duymadan hızlı SQL çalıştırma.
- **3 Gerçekçi Veritabanı** — Okul, E-Ticaret ve Kütüphane senaryolarına özel tablolar ve veriler üzerinde pratik yapma.
- **Akıllı İlerleme Takibi** — 
  - **Yeşil Tik (✓)**: Soruyu tamamen kendi başınıza çözdüğünüzde kazanırsınız.
  - **Sarı Tik (✓)**: Eğitmenden veya "Çözümü Göster" butonundan yardım alarak çözdüğünüzde kazanırsınız. Yardım alarak çözdükten sonra tekrar kendi başınıza çözerseniz Sarı Tik, Yeşil Tik'e dönüşür!
- **Bulut Senkronizasyonu (Yeni!)** — Firebase Authentication ile kayıt/giriş yapın ve ilerlemenizi bulutta saklayın. Farklı cihazlardan eğitiminize kaldığınız yerden devam edin.
- **Gelişmiş İpucu ve Çözüm Sistemi** — Takıldığınız yerde adım adım ipuçları ve detaylı çözümler.
- **SQL Playground** — Serbest SQL sorguları çalıştırabileceğiniz, veritabanı tablolarının şemasını inceleyebileceğiniz özel kum havuzu.
- **Platform Denetim Aracı (Audit)** — Platformdaki tüm derslerin, çözüm sorgularının ve veri bütünlüğünün otomatik test edildiği dahili test sistemi (`audit.html`).

## 🛠 Teknoloji Yığını

| Bileşen | Teknoloji |
|---------|-----------|
| **SQL Motoru** | `sql.js` v1.12.0 (SQLite WebAssembly) |
| **Arayüz** | Vanilla HTML, CSS, JavaScript |
| **Veritabanı (Bulut)** | Firebase Firestore |
| **Kimlik Doğrulama** | Firebase Auth |
| **Hosting** | Firebase Hosting |

## 🏗 Mimari ve Çalışma Mantığı

Uygulamanın büyük bir kısmı istemci tarafında (client-side) çalışır ve sunucu yükünü minimize eder:

1. **İstemci Taraflı Veritabanı**: SQL sorguları tarayıcıda WebAssembly (WASM) kullanılarak çalıştırılır.
2. **Durum Yönetimi (State)**: Öğrencilerin veritabanı üzerinde yaptığı değişiklikler (INSERT, UPDATE, vb.) bir sonraki derste sıfırlanır (`DatabaseEngine.resetDatabase()`). Böylece hiçbir ders birbirinin verisini veya "UNIQUE" kısıtlamalarını bozmaz.
3. **Senkronizasyon**: İlerleme önce localStorage'a kaydedilir, oturum açılmışsa eş zamanlı olarak Firebase Firestore'a gönderilir (`AuthModule.saveProgressToCloud()`).

## 🚀 Yerel Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için:

```bash
# Projeyi klonlayın
git clone https://github.com/meyaz/sql-egitim-platformu.git
cd sql-egitim-platformu

# Herhangi bir HTTP sunucusu ile çalıştırın
python3 -m http.server 8080
# veya Node.js ile
npx serve .
```

Tarayıcıda `http://localhost:8080` adresini açın. Test sistemini çalıştırmak için `http://localhost:8080/audit.html` adresine gidebilirsiniz.

## 📚 Müfredat

Müfredat, SQL öğrenimini en temelden ileri seviye ilişkilere kadar kapsar:

### Başlangıç
- Veri Türleri ve Tablo Oluşturma
- Tablolara Veri Girişi (`INSERT INTO`)
- Temel Seçim Sorguları (`SELECT`)

### Orta
- Karşılaştırma ve Mantıksal Operatörler
- Filtreleme (`WHERE`)
- Hesaplama Fonksiyonları ve Patern Eşleştirme (`LIKE`)
- Veri Güncelleme ve Silme (`UPDATE`, `DELETE`)
- Sıralama (`ORDER BY`)

### İleri
- İlişkisel Veritabanı Tasarımı
- Tablolar Arası İlişkiler ve Birleştirme (`JOIN` işlemleri)
- İlişkisel Tablolara Veri Ekleme ve Gelişmiş Sorgular

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Serbestçe kullanılabilir, değiştirilebilir ve dağıtılabilir.
