// ========== ADVANCED CURRICULUM ==========
const AdvancedLessons = [
    {
        id: "17.1", topicId: 17, level: "advanced",
        title: "İlişkisel Veri Tabanı — Kavram",
        topicTitle: "İlişkisel Veri Tabanı",
        description: `İlişkisel veritabanı, verilerin tablolar halinde saklandığı ve tablolar arasında ilişkilerin kurulduğu bir modeldir.<br><br>
<strong>Temel Özellikler:</strong><br>
• Her tablo bir varlığı (entity) temsil eder<br>
• Satırlar kayıtları, sütunlar özellikleri temsil eder<br>
• Tablolar arasında PRIMARY KEY ve FOREIGN KEY ile ilişki kurulur<br>
• Veri tekrarı (redundancy) minimize edilir`,
        task: "Okul veritabanındaki tablolar arasındaki ilişkileri keşfedin. Öğrenciler tablosunun hangi tabloya FOREIGN KEY ile bağlı olduğunu bulun.",
        database: "okul",
        initialCode: "",
        hints: ["PRAGMA foreign_key_list('ogrenciler'); komutunu kullanın.", "Sonuçta 'table' sütunu ilişkili tabloyu gösterir."],
        solution: "PRAGMA foreign_key_list('ogrenciler');",
        checkType: "run-only"
    },
    {
        id: "17.2", topicId: 17, level: "advanced",
        title: "İlişkisel Veri Tabanı — Normalizasyon",
        topicTitle: "İlişkisel Veri Tabanı",
        description: `Normalizasyon, veri tekrarını azaltmak ve bütünlüğü sağlamak için tabloları düzenleme sürecidir.<br><br>
<strong>1NF:</strong> Her hücrede tek değer olmalı<br>
<strong>2NF:</strong> Kısmi bağımlılık olmamalı<br>
<strong>3NF:</strong> Geçişli bağımlılık olmamalı<br><br>
Okul veritabanımız normalize edilmiştir: Bölüm bilgileri ayrı tabloda, öğrenciler sadece bolum_id ile referans verir.`,
        task: "Öğrencileri bölüm adlarıyla birlikte listeleyin. Bu, iki tablonun birleştirilmesini (JOIN) gerektirir.",
        database: "okul",
        initialCode: "",
        hints: ["SELECT ... FROM ogrenciler JOIN bolumler ON ... kullanın.", "ogrenciler.bolum_id = bolumler.bolum_id koşuluyla birleştirin."],
        solution: "SELECT ogrenciler.ad, ogrenciler.soyad, bolumler.bolum_adi\nFROM ogrenciler\nJOIN bolumler ON ogrenciler.bolum_id = bolumler.bolum_id;",
        expectedQuery: "SELECT ogrenciler.ad, ogrenciler.soyad, bolumler.bolum_adi FROM ogrenciler JOIN bolumler ON ogrenciler.bolum_id = bolumler.bolum_id;",
        checkType: "result"
    },
    {
        id: "18.1", topicId: 18, level: "advanced",
        title: "İlişkisel Veri Tabanı Tasarımı — ER Diyagram",
        topicTitle: "İlişkisel VT Tasarımı",
        description: `Veritabanı tasarımı şu adımları içerir:<br><br>
1. <strong>Varlıkları</strong> belirleme (Müşteri, Ürün, Sipariş...)<br>
2. <strong>Özellikleri</strong> tanımlama (ad, fiyat, tarih...)<br>
3. <strong>İlişkileri</strong> kurma (Müşteri → Sipariş → Ürün)<br>
4. <strong>Anahtarları</strong> belirleme (PK, FK)<br><br>
E-Ticaret veritabanımızın yapısını inceleyelim.`,
        task: "E-Ticaret veritabanındaki tüm tabloların yapısını inceleyin. Her tablonun sütunlarını ve ilişkilerini görün.",
        database: "eticaret",
        initialCode: "-- Tabloları listeleyin\nSELECT name FROM sqlite_master WHERE type='table';",
        hints: ["Önce tabloları listeleyin, sonra PRAGMA table_info ile detayları görün.", "PRAGMA foreign_key_list ile ilişkileri kontrol edin."],
        solution: "SELECT name FROM sqlite_master WHERE type='table';",
        checkType: "run-only"
    },
    {
        id: "18.2", topicId: 18, level: "advanced",
        title: "İlişkisel Veri Tabanı Tasarımı — Uygulama",
        topicTitle: "İlişkisel VT Tasarımı",
        description: `Bir kütüphane sistemi için ilişkisel tablo tasarlayalım.<br><br>
Gereksinimler:<br>
• Yazarlar ve kitapları var<br>
• Üyeler kitap ödünç alır<br>
• Her kitabın bir yazarı var (1:N)<br>
• Bir üye birden fazla kitap ödünç alabilir (1:N)`,
        task: "Bir 'yeni_kitaplar' tablosu oluşturun: kitap_id (PK), baslik (TEXT NOT NULL), yazar_id (INTEGER, FK → yazarlar), fiyat (REAL). FOREIGN KEY tanımını da ekleyin.",
        database: "kutuphane",
        initialCode: "",
        hints: ["CREATE TABLE yeni_kitaplar (..., FOREIGN KEY(...) REFERENCES yazarlar(...));", "FOREIGN KEY tanımını sütun tanımlarından sonra ayrı bir satırda yazın."],
        solution: "CREATE TABLE yeni_kitaplar (\n  kitap_id INTEGER PRIMARY KEY,\n  baslik TEXT NOT NULL,\n  yazar_id INTEGER,\n  fiyat REAL,\n  FOREIGN KEY(yazar_id) REFERENCES yazarlar(yazar_id)\n);",
        checkType: "structure",
        checkTable: "yeni_kitaplar",
        checkColumns: ["kitap_id", "baslik", "yazar_id", "fiyat"]
    },
    {
        id: "19.1", topicId: 19, level: "advanced",
        title: "Tablolar Arası İlişkiler — Bire-Çok (1:N)",
        topicTitle: "Tablolar Arası İlişkiler",
        description: `<strong>Bire-Çok (1:N) İlişki:</strong> Bir tablodaki bir kayıt, diğer tabloda birden fazla kayıtla ilişkili olabilir.<br><br>
Örnek: Bir bölümde birden fazla öğrenci olabilir.<br>
<code>bolumler (1) → ogrenciler (N)</code><br><br>
Bu ilişki FOREIGN KEY ile kurulur.`,
        task: "Her bölümde kaç öğrenci olduğunu, bölüm adıyla birlikte listeleyin.",
        database: "okul",
        initialCode: "",
        hints: ["JOIN ile iki tabloyu birleştirin, GROUP BY ile gruplandırın.", "SELECT bolumler.bolum_adi, COUNT(*) ... GROUP BY bolumler.bolum_adi"],
        solution: "SELECT bolumler.bolum_adi, COUNT(*) AS ogrenci_sayisi\nFROM ogrenciler\nJOIN bolumler ON ogrenciler.bolum_id = bolumler.bolum_id\nGROUP BY bolumler.bolum_adi;",
        expectedQuery: "SELECT bolumler.bolum_adi, COUNT(*) AS ogrenci_sayisi FROM ogrenciler JOIN bolumler ON ogrenciler.bolum_id = bolumler.bolum_id GROUP BY bolumler.bolum_adi;",
        checkType: "result"
    },
    {
        id: "19.2", topicId: 19, level: "advanced",
        title: "Tablolar Arası İlişkiler — Çoka-Çok (M:N)",
        topicTitle: "Tablolar Arası İlişkiler",
        description: `<strong>Çoka-Çok (M:N) İlişki:</strong> Her iki taraftaki kayıtlar birden fazla karşı kayıtla ilişkili olabilir.<br><br>
Örnek: Bir üye birden fazla kitap ödünç alabilir, bir kitap birden fazla üyeye ödünç verilebilir.<br>
Bu ilişki için <strong>ara tablo</strong> (junction table) kullanılır: <code>odunc_kayitlari</code>`,
        task: "Ödünç kayıtlarını kitap başlığı ve üye adıyla birlikte listeleyin. 3 tabloyu JOIN ile birleştirin.",
        database: "kutuphane",
        initialCode: "",
        hints: ["İki JOIN kullanmanız gerekiyor: odunc_kayitlari → kitaplar ve odunc_kayitlari → uyeler.", "FROM odunc_kayitlari JOIN kitaplar ON ... JOIN uyeler ON ..."],
        solution: "SELECT kitaplar.baslik, uyeler.ad, uyeler.soyad, odunc_kayitlari.odunc_tarihi, odunc_kayitlari.durum\nFROM odunc_kayitlari\nJOIN kitaplar ON odunc_kayitlari.kitap_id = kitaplar.kitap_id\nJOIN uyeler ON odunc_kayitlari.uye_id = uyeler.uye_id;",
        expectedQuery: "SELECT kitaplar.baslik, uyeler.ad, uyeler.soyad, odunc_kayitlari.odunc_tarihi, odunc_kayitlari.durum FROM odunc_kayitlari JOIN kitaplar ON odunc_kayitlari.kitap_id = kitaplar.kitap_id JOIN uyeler ON odunc_kayitlari.uye_id = uyeler.uye_id;",
        checkType: "result"
    },
    {
        id: "20.1", topicId: 20, level: "advanced",
        title: "İlişkisel Tablolara Veri Girişi — Temel",
        topicTitle: "İlişkisel VT Veri Girişi",
        description: `İlişkisel tablolara veri girerken <strong>sıralama</strong> önemlidir:<br><br>
1. Önce <strong>ana tablo</strong>ya (parent) veri girin<br>
2. Sonra <strong>bağımlı tablo</strong>ya (child) veri girin<br><br>
Örneğin önce bölüm oluşturulmalı, sonra o bölüme öğrenci eklenmelidir.`,
        task: "Önce bölümler tablosuna yeni bir bölüm ekleyin (6, 'Fizik', 'Fen-Edebiyat'), sonra bu bölüme bir öğrenci ekleyin (52, 'Aylin', 'Koca', '2003-04-15', 'Mersin', 6).",
        database: "okul",
        initialCode: "",
        hints: ["İki INSERT komutunu sırayla yazın.", "Önce bölüm (bolum_id=6), sonra öğrenci (bolum_id=6)."],
        solution: "INSERT INTO bolumler VALUES (6, 'Fizik', 'Fen-Edebiyat');\nINSERT INTO ogrenciler VALUES (52, 'Aylin', 'Koca', '2003-04-15', 'Mersin', 6);",
        checkType: "contains-value",
        checkQuery: "SELECT o.ad, b.bolum_adi FROM ogrenciler o JOIN bolumler b ON o.bolum_id = b.bolum_id WHERE o.ogrenci_id = 52;",
        checkValue: "Aylin"
    },
    {
        id: "20.2", topicId: 20, level: "advanced",
        title: "İlişkisel Tablolara Veri Girişi — Gelişmiş",
        topicTitle: "İlişkisel VT Veri Girişi",
        description: `Referans bütünlüğü (referential integrity), FOREIGN KEY'lerin geçerli değerlere sahip olmasını garanti eder.<br><br>
Olmayan bir bölüm ID'si ile öğrenci eklemeye çalışırsanız hata alırsınız (FOREIGN KEY constraint ihlali).<br><br>
Bu ders E-Ticaret veritabanında sipariş eklemeyi uygulamanızı ister.`,
        task: "E-Ticaret veritabanında müşteri 1 için yeni bir sipariş (21, tarih '2024-04-01', tutar 1599.80, durum 'Hazırlanıyor') ve sipariş detayı (31, siparis_id 21, urun_id 3, miktar 1, birim_fiyat 1299.00) ekleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["Önce siparisler tablosuna, sonra siparis_detaylari tablosuna INSERT yapın.", "Sipariş ID'si 21 ve detay ID'si 31 olmalı."],
        solution: "INSERT INTO siparisler VALUES (21, 1, '2024-04-01', 1599.80, 'Hazırlanıyor');\nINSERT INTO siparis_detaylari VALUES (31, 21, 3, 1, 1299.00);",
        checkType: "contains-value",
        checkQuery: "SELECT s.siparis_id, sd.urun_id FROM siparisler s JOIN siparis_detaylari sd ON s.siparis_id = sd.siparis_id WHERE s.siparis_id = 21;",
        checkValue: "21"
    },
    {
        id: "21.1", topicId: 21, level: "advanced",
        title: "İlişkisel Sorgular — JOIN Temelleri",
        topicTitle: "İlişkisel VT Sorgular",
        description: `<code>JOIN</code> birden fazla tabloyu birleştirmek için kullanılır:<br><br>
• <code>INNER JOIN</code> — Her iki tabloda eşleşen kayıtlar<br>
• <code>LEFT JOIN</code> — Sol tablodaki tüm kayıtlar + eşleşen sağ kayıtlar<br><br>
<code>SELECT * FROM tablo1 JOIN tablo2 ON tablo1.id = tablo2.id;</code>`,
        task: "Öğrencilerin adını, soyadını, aldıkları dersin adını ve ortalama notlarını listeleyin. 3 tabloyu birleştirin (ogrenciler, notlar, dersler).",
        database: "okul",
        initialCode: "",
        hints: ["FROM ogrenciler JOIN notlar ON ... JOIN dersler ON ... kullanın.", "ogrenciler → notlar (ogrenci_id), notlar → dersler (ders_id) ilişkilerini kullanın."],
        solution: "SELECT ogrenciler.ad, ogrenciler.soyad, dersler.ders_adi, notlar.ortalama\nFROM ogrenciler\nJOIN notlar ON ogrenciler.ogrenci_id = notlar.ogrenci_id\nJOIN dersler ON notlar.ders_id = dersler.ders_id\nORDER BY ogrenciler.ad;",
        expectedQuery: "SELECT ogrenciler.ad, ogrenciler.soyad, dersler.ders_adi, notlar.ortalama FROM ogrenciler JOIN notlar ON ogrenciler.ogrenci_id = notlar.ogrenci_id JOIN dersler ON notlar.ders_id = dersler.ders_id ORDER BY ogrenciler.ad;",
        checkType: "result"
    },
    {
        id: "21.2", topicId: 21, level: "advanced",
        title: "İlişkisel Sorgular — Gelişmiş JOIN ve Alt Sorgular",
        topicTitle: "İlişkisel VT Sorgular",
        description: `Gelişmiş sorgularda birden fazla JOIN, alt sorgular (subquery) ve toplama fonksiyonlarını birlikte kullanabilirsiniz.<br><br>
<code>Alt Sorgu:</code> Bir sorgu içinde başka bir sorgu çalıştırma.<br>
<code>SELECT * FROM tablo WHERE id IN (SELECT id FROM diğer_tablo WHERE koşul);</code>`,
        task: "E-Ticaret veritabanında her müşterinin adını, soyadını ve toplam sipariş tutarını hesaplayın. Toplam tutara göre büyükten küçüğe sıralayın.",
        database: "eticaret",
        initialCode: "",
        hints: ["musteriler ve siparisler tablolarını JOIN ile birleştirin.", "SUM(toplam_tutar) ile toplam tutarı hesaplayın ve GROUP BY ile gruplandırın."],
        solution: "SELECT musteriler.ad, musteriler.soyad, SUM(siparisler.toplam_tutar) AS toplam_harcama\nFROM musteriler\nJOIN siparisler ON musteriler.musteri_id = siparisler.musteri_id\nGROUP BY musteriler.musteri_id\nORDER BY toplam_harcama DESC;",
        expectedQuery: "SELECT musteriler.ad, musteriler.soyad, SUM(siparisler.toplam_tutar) AS toplam_harcama FROM musteriler JOIN siparisler ON musteriler.musteri_id = siparisler.musteri_id GROUP BY musteriler.musteri_id ORDER BY toplam_harcama DESC;",
        checkType: "result"
    }
];
