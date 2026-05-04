// ========== BEGINNER CURRICULUM (MEB Müfredatı Sayfa 213-232) ==========
const BeginnerLessons = [
    // ===== KONU 1: VERİ TÜRLERİ =====
    {
        id: "1.1", topicId: 1, level: "beginner",
        title: "Veri Türleri — Giriş",
        topicTitle: "Veri Türleri",
        description: `SQL'de (MySQL) veriler farklı türlerde saklanır. Sık kullanılan veri türleri:<br><br>
<strong>Metin Türleri:</strong><br>
• <code>char(n)</code> — Uzunluğu değişmeyen sabit metinler.<br>
• <code>varchar(n)</code> — Değişebilir uzunluktaki metinler (En fazla n karakter).<br>
• <code>text</code> — Değişebilir uzunluktaki çok uzun metinler.<br><br>
<strong>Sayısal Türler:</strong><br>
• <code>int</code> — Tam sayılar (-2.147 milyar ile +2.147 milyar arası).<br>
• <code>bigint</code> — Çok büyük tam sayılar.<br>
• <code>float</code> — Ondalıklı sayılar.<br>
• <code>decimal(M,D)</code> — Hassas ondalık (M toplam basamak, D virgülden sonraki kısım).<br><br>
<strong>Tarih Türleri:</strong><br>
• <code>date</code> — Sadece tarih (YYYY-MM-DD).<br>
• <code>datetime</code> — Tarih ve saat.<br><br>
<em>💡 Not: Bu eğitim platformu tarayıcıda çalıştığı için arka planda SQLite motorunu kullanır. SQLite, <code>varchar</code>, <code>int</code>, <code>float</code> gibi tüm standart SQL veri türlerini kabul eder ve sorunsuz çalıştırır.</em>`,
        task: "Öğrenciler tablosunun yapısını inceleyin. Her sütunun veri türünü gözlemleyin.",
        database: "okul",
        initialCode: "PRAGMA table_info('ogrenciler');",
        hints: ["PRAGMA table_info komutu tablo yapısını gösterir.", "'type' sütununa dikkat edin."],
        solution: "PRAGMA table_info('ogrenciler');",
        checkType: "run-only"
    },
    {
        id: "1.2", topicId: 1, level: "beginner",
        title: "Veri Türleri — INT ve VARCHAR",
        topicTitle: "Veri Türleri",
        description: `<code>int</code> tam sayı türüdür. Yaş, numara, stok adedi gibi değerler için kullanılır.<br><br>
<code>varchar(n)</code> değişken uzunluklu metin türüdür. İsim, adres, e-posta gibi metinler için kullanılır. (Örneğin: <code>varchar(50)</code> en fazla 50 karakter alır).<br><br>
Örnek: <code>yas int</code>, <code>ad varchar(50)</code><br>
Tablo oluştururken her sütuna doğru türü atamak çok önemlidir.`,
        task: "'kisiler' tablosu oluşturun: kisi_id (int), ad (varchar(50)), soyad (varchar(50)), yas (int).",
        database: "okul",
        initialCode: "",
        hints: ["CREATE TABLE kisiler (...); şeklinde yazın.", "Her sütunu virgülle ayırın."],
        solution: "CREATE TABLE kisiler (\n  kisi_id int,\n  ad varchar(50),\n  soyad varchar(50),\n  yas int\n);",
        checkType: "structure", checkTable: "kisiler", checkColumns: ["kisi_id", "ad", "soyad", "yas"]
    },
    {
        id: "1.3", topicId: 1, level: "beginner",
        title: "Veri Türleri — FLOAT, DECIMAL ve DATE",
        topicTitle: "Veri Türleri",
        description: `<code>float</code> ondalıklı sayı türüdür. <code>decimal</code> ise özellikle para birimleri gibi hassasiyet gerektiren yerlerde kullanılır (Örn: <code>decimal(5,2)</code> 999.99 şeklinde değer tutar).<br><br>
<code>date</code> tarih türüdür ve <code>'YYYY-MM-DD'</code> formatında değer saklar.<br><br>
Örnek: <code>fiyat decimal(10,2)</code>, <code>kayit_tarihi date</code>`,
        task: "'urun_bilgi' tablosu oluşturun: urun_id (int), urun_adi (varchar(100)), fiyat (decimal(8,2)), eklenme_tarihi (date).",
        database: "eticaret",
        initialCode: "",
        hints: ["CREATE TABLE urun_bilgi (sütun1 TÜR, sütun2 TÜR, ...);", "fiyat sütunu decimal(8,2) olmalı."],
        solution: "CREATE TABLE urun_bilgi (\n  urun_id int,\n  urun_adi varchar(100),\n  fiyat decimal(8,2),\n  eklenme_tarihi date\n);",
        checkType: "structure", checkTable: "urun_bilgi", checkColumns: ["urun_id", "urun_adi", "fiyat", "eklenme_tarihi"]
    },
    // ===== KONU 2: VERİ TABANI OLUŞTURMA =====
    {
        id: "2.1", topicId: 2, level: "beginner",
        title: "Veri Tabanı Oluşturma — Tabloları Keşfet",
        topicTitle: "Veri Tabanı Oluşturma",
        description: `Veritabanı, birbiriyle ilişkili tabloların saklandığı yapıdır.<br><br>
<strong>Not:</strong> SQLite'da her dosya bir veritabanıdır. Bu platformda 3 hazır veritabanı bulunmaktadır: Okul, E-Ticaret ve Kütüphane.`,
        task: "Okul veritabanındaki tüm tabloları listeleyin.",
        database: "okul",
        initialCode: "",
        hints: ["sqlite_master tablosundan bilgi alabilirsiniz.", "SELECT name FROM sqlite_master WHERE type='table';"],
        solution: "SELECT name FROM sqlite_master WHERE type='table';",
        checkType: "contains-value", checkValue: "ogrenciler"
    },
    {
        id: "2.2", topicId: 2, level: "beginner",
        title: "Veri Tabanı Oluşturma — Tablo Yapısı İnceleme",
        topicTitle: "Veri Tabanı Oluşturma",
        description: `Bir tablonun yapısını incelemek için <code>PRAGMA table_info</code> kullanılır. Bu komut sütun adlarını, türlerini ve kısıtlamalarını gösterir.`,
        task: "E-Ticaret veritabanındaki 'urunler' tablosunun yapısını inceleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["PRAGMA table_info('tablo_adi'); komutunu kullanın.", "Tablo adı 'urunler' dir."],
        solution: "PRAGMA table_info('urunler');",
        checkType: "run-only"
    },
    // ===== KONU 3: ANAHTARLAR VE İNDEKSLER =====
    {
        id: "3.1", topicId: 3, level: "beginner",
        title: "Anahtarlar — PRIMARY KEY",
        topicTitle: "Anahtarlar ve İndeksler",
        description: `<code>PRIMARY KEY</code> (Birincil Anahtar), tablodaki her satırı benzersiz olarak tanımlar.<br><br>
• Her tabloda yalnızca bir PK olabilir<br>
• PK değeri tekrar edemez ve NULL olamaz<br>
• Genellikle <code>id</code> veya <code>numara</code> gibi sütunlar için kullanılır`,
        task: "'kitap' tablosu oluşturun: kitap_id (int PRIMARY KEY), baslik (varchar(100) NOT NULL), yazar (varchar(50)), sayfa (int).",
        database: "okul",
        initialCode: "CREATE TABLE kitap (\n  \n);",
        hints: ["PRIMARY KEY ifadesini sütun tanımından sonra yazın.", "kitap_id int PRIMARY KEY şeklinde tanımlayın."],
        solution: "CREATE TABLE kitap (\n  kitap_id int PRIMARY KEY,\n  baslik varchar(100) NOT NULL,\n  yazar varchar(50),\n  sayfa int\n);",
        checkType: "structure", checkTable: "kitap", checkColumns: ["kitap_id", "baslik", "yazar", "sayfa"]
    },
    {
        id: "3.2", topicId: 3, level: "beginner",
        title: "Anahtarlar — FOREIGN KEY",
        topicTitle: "Anahtarlar ve İndeksler",
        description: `<code>FOREIGN KEY</code> (Yabancı Anahtar), bir tablodaki sütunun başka bir tablonun PRIMARY KEY'ine referans vermesidir. Tablolar arası ilişki kurar.`,
        task: "Öğrenciler tablosunda hangi sütunun FOREIGN KEY olduğunu bulun.",
        database: "okul",
        initialCode: "",
        hints: ["PRAGMA foreign_key_list('tablo_adi'); şeklinde yazılır.", "Öğrenciler tablosunun yabancı anahtarlarını kontrol edin."],
        solution: "PRAGMA foreign_key_list('ogrenciler');",
        checkType: "run-only"
    },
    {
        id: "3.3", topicId: 3, level: "beginner",
        title: "Anahtarlar — İndeksler",
        topicTitle: "Anahtarlar ve İndeksler",
        description: `<code>INDEX</code> (İndeks), sorgu performansını artırmak için kullanılır. Sık aranan sütunlara indeks eklenir.<br><br>
<code>CREATE INDEX indeks_adi ON tablo(sutun);</code>`,
        task: "Öğrenciler tablosunun 'sehir' sütununa 'idx_sehir' adında bir indeks oluşturun.",
        database: "okul",
        initialCode: "",
        hints: ["CREATE INDEX idx_sehir ON ogrenciler(sehir);", "İndeks oluşturuldıktan sonra sorgu daha hızlı çalışır."],
        solution: "CREATE INDEX idx_sehir ON ogrenciler(sehir);",
        checkType: "run-only"
    },
    // ===== KONU 4: TABLO İŞLEMLERİ =====
    {
        id: "4.1", topicId: 4, level: "beginner",
        title: "Tablo İşlemleri — ALTER TABLE (Sütun Ekleme)",
        topicTitle: "Tablo İşlemleri",
        description: `Mevcut tabloya yeni sütun eklemek için <code>ALTER TABLE</code> kullanılır:<br><br>
<code>ALTER TABLE tablo_adi ADD COLUMN yeni_sutun TÜR;</code>`,
        task: "Öğrenciler tablosuna 'telefon' adında varchar(20) türünde yeni bir sütun ekleyin.",
        database: "okul",
        initialCode: "",
        hints: ["ALTER TABLE ogrenciler ADD COLUMN ... şeklinde başlayın.", "Sütun adı 'telefon' ve türü TEXT olmalı."],
        solution: "ALTER TABLE ogrenciler ADD COLUMN telefon varchar(20);",
        checkType: "structure-contains", checkTable: "ogrenciler", checkColumns: ["telefon"]
    },
    {
        id: "4.2", topicId: 4, level: "beginner",
        title: "Tablo İşlemleri — ALTER TABLE (Tablo Adı Değiştirme)",
        topicTitle: "Tablo İşlemleri",
        description: `Tablo adını değiştirmek için:<br><br>
<code>ALTER TABLE eski_ad RENAME TO yeni_ad;</code>`,
        task: "Önce 'deneme' adında bir tablo oluşturun (id int, veri varchar(100)), sonra adını 'test_tablo' olarak değiştirin.",
        database: "okul",
        initialCode: "CREATE TABLE deneme (id int, veri varchar(100));\n\n-- Tabloyu yeniden adlandırın:\n",
        hints: ["ALTER TABLE deneme RENAME TO test_tablo;", "İki komutu alt alta yazın."],
        solution: "CREATE TABLE deneme (id int, veri varchar(100));\nALTER TABLE deneme RENAME TO test_tablo;",
        checkType: "structure", checkTable: "test_tablo", checkColumns: ["id", "veri"]
    },
    {
        id: "4.3", topicId: 4, level: "beginner",
        title: "Tablo İşlemleri — DROP TABLE",
        topicTitle: "Tablo İşlemleri",
        description: `Bir tabloyu tamamen silmek için <code>DROP TABLE</code> kullanılır:<br><br>
<code>DROP TABLE tablo_adi;</code><br><br>
⚠️ <strong>Dikkat:</strong> Bu işlem geri alınamaz! Tüm veriler silinir.`,
        task: "Önce 'gecici_tablo' oluşturun (id int, veri varchar(100)), sonra DROP TABLE ile silin.",
        database: "okul",
        initialCode: "CREATE TABLE gecici_tablo (id int, veri varchar(100));\n\n-- Tabloyu silin:\n",
        hints: ["İki SQL komutunu alt alta yazın.", "DROP TABLE gecici_tablo;"],
        solution: "CREATE TABLE gecici_tablo (id int, veri varchar(100));\nDROP TABLE gecici_tablo;",
        checkType: "run-only"
    },
    // ===== KONU 5: TABLO OLUŞTURMA =====
    {
        id: "5.1", topicId: 5, level: "beginner",
        title: "Tablo Oluşturma — CREATE TABLE",
        topicTitle: "Tablo Oluşturma",
        description: `Yeni tablo oluşturmak için <code>CREATE TABLE</code> kullanılır:<br><br>
<code>CREATE TABLE tablo_adi (<br>&nbsp;&nbsp;sutun1 TÜR,<br>&nbsp;&nbsp;sutun2 TÜR<br>);</code>`,
        task: "'ogrenci' tablosu oluşturun: ogrenci_no (int PRIMARY KEY), ad (varchar(50)), soyad (varchar(50)), sinif (int).",
        database: "okul",
        initialCode: "",
        hints: ["CREATE TABLE ogrenci ( ... ); şeklinde başlayın.", "Son sütundan sonra virgül koymayın."],
        solution: "CREATE TABLE ogrenci (\n  ogrenci_no int PRIMARY KEY,\n  ad varchar(50),\n  soyad varchar(50),\n  sinif int\n);",
        checkType: "structure", checkTable: "ogrenci", checkColumns: ["ogrenci_no", "ad", "soyad", "sinif"]
    },
    {
        id: "5.2", topicId: 5, level: "beginner",
        title: "Tablo Oluşturma — NOT NULL Kısıtlaması",
        topicTitle: "Tablo Oluşturma",
        description: `<code>NOT NULL</code> kısıtlaması, sütunun boş bırakılamayacağını belirtir:<br><br>
<code>ad varchar(50) NOT NULL</code> → Bu sütun mutlaka doldurulmalıdır.`,
        task: "'personel' tablosu oluşturun: personel_id (int PRIMARY KEY), ad (varchar(50) NOT NULL), soyad (varchar(50) NOT NULL), departman (varchar(50)).",
        database: "okul",
        initialCode: "",
        hints: ["NOT NULL ifadesini türden sonra yazın.", "ad varchar(50) NOT NULL şeklinde."],
        solution: "CREATE TABLE personel (\n  personel_id int PRIMARY KEY,\n  ad varchar(50) NOT NULL,\n  soyad varchar(50) NOT NULL,\n  departman varchar(50)\n);",
        checkType: "structure", checkTable: "personel", checkColumns: ["personel_id", "ad", "soyad", "departman"]
    },
    {
        id: "5.3", topicId: 5, level: "beginner",
        title: "Tablo Oluşturma — DEFAULT ve UNIQUE",
        topicTitle: "Tablo Oluşturma",
        description: `Diğer kısıtlamalar:<br><br>
• <code>UNIQUE</code> — Tekrar edemez<br>
• <code>DEFAULT değer</code> — Varsayılan değer atar<br>
• <code>CHECK(koşul)</code> — Koşul kontrolü`,
        task: "'urun' tablosu oluşturun: urun_id (int PRIMARY KEY), urun_adi (varchar(100) NOT NULL), fiyat (decimal(10,2) NOT NULL), stok (int DEFAULT 0).",
        database: "eticaret",
        initialCode: "",
        hints: ["DEFAULT kelimesini stok sütununda kullanın.", "stok int DEFAULT 0"],
        solution: "CREATE TABLE urun (\n  urun_id int PRIMARY KEY,\n  urun_adi varchar(100) NOT NULL,\n  fiyat decimal(10,2) NOT NULL,\n  stok int DEFAULT 0\n);",
        checkType: "structure", checkTable: "urun", checkColumns: ["urun_id", "urun_adi", "fiyat", "stok"]
    },
    // ===== KONU 6: TABLOLARA VERİ GİRİŞİ =====
    {
        id: "6.1", topicId: 6, level: "beginner",
        title: "Tablolara Veri Girişi — Tüm Sütunlar",
        topicTitle: "Tablolara Veri Girişi",
        description: `Tablolara veri eklemek için <code>INSERT INTO</code> kullanılır:<br><br>
Tüm sütunlara veri girme:<br>
<code>INSERT INTO tablo VALUES (değer1, değer2, ...);</code>`,
        task: "Öğrenciler tablosuna yeni bir öğrenci ekleyin: ID 51, ad 'Ahmet', soyad 'Güneş', doğum tarihi '2002-05-10', şehir 'Konya', bölüm ID 1.",
        database: "okul",
        initialCode: "",
        hints: ["INSERT INTO ogrenciler VALUES (...); şeklinde yazın.", "Metin değerleri tek tırnak içinde yazılır."],
        solution: "INSERT INTO ogrenciler VALUES (51, 'Ahmet', 'Güneş', '2002-05-10', 'Konya', 1);",
        checkType: "contains-value", checkQuery: "SELECT * FROM ogrenciler WHERE ogrenci_id = 51;", checkValue: "Ahmet"
    },
    {
        id: "6.2", topicId: 6, level: "beginner",
        title: "Tablolara Veri Girişi — Belirli Sütunlar",
        topicTitle: "Tablolara Veri Girişi",
        description: `Belirli sütunlara veri girme:<br>
<code>INSERT INTO tablo (sütun1, sütun2) VALUES (değer1, değer2);</code><br><br>
Belirtilmeyen sütunlar NULL veya DEFAULT değerini alır.`,
        task: "Müşteriler tablosuna sadece ad, soyad ve şehir belirterek müşteri ekleyin: musteri_id 101, ad 'Yasemin', soyad 'Çiçek', şehir 'Eskişehir'.",
        database: "eticaret",
        initialCode: "",
        hints: ["INSERT INTO musteriler (musteri_id, ad, soyad, sehir) VALUES (...);", "email ve telefon NULL olacak."],
        solution: "INSERT INTO musteriler (musteri_id, ad, soyad, sehir) VALUES (101, 'Yasemin', 'Çiçek', 'Eskişehir');",
        checkType: "contains-value", checkQuery: "SELECT * FROM musteriler WHERE musteri_id = 101;", checkValue: "Yasemin"
    },
    // ===== KONU 7: INSERT INTO KOMUTU =====
    {
        id: "7.1", topicId: 7, level: "beginner",
        title: "INSERT INTO — Temel Kullanım",
        topicTitle: "INSERT INTO Komutu",
        description: `<code>INSERT INTO</code> komutunun temel kullanımı:<br><br>
<code>INSERT INTO tablo_adi (sütun1, sütun2) VALUES (değer1, değer2);</code><br><br>
Metin değerleri <strong>tek tırnak</strong> içinde, sayısal değerler doğrudan yazılır.`,
        task: "Yazarlar tablosuna yeni bir yazar ekleyin: yazar_id 20, ad 'Nazım', soyad 'Hikmet', ulke 'Türkiye'.",
        database: "kutuphane",
        initialCode: "",
        hints: ["INSERT INTO yazarlar VALUES (...); şeklinde yazın.", "Metin değerlerini tek tırnak içinde yazın."],
        solution: "INSERT INTO yazarlar VALUES (20, 'Nazım', 'Hikmet', 'Türkiye');",
        checkType: "contains-value", checkQuery: "SELECT * FROM yazarlar WHERE yazar_id = 20;", checkValue: "Nazım"
    },
    {
        id: "7.2", topicId: 7, level: "beginner",
        title: "INSERT INTO — Çoklu Kayıt Ekleme",
        topicTitle: "INSERT INTO Komutu",
        description: `Birden fazla kayıt eklemek için her VALUES grubunu virgülle ayırın:<br><br>
<code>INSERT INTO tablo VALUES<br>&nbsp;&nbsp;(değer1, değer2),<br>&nbsp;&nbsp;(değer3, değer4);</code>`,
        task: "Kategoriler tablosuna 3 yeni kategori ekleyin: (6, 'Oyuncak', 'Çocuk oyuncakları'), (7, 'Kozmetik', 'Güzellik ürünleri'), (8, 'Otomotiv', 'Araç aksesuarları').",
        database: "eticaret",
        initialCode: "",
        hints: ["INSERT INTO kategoriler VALUES (...), (...), (...);", "Her grup parantez içinde olmalı."],
        solution: "INSERT INTO kategoriler VALUES\n  (6, 'Oyuncak', 'Çocuk oyuncakları'),\n  (7, 'Kozmetik', 'Güzellik ürünleri'),\n  (8, 'Otomotiv', 'Araç aksesuarları');",
        checkType: "contains-value", checkQuery: "SELECT * FROM kategoriler WHERE kategori_id >= 6;", checkValue: "Oyuncak"
    },
    {
        id: "7.3", topicId: 7, level: "beginner",
        title: "INSERT INTO — Seçici Sütunlarla Ekleme",
        topicTitle: "INSERT INTO Komutu",
        description: `Sadece belirli sütunlara veri girmek istediğinizde sütun adlarını belirtirsiniz. Belirtilmeyen sütunlar NULL veya DEFAULT değerini alır.`,
        task: "Ürünler tablosuna sadece urun_id, urun_adi ve fiyat belirterek yeni ürün ekleyin: (41, 'USB Kablo', 49.90).",
        database: "eticaret",
        initialCode: "",
        hints: ["INSERT INTO urunler (urun_id, urun_adi, fiyat) VALUES (...);", "stok ve kategori_id NULL olacak."],
        solution: "INSERT INTO urunler (urun_id, urun_adi, fiyat) VALUES (41, 'USB Kablo', 49.90);",
        checkType: "contains-value", checkQuery: "SELECT * FROM urunler WHERE urun_id = 41;", checkValue: "USB"
    },
    // ===== KONU 8: SELECT KOMUTU =====
    {
        id: "8.1", topicId: 8, level: "beginner",
        title: "SELECT — Tüm Veriler (SELECT *)",
        topicTitle: "SELECT Komutu",
        description: `<code>SELECT</code> komutu veritabanından veri sorgulamak için kullanılır:<br><br>
<code>SELECT * FROM tablo_adi;</code><br><br>
<code>*</code> (yıldız) işareti "tüm sütunlar" anlamına gelir.`,
        task: "Öğrenciler tablosundaki tüm verileri listeleyin.",
        database: "okul",
        initialCode: "",
        hints: ["SELECT * FROM ... şeklinde yazın.", "Tablo adı 'ogrenciler' dir."],
        solution: "SELECT * FROM ogrenciler;",
        expectedQuery: "SELECT * FROM ogrenciler;",
        checkType: "result"
    },
    {
        id: "8.2", topicId: 8, level: "beginner",
        title: "SELECT — Belirli Sütunlar",
        topicTitle: "SELECT Komutu",
        description: `Sadece istediğiniz sütunları getirmek için sütun adlarını belirtin:<br><br>
<code>SELECT sütun1, sütun2 FROM tablo_adi;</code>`,
        task: "Öğrenciler tablosundan sadece ad ve soyad sütunlarını listeleyin.",
        database: "okul",
        initialCode: "",
        hints: ["SELECT ad, soyad FROM ... şeklinde yazın.", "Sütun adlarını virgülle ayırın."],
        solution: "SELECT ad, soyad FROM ogrenciler;",
        expectedQuery: "SELECT ad, soyad FROM ogrenciler;",
        checkType: "result"
    },
    {
        id: "8.3", topicId: 8, level: "beginner",
        title: "SELECT — DISTINCT (Benzersiz Değerler)",
        topicTitle: "SELECT Komutu",
        description: `<code>DISTINCT</code> tekrar eden değerleri filtreler, sadece benzersiz sonuçları getirir:<br><br>
<code>SELECT DISTINCT sütun FROM tablo;</code>`,
        task: "Müşteriler tablosundaki farklı şehirleri listeleyin (tekrar eden şehirler olmasın).",
        database: "eticaret",
        initialCode: "",
        hints: ["SELECT DISTINCT sehir FROM ... şeklinde yazın.", "DISTINCT kelimesi SELECT'ten hemen sonra gelir."],
        solution: "SELECT DISTINCT sehir FROM musteriler;",
        expectedQuery: "SELECT DISTINCT sehir FROM musteriler;",
        checkType: "result"
    },
    {
        id: "8.4", topicId: 8, level: "beginner",
        title: "SELECT — AS Takma Ad (Alias)",
        topicTitle: "SELECT Komutu",
        description: `Sütunlara takma ad vermek için <code>AS</code> kullanılır:<br><br>
<code>SELECT sütun AS takma_ad FROM tablo;</code><br><br>
Bu, sonuç tablosundaki sütun başlığını değiştirir.`,
        task: "Ürünler tablosundan urun_adi sütununu 'Ürün Adı', fiyat sütununu 'Fiyat (TL)' olarak listeleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["SELECT urun_adi AS '...', fiyat AS '...' FROM ... kullanın.", "Takma ad boşluk içeriyorsa tek tırnak içinde yazın."],
        solution: "SELECT urun_adi AS 'Ürün Adı', fiyat AS 'Fiyat (TL)' FROM urunler;",
        expectedQuery: "SELECT urun_adi AS 'Ürün Adı', fiyat AS 'Fiyat (TL)' FROM urunler;",
        checkType: "result"
    }
];
