// ========== BEGINNER CURRICULUM ==========
const BeginnerLessons = [
    {
        id: "1.1", topicId: 1, level: "beginner",
        title: "Veri Türleri — Giriş",
        topicTitle: "Veri Türleri",
        description: `SQL'de veriler farklı türlerde saklanır. Temel veri türleri şunlardır:
<br><br>
• <code>INTEGER</code> — Tam sayılar (1, 42, -5)<br>
• <code>TEXT</code> — Metin/yazı ('Ahmet', 'İstanbul')<br>
• <code>REAL</code> — Ondalıklı sayılar (3.14, 99.90)<br>
• <code>BLOB</code> — İkili veri (resim, dosya)<br>
• <code>NULL</code> — Boş değer<br>
<br>
Doğru veri türü seçimi, veritabanı performansı ve veri bütünlüğü için çok önemlidir.`,
        task: "Aşağıdaki sorguyu çalıştırarak öğrenciler tablosunun yapısını inceleyin. Her sütunun veri türünü gözlemleyin.",
        database: "okul",
        initialCode: "PRAGMA table_info('ogrenciler');",
        hints: ["PRAGMA table_info komutu tablo yapısını gösterir.", "Sonuçta 'type' sütununa dikkat edin."],
        solution: "PRAGMA table_info('ogrenciler');",
        checkType: "run-only"
    },
    {
        id: "1.2", topicId: 1, level: "beginner",
        title: "Veri Türleri — Uygulama",
        topicTitle: "Veri Türleri",
        description: `Bir tablo oluştururken her sütun için uygun veri türünü belirlememiz gerekir.<br><br>
Örneğin bir öğrenci tablosunda:<br>
• <code>ad</code> → TEXT<br>
• <code>yas</code> → INTEGER<br>
• <code>ortalama</code> → REAL`,
        task: "Aşağıdaki bilgilere sahip bir 'ogrenci_bilgi' tablosu oluşturun: numara (INTEGER), isim (TEXT), yas (INTEGER), ortalama (REAL).",
        database: "okul",
        initialCode: "CREATE TABLE ogrenci_bilgi (\n  \n);",
        hints: ["CREATE TABLE tablo_adi (sütun1 TÜR, sütun2 TÜR, ...); şeklinde yazılır.", "Her sütunu virgülle ayırın."],
        solution: "CREATE TABLE ogrenci_bilgi (\n  numara INTEGER,\n  isim TEXT,\n  yas INTEGER,\n  ortalama REAL\n);",
        expectedQuery: "PRAGMA table_info('ogrenci_bilgi');",
        checkType: "structure",
        checkTable: "ogrenci_bilgi",
        checkColumns: ["numara", "isim", "yas", "ortalama"]
    },
    {
        id: "2.1", topicId: 2, level: "beginner",
        title: "Veri Tabanı Oluşturma",
        topicTitle: "Veri Tabanı Oluşturma",
        description: `Veritabanı, birbiriyle ilişkili tabloların saklandığı yapıdır. SQL'de veritabanı oluşturmak için <code>CREATE DATABASE</code> komutu kullanılır.<br><br>
<strong>Not:</strong> SQLite'da her dosya bir veritabanıdır. Bu platformda 3 hazır veritabanı bulunmaktadır: Okul, E-Ticaret ve Kütüphane.<br><br>
Şu an kullandığınız veritabanındaki tabloları görmek için aşağıdaki sorguyu çalıştırın.`,
        task: "Okul veritabanındaki tüm tabloları listeleyin.",
        database: "okul",
        initialCode: "",
        hints: ["SQLite'da tablolar sqlite_master tablosunda saklanır.", "SELECT name FROM sqlite_master WHERE type='table'; sorgusunu deneyin."],
        solution: "SELECT name FROM sqlite_master WHERE type='table';",
        checkType: "contains-value",
        checkValue: "ogrenciler"
    },
    {
        id: "3.1", topicId: 3, level: "beginner",
        title: "Anahtarlar — PRIMARY KEY",
        topicTitle: "Anahtarlar ve İndeksler",
        description: `<code>PRIMARY KEY</code> (Birincil Anahtar), tablodaki her satırı benzersiz olarak tanımlayan sütundur.<br><br>
• Her tabloda yalnızca bir PRIMARY KEY olabilir.<br>
• PRIMARY KEY değeri tekrar edemez ve NULL olamaz.<br>
• Genellikle <code>id</code> veya <code>numara</code> gibi sütunlar için kullanılır.`,
        task: "Bir 'kitap' tablosu oluşturun: kitap_id (INTEGER, PRIMARY KEY), baslik (TEXT NOT NULL), yazar (TEXT), sayfa (INTEGER).",
        database: "okul",
        initialCode: "CREATE TABLE kitap (\n  \n);",
        hints: ["PRIMARY KEY ifadesini sütun tanımından sonra yazın.", "kitap_id INTEGER PRIMARY KEY şeklinde tanımlayın."],
        solution: "CREATE TABLE kitap (\n  kitap_id INTEGER PRIMARY KEY,\n  baslik TEXT NOT NULL,\n  yazar TEXT,\n  sayfa INTEGER\n);",
        checkType: "structure",
        checkTable: "kitap",
        checkColumns: ["kitap_id", "baslik", "yazar", "sayfa"]
    },
    {
        id: "3.2", topicId: 3, level: "beginner",
        title: "Anahtarlar — FOREIGN KEY ve İndeksler",
        topicTitle: "Anahtarlar ve İndeksler",
        description: `<code>FOREIGN KEY</code> (Yabancı Anahtar), bir tablodaki sütunun başka bir tablonun PRIMARY KEY'ine referans vermesidir. Bu, tablolar arası ilişki kurar.<br><br>
<code>INDEX</code> (İndeks), sorgu performansını artırmak için kullanılır. Sık aranan sütunlara indeks eklenir.`,
        task: "Öğrenciler tablosunda hangi sütunun FOREIGN KEY olduğunu bulun. PRAGMA foreign_key_list komutunu kullanın.",
        database: "okul",
        initialCode: "",
        hints: ["PRAGMA foreign_key_list('tablo_adi'); şeklinde yazılır.", "Öğrenciler tablosunun yabancı anahtarlarını kontrol edin."],
        solution: "PRAGMA foreign_key_list('ogrenciler');",
        checkType: "run-only"
    },
    {
        id: "4.1", topicId: 4, level: "beginner",
        title: "Tablo İşlemleri — ALTER TABLE",
        topicTitle: "Tablo İşlemleri",
        description: `Mevcut bir tabloya yeni sütun eklemek için <code>ALTER TABLE</code> komutu kullanılır.<br><br>
<code>ALTER TABLE tablo_adi ADD COLUMN yeni_sutun TÜR;</code>`,
        task: "Öğrenciler tablosuna 'telefon' adında TEXT türünde yeni bir sütun ekleyin.",
        database: "okul",
        initialCode: "",
        hints: ["ALTER TABLE ogrenciler ADD COLUMN ... şeklinde başlayın.", "Sütun adı 'telefon' ve türü TEXT olmalı."],
        solution: "ALTER TABLE ogrenciler ADD COLUMN telefon TEXT;",
        checkType: "structure-contains",
        checkTable: "ogrenciler",
        checkColumns: ["telefon"]
    },
    {
        id: "4.2", topicId: 4, level: "beginner",
        title: "Tablo İşlemleri — DROP TABLE",
        topicTitle: "Tablo İşlemleri",
        description: `Bir tabloyu tamamen silmek için <code>DROP TABLE</code> komutu kullanılır.<br><br>
<code>DROP TABLE tablo_adi;</code><br><br>
⚠️ <strong>Dikkat:</strong> Bu işlem geri alınamaz! Tüm veriler silinir.`,
        task: "Önce 'gecici_tablo' adında bir tablo oluşturun (id INTEGER, veri TEXT), sonra bu tabloyu DROP TABLE ile silin.",
        database: "okul",
        initialCode: "CREATE TABLE gecici_tablo (id INTEGER, veri TEXT);\n\n-- Şimdi tabloyu silin:\n",
        hints: ["İki SQL komutunu alt alta yazabilirsiniz.", "DROP TABLE gecici_tablo; komutunu ekleyin."],
        solution: "CREATE TABLE gecici_tablo (id INTEGER, veri TEXT);\nDROP TABLE gecici_tablo;",
        checkType: "run-only"
    },
    {
        id: "5.1", topicId: 5, level: "beginner",
        title: "Tablo Oluşturma — Basit",
        topicTitle: "Tablo Oluşturma",
        description: `Yeni bir tablo oluşturmak için <code>CREATE TABLE</code> komutu kullanılır.<br><br>
<code>CREATE TABLE tablo_adi (<br>&nbsp;&nbsp;sutun1 TÜR,<br>&nbsp;&nbsp;sutun2 TÜR,<br>&nbsp;&nbsp;...<br>);</code>`,
        task: "Bir 'ogrenci' tablosu oluşturun: ogrenci_no (INTEGER PRIMARY KEY), ad (TEXT), soyad (TEXT), sinif (INTEGER).",
        database: "okul",
        initialCode: "",
        hints: ["CREATE TABLE ogrenci ( ... ); şeklinde başlayın.", "Her sütunu virgülle ayırın. Son sütundan sonra virgül koymayın."],
        solution: "CREATE TABLE ogrenci (\n  ogrenci_no INTEGER PRIMARY KEY,\n  ad TEXT,\n  soyad TEXT,\n  sinif INTEGER\n);",
        checkType: "structure",
        checkTable: "ogrenci",
        checkColumns: ["ogrenci_no", "ad", "soyad", "sinif"]
    },
    {
        id: "5.2", topicId: 5, level: "beginner",
        title: "Tablo Oluşturma — Kısıtlamalar",
        topicTitle: "Tablo Oluşturma",
        description: `Tablo oluştururken sütunlara kısıtlamalar (constraints) ekleyebilirsiniz:<br><br>
• <code>NOT NULL</code> — Boş bırakılamaz<br>
• <code>UNIQUE</code> — Tekrar edemez<br>
• <code>DEFAULT değer</code> — Varsayılan değer atar<br>
• <code>CHECK(koşul)</code> — Koşul kontrolü`,
        task: "Bir 'urun' tablosu oluşturun: urun_id (INTEGER PRIMARY KEY), urun_adi (TEXT NOT NULL), fiyat (REAL NOT NULL), stok (INTEGER DEFAULT 0).",
        database: "eticaret",
        initialCode: "",
        hints: ["DEFAULT kelimesini stok sütununda kullanın.", "fiyat REAL NOT NULL şeklinde yazın."],
        solution: "CREATE TABLE urun (\n  urun_id INTEGER PRIMARY KEY,\n  urun_adi TEXT NOT NULL,\n  fiyat REAL NOT NULL,\n  stok INTEGER DEFAULT 0\n);",
        checkType: "structure",
        checkTable: "urun",
        checkColumns: ["urun_id", "urun_adi", "fiyat", "stok"]
    },
    {
        id: "6.1", topicId: 6, level: "beginner",
        title: "Tablolara Veri Girişi",
        topicTitle: "Tablolara Veri Girişi",
        description: `Tablolara veri eklemek için <code>INSERT INTO</code> komutu kullanılır. İki temel yol vardır:<br><br>
1. Tüm sütunlara veri girme:<br>
<code>INSERT INTO tablo VALUES (değer1, değer2, ...);</code><br><br>
2. Belirli sütunlara veri girme:<br>
<code>INSERT INTO tablo (sütun1, sütun2) VALUES (değer1, değer2);</code>`,
        task: "Öğrenciler tablosuna yeni bir öğrenci ekleyin: ID 21, ad 'Kerem', soyad 'Bal', doğum tarihi '2002-05-10', şehir 'Konya', bölüm ID 1.",
        database: "okul",
        initialCode: "",
        hints: ["INSERT INTO ogrenciler VALUES (...); şeklinde yazın.", "Metin değerleri tek tırnak içinde yazılır."],
        solution: "INSERT INTO ogrenciler VALUES (21, 'Kerem', 'Bal', '2002-05-10', 'Konya', 1);",
        checkType: "contains-value",
        checkQuery: "SELECT * FROM ogrenciler WHERE ogrenci_id = 21;",
        checkValue: "Kerem"
    },
    {
        id: "7.1", topicId: 7, level: "beginner",
        title: "INSERT INTO — Temel",
        topicTitle: "INSERT INTO Komutu",
        description: `<code>INSERT INTO</code> komutunun temel kullanımı:<br><br>
<code>INSERT INTO tablo_adi (sütun1, sütun2) VALUES (değer1, değer2);</code><br><br>
Metin değerleri <strong>tek tırnak</strong> içinde yazılır. Sayısal değerler doğrudan yazılır.`,
        task: "Müşteriler tablosuna yeni bir müşteri ekleyin: ad 'Zehra', soyad 'Aydın', email 'zehra@email.com', şehir 'Konya', telefon '05111111111'.",
        database: "eticaret",
        initialCode: "",
        hints: ["INSERT INTO musteriler (ad, soyad, email, sehir, telefon) VALUES (...); yazın.", "musteri_id için 11 kullanabilirsiniz."],
        solution: "INSERT INTO musteriler VALUES (11, 'Zehra', 'Aydın', 'zehra@email.com', 'Konya', '05111111111');",
        checkType: "contains-value",
        checkQuery: "SELECT * FROM musteriler WHERE ad = 'Zehra';",
        checkValue: "Zehra"
    },
    {
        id: "7.2", topicId: 7, level: "beginner",
        title: "INSERT INTO — Çoklu Kayıt",
        topicTitle: "INSERT INTO Komutu",
        description: `Birden fazla kayıt eklemek için her bir VALUES grubunu virgülle ayırabilirsiniz:<br><br>
<code>INSERT INTO tablo VALUES<br>&nbsp;&nbsp;(değer1, değer2),<br>&nbsp;&nbsp;(değer3, değer4),<br>&nbsp;&nbsp;(değer5, değer6);</code>`,
        task: "Kategoriler tablosuna 3 yeni kategori ekleyin: (6, 'Oyuncak', 'Çocuk oyuncakları'), (7, 'Kozmetik', 'Güzellik ürünleri'), (8, 'Otomotiv', 'Araç aksesuarları').",
        database: "eticaret",
        initialCode: "",
        hints: ["INSERT INTO kategoriler VALUES (...), (...), (...); şeklinde yazın.", "Her grup parantez içinde olmalı ve virgülle ayrılmalı."],
        solution: "INSERT INTO kategoriler VALUES\n  (6, 'Oyuncak', 'Çocuk oyuncakları'),\n  (7, 'Kozmetik', 'Güzellik ürünleri'),\n  (8, 'Otomotiv', 'Araç aksesuarları');",
        checkType: "contains-value",
        checkQuery: "SELECT * FROM kategoriler WHERE kategori_id >= 6;",
        checkValue: "Oyuncak"
    },
    {
        id: "7.3", topicId: 7, level: "beginner",
        title: "INSERT INTO — Seçici Sütunlar",
        topicTitle: "INSERT INTO Komutu",
        description: `Sadece belirli sütunlara veri girmek istediğinizde sütun adlarını belirtirsiniz. Belirtilmeyen sütunlar NULL veya DEFAULT değerini alır.<br><br>
<code>INSERT INTO tablo (sütun1, sütun3) VALUES (değer1, değer3);</code>`,
        task: "Ürünler tablosuna sadece urun_id, urun_adi ve fiyat belirterek yeni bir ürün ekleyin: (16, 'Bluetooth Hoparlör', 599.90). Stok ve kategori_id belirtmeyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["INSERT INTO urunler (urun_id, urun_adi, fiyat) VALUES (...); yazın.", "Belirtilmeyen sütunlar otomatik olarak NULL veya DEFAULT değer alır."],
        solution: "INSERT INTO urunler (urun_id, urun_adi, fiyat) VALUES (16, 'Bluetooth Hoparlör', 599.90);",
        checkType: "contains-value",
        checkQuery: "SELECT * FROM urunler WHERE urun_id = 16;",
        checkValue: "Bluetooth"
    },
    {
        id: "8.1", topicId: 8, level: "beginner",
        title: "SELECT — Tüm Veriler",
        topicTitle: "SELECT Komutu",
        description: `<code>SELECT</code> komutu veritabanından veri sorgulamak için kullanılır. En temel kullanımı:<br><br>
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
        description: `Sadece istediğiniz sütunları getirmek için sütun adlarını belirtirsiniz:<br><br>
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
        title: "SELECT — DISTINCT",
        topicTitle: "SELECT Komutu",
        description: `<code>DISTINCT</code> kelimesi tekrar eden değerleri filtreleyerek sadece benzersiz sonuçları getirir.<br><br>
<code>SELECT DISTINCT sütun FROM tablo;</code>`,
        task: "Müşteriler tablosundaki farklı şehirleri listeleyin (tekrar eden şehirler olmasın).",
        database: "eticaret",
        initialCode: "",
        hints: ["SELECT DISTINCT sehir FROM ... şeklinde yazın.", "DISTINCT kelimesi SELECT'ten hemen sonra gelir."],
        solution: "SELECT DISTINCT sehir FROM musteriler;",
        expectedQuery: "SELECT DISTINCT sehir FROM musteriler;",
        checkType: "result"
    }
];
