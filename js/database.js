// ========== DATABASE ENGINE (sql.js) ==========
const DatabaseEngine = (function () {
    let SQL = null;
    const databases = {};

    // ---- SEED DATA ----
    const SEED = {
        okul: function (db) {
            db.run(`CREATE TABLE IF NOT EXISTS bolumler (
                bolum_id INTEGER PRIMARY KEY, bolum_adi TEXT NOT NULL, fakulte TEXT NOT NULL
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS ogretmenler (
                ogretmen_id INTEGER PRIMARY KEY, ad TEXT NOT NULL, soyad TEXT NOT NULL, brans TEXT, bolum_id INTEGER,
                FOREIGN KEY(bolum_id) REFERENCES bolumler(bolum_id)
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS ogrenciler (
                ogrenci_id INTEGER PRIMARY KEY, ad TEXT NOT NULL, soyad TEXT NOT NULL,
                dogum_tarihi TEXT, sehir TEXT, bolum_id INTEGER,
                FOREIGN KEY(bolum_id) REFERENCES bolumler(bolum_id)
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS dersler (
                ders_id INTEGER PRIMARY KEY, ders_adi TEXT NOT NULL, kredi INTEGER, ogretmen_id INTEGER,
                FOREIGN KEY(ogretmen_id) REFERENCES ogretmenler(ogretmen_id)
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS notlar (
                not_id INTEGER PRIMARY KEY, ogrenci_id INTEGER, ders_id INTEGER,
                vize INTEGER, final_notu INTEGER, ortalama REAL,
                FOREIGN KEY(ogrenci_id) REFERENCES ogrenciler(ogrenci_id),
                FOREIGN KEY(ders_id) REFERENCES dersler(ders_id)
            )`);
            // Bolumler
            db.run(`INSERT INTO bolumler VALUES (1,'Bilgisayar Mühendisliği','Mühendislik'),(2,'Elektrik-Elektronik','Mühendislik'),(3,'İşletme','İktisadi ve İdari Bilimler'),(4,'Matematik','Fen-Edebiyat'),(5,'Türk Dili ve Edebiyatı','Fen-Edebiyat')`);
            // Ogretmenler
            db.run(`INSERT INTO ogretmenler VALUES
                (1,'Ahmet','Yılmaz','Programlama',1),(2,'Ayşe','Kaya','Veritabanı',1),
                (3,'Mehmet','Demir','Elektronik',2),(4,'Fatma','Çelik','Devre Analizi',2),
                (5,'Ali','Öztürk','Muhasebe',3),(6,'Zeynep','Arslan','Pazarlama',3),
                (7,'Hasan','Şahin','Analiz',4),(8,'Elif','Yıldız','Cebir',4),
                (9,'Mustafa','Aydın','Osmanlıca',5),(10,'Hatice','Koç','Edebiyat',5)`);
            // Ogrenciler
            db.run(`INSERT INTO ogrenciler VALUES
                (1,'Emre','Kara','2002-03-15','İstanbul',1),(2,'Selin','Aksoy','2001-07-22','Ankara',1),
                (3,'Burak','Yıldırım','2003-01-10','İzmir',1),(4,'Merve','Çetin','2002-11-05','Bursa',1),
                (5,'Kaan','Polat','2001-09-18','Antalya',2),(6,'Deniz','Koç','2002-04-30','İstanbul',2),
                (7,'Ece','Arslan','2003-06-12','Ankara',2),(8,'Oğuz','Şahin','2001-12-25','Eskişehir',3),
                (9,'İrem','Demir','2002-08-08','İstanbul',3),(10,'Arda','Yılmaz','2003-02-14','İzmir',3),
                (11,'Zehra','Aydın','2001-05-20','Ankara',4),(12,'Can','Özdemir','2002-10-03','Bursa',4),
                (13,'Elif','Kaya','2003-07-27','Trabzon',4),(14,'Mert','Çelik','2002-01-16','Samsun',4),
                (15,'Sude','Yılmaz','2001-11-11','İstanbul',5),(16,'Yusuf','Kurt','2003-03-05','Ankara',5),
                (17,'Buse','Acar','2002-09-22','İzmir',1),(18,'Berkay','Doğan','2001-04-18','Antalya',2),
                (19,'Pınar','Güneş','2003-08-30','Konya',3),(20,'Tolga','Erdoğan','2002-06-07','Adana',5),
                (21,'Kerem','Bal','2002-05-10','Diyarbakır',1),(22,'Aylin','Koca','2003-04-15','Mersin',2),
                (23,'Onur','Taş','2001-10-20','Gaziantep',3),(24,'Simge','Ateş','2002-12-01','Kayseri',4),
                (25,'Furkan','Yavuz','2003-03-17','Sivas',5),(26,'Ceren','Tunç','2001-08-25','Eskişehir',1),
                (27,'Barış','Aslan','2002-02-09','Trabzon',2),(28,'Melis','Ünal','2003-11-14','Malatya',3),
                (29,'Taha','Güler','2001-06-30','Denizli',4),(30,'Nazlı','Şen','2002-07-19','Muğla',5)`);
            // Dersler
            db.run(`INSERT INTO dersler VALUES
                (1,'Programlamaya Giriş',4,1),(2,'Veritabanı Yönetimi',3,2),
                (3,'Devre Analizi',4,4),(4,'Elektronik I',3,3),
                (5,'Genel Muhasebe',3,5),(6,'Pazarlama İlkeleri',3,6),
                (7,'Matematik Analiz I',4,7),(8,'Lineer Cebir',3,8)`);
            // Notlar
            db.run(`INSERT INTO notlar VALUES
                (1,1,1,85,90,88.0),(2,1,2,70,80,76.0),(3,2,1,90,95,93.0),(4,2,2,75,85,81.0),
                (5,3,1,60,70,66.0),(6,3,2,55,65,61.0),(7,4,1,80,85,83.0),(8,4,2,65,75,71.0),
                (9,5,3,70,60,64.0),(10,5,4,85,80,82.0),(11,6,3,90,88,88.8),(12,6,4,75,70,72.0),
                (13,7,3,65,72,69.2),(14,7,4,80,85,83.0),(15,8,5,88,92,90.4),(16,8,6,70,78,74.8),
                (17,9,5,55,60,58.0),(18,9,6,82,88,85.6),(19,10,5,90,85,87.0),(20,10,6,68,72,70.4),
                (21,11,7,78,82,80.4),(22,11,8,90,88,88.8),(23,12,7,65,70,68.0),(24,12,8,72,80,76.8),
                (25,13,7,85,90,88.0),(26,13,8,60,65,63.0),(27,14,7,70,75,73.0),(28,14,8,80,85,83.0),
                (29,15,1,92,96,94.4),(30,16,2,58,62,60.4),(31,17,1,75,80,78.0),(32,17,2,82,88,85.6),
                (33,18,3,68,74,71.6),(34,18,4,90,92,91.2),(35,19,5,80,76,77.6),(36,19,6,65,70,68.0),
                (37,20,1,45,55,51.0),(38,1,7,88,92,90.4),(39,2,8,76,82,79.6),(40,5,7,62,68,65.6),
                (41,21,1,82,88,85.6),(42,21,2,90,85,87.0),(43,22,3,74,80,77.6),(44,22,4,68,72,70.4),
                (45,23,5,55,60,58.0),(46,23,6,78,82,80.4),(47,24,7,92,88,89.6),(48,24,8,85,90,88.0),
                (49,25,1,40,50,46.0),(50,25,2,62,68,65.6),(51,26,1,88,92,90.4),(52,26,2,95,98,96.8),
                (53,27,3,72,78,75.6),(54,27,4,80,85,83.0),(55,28,5,65,70,68.0),(56,28,6,58,62,60.4),
                (57,29,7,78,85,82.2),(58,29,8,90,95,93.0),(59,30,1,50,58,54.8),(60,30,2,70,75,73.0)`);
        },

        eticaret: function (db) {
            db.run(`CREATE TABLE IF NOT EXISTS kategoriler (
                kategori_id INTEGER PRIMARY KEY, kategori_adi TEXT NOT NULL, aciklama TEXT
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS urunler (
                urun_id INTEGER PRIMARY KEY, urun_adi TEXT NOT NULL, fiyat REAL NOT NULL,
                stok INTEGER DEFAULT 0, kategori_id INTEGER,
                FOREIGN KEY(kategori_id) REFERENCES kategoriler(kategori_id)
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS musteriler (
                musteri_id INTEGER PRIMARY KEY, ad TEXT NOT NULL, soyad TEXT NOT NULL,
                email TEXT, sehir TEXT, telefon TEXT
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS siparisler (
                siparis_id INTEGER PRIMARY KEY, musteri_id INTEGER, siparis_tarihi TEXT,
                toplam_tutar REAL, durum TEXT DEFAULT 'Beklemede',
                FOREIGN KEY(musteri_id) REFERENCES musteriler(musteri_id)
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS siparis_detaylari (
                detay_id INTEGER PRIMARY KEY, siparis_id INTEGER, urun_id INTEGER,
                miktar INTEGER, birim_fiyat REAL,
                FOREIGN KEY(siparis_id) REFERENCES siparisler(siparis_id),
                FOREIGN KEY(urun_id) REFERENCES urunler(urun_id)
            )`);
            // Kategoriler
            db.run(`INSERT INTO kategoriler VALUES (1,'Elektronik','Telefon, bilgisayar, tablet vb.'),(2,'Giyim','Erkek, kadın, çocuk giyim'),(3,'Kitap','Roman, ders kitabı, dergi'),(4,'Ev & Yaşam','Mobilya, dekorasyon, mutfak'),(5,'Spor','Spor malzemeleri ve giyim')`);
            // Urunler
            db.run(`INSERT INTO urunler VALUES
                (1,'Akıllı Telefon X',8999.99,50,1),(2,'Dizüstü Bilgisayar Pro',24999.90,25,1),
                (3,'Kablosuz Kulaklık',1299.00,100,1),(4,'Tablet 10 inç',6499.50,35,1),
                (5,'Erkek Kot Pantolon',399.90,200,2),(6,'Kadın Elbise',599.90,150,2),
                (7,'Çocuk T-Shirt',149.90,300,2),(8,'Programlama Kitabı',89.90,80,3),
                (9,'Roman - Kürk Mantolu Madonna',45.00,120,3),(10,'İngilizce Sözlük',69.90,60,3),
                (11,'Yemek Masası',3499.00,15,4),(12,'Koltuk Takımı',12999.00,8,4),
                (13,'Mutfak Robotu',2199.00,40,4),(14,'Koşu Ayakkabısı',899.90,90,5),
                (15,'Yoga Matı',249.90,70,5),(16,'Akıllı Saat',3499.00,45,1),
                (17,'Masa Lambası',349.90,60,4),(18,'Erkek Gömlek',279.90,180,2),
                (19,'Roman - Tutunamayanlar',55.00,95,3),(20,'Pilates Topu',179.90,110,5),
                (21,'Bluetooth Hoparlor',599.90,65,1),(22,'Kadın Ceket',899.90,85,2),
                (23,'Çocuk Ayakkabı',299.90,130,2),(24,'Ansiklopedi Seti',199.90,40,3),
                (25,'Bardak Seti',129.90,200,4)`);
            // Musteriler
            db.run(`INSERT INTO musteriler VALUES
                (1,'Ali','Veli','ali@email.com','İstanbul','05301234567'),
                (2,'Ayşe','Demir','ayse@email.com','Ankara','05412345678'),
                (3,'Mehmet','Kara','mehmet@email.com','İzmir','05523456789'),
                (4,'Fatma','Ak','fatma@email.com','Bursa','05634567890'),
                (5,'Hasan','Beyaz','hasan@email.com','İstanbul','05745678901'),
                (6,'Zeynep','Gül','zeynep@email.com','Antalya','05856789012'),
                (7,'Emre','Tan','emre@email.com','İstanbul','05967890123'),
                (8,'Selin','Yıldız','selin@email.com','Ankara','05078901234'),
                (9,'Burak','Şen','burak@email.com','Trabzon','05189012345'),
                (10,'Deniz','Koç','deniz@email.com','İzmir','05290123456'),
                (11,'Gökhan','Yıldız','gokhan@email.com','Konya','05301112233'),
                (12,'Melike','Sarı','melike@email.com','Kayseri','05412223344'),
                (13,'Cem','Polat','cem@email.com','Gaziantep','05523334455'),
                (14,'Ayşenur','Kaya','aysenur@email.com','İstanbul','05634445566'),
                (15,'Baran','Aydın','baran@email.com','Ankara','05745556677')`);
            // Siparisler
            db.run(`INSERT INTO siparisler VALUES
                (1,1,'2024-01-15',9299.89,'Teslim Edildi'),(2,1,'2024-02-20',1299.00,'Teslim Edildi'),
                (3,2,'2024-01-18',25399.80,'Teslim Edildi'),(4,2,'2024-03-10',449.80,'Kargoda'),
                (5,3,'2024-02-01',8999.99,'Teslim Edildi'),(6,3,'2024-03-15',89.90,'Teslim Edildi'),
                (7,4,'2024-01-25',3898.90,'Teslim Edildi'),(8,5,'2024-02-14',599.90,'Teslim Edildi'),
                (9,5,'2024-03-01',12999.00,'Kargoda'),(10,6,'2024-02-28',1149.80,'Teslim Edildi'),
                (11,7,'2024-03-05',6499.50,'Hazırlanıyor'),(12,7,'2024-03-12',249.90,'Teslim Edildi'),
                (13,8,'2024-01-30',899.90,'Teslim Edildi'),(14,8,'2024-03-08',45.00,'Teslim Edildi'),
                (15,9,'2024-02-10',2199.00,'İptal Edildi'),(16,9,'2024-03-20',149.90,'Kargoda'),
                (17,10,'2024-01-05',24999.90,'Teslim Edildi'),(18,10,'2024-02-22',399.90,'Teslim Edildi'),
                (19,1,'2024-03-25',6499.50,'Hazırlanıyor'),(20,3,'2024-03-28',1598.90,'Kargoda'),
                (21,11,'2024-02-05',3499.00,'Teslim Edildi'),(22,11,'2024-03-18',349.90,'Teslim Edildi'),
                (23,12,'2024-01-22',1179.80,'Teslim Edildi'),(24,13,'2024-02-28',599.90,'Kargoda'),
                (25,14,'2024-03-10',55.00,'Teslim Edildi'),(26,14,'2024-03-22',3499.00,'Hazırlanıyor'),
                (27,15,'2024-01-15',899.90,'Teslim Edildi'),(28,15,'2024-03-30',429.80,'İptal Edildi')`);
            // Siparis Detaylari
            db.run(`INSERT INTO siparis_detaylari VALUES
                (1,1,1,1,8999.99),(2,1,7,2,149.90),(3,2,3,1,1299.00),(4,3,2,1,24999.90),
                (5,3,5,1,399.90),(6,4,5,1,399.90),(7,4,9,1,45.00),(8,4,10,1,69.90),
                (9,5,1,1,8999.99),(10,6,8,1,89.90),(11,7,14,2,899.90),(12,7,15,1,249.90),
                (13,7,7,3,149.90),(14,8,6,1,599.90),(15,9,12,1,12999.00),(16,10,3,1,1299.00),
                (17,10,15,1,249.90),(18,11,4,1,6499.50),(19,12,15,1,249.90),
                (20,13,14,1,899.90),(21,14,9,1,45.00),(22,15,13,1,2199.00),(23,16,7,1,149.90),
                (24,17,2,1,24999.90),(25,18,5,1,399.90),(26,19,4,1,6499.50),
                (27,20,3,1,1299.00),(28,20,7,2,149.90),
                (29,21,16,1,3499.00),(30,22,17,1,349.90),(31,23,18,2,279.90),(32,23,21,1,599.90),
                (33,24,21,1,599.90),(34,25,19,1,55.00),(35,26,16,1,3499.00),
                (36,27,14,1,899.90),(37,28,20,1,179.90),(38,28,15,1,249.90)`);
        },

        kutuphane: function (db) {
            db.run(`CREATE TABLE IF NOT EXISTS yazarlar (
                yazar_id INTEGER PRIMARY KEY, ad TEXT NOT NULL, soyad TEXT NOT NULL, ulke TEXT
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS kitaplar (
                kitap_id INTEGER PRIMARY KEY, baslik TEXT NOT NULL, yazar_id INTEGER,
                yayin_yili INTEGER, tur TEXT, sayfa_sayisi INTEGER,
                FOREIGN KEY(yazar_id) REFERENCES yazarlar(yazar_id)
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS uyeler (
                uye_id INTEGER PRIMARY KEY, ad TEXT NOT NULL, soyad TEXT NOT NULL,
                email TEXT, kayit_tarihi TEXT, uyelik_turu TEXT DEFAULT 'Standart'
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS odunc_kayitlari (
                kayit_id INTEGER PRIMARY KEY, kitap_id INTEGER, uye_id INTEGER,
                odunc_tarihi TEXT, iade_tarihi TEXT, durum TEXT DEFAULT 'Ödünç Verildi',
                FOREIGN KEY(kitap_id) REFERENCES kitaplar(kitap_id),
                FOREIGN KEY(uye_id) REFERENCES uyeler(uye_id)
            )`);
            // Yazarlar
            db.run(`INSERT INTO yazarlar VALUES
                (1,'Orhan','Pamuk','Türkiye'),(2,'Elif','Şafak','Türkiye'),
                (3,'Sabahattin','Ali','Türkiye'),(4,'Yaşar','Kemal','Türkiye'),
                (5,'Ahmet','Ümit','Türkiye'),(6,'Fyodor','Dostoyevski','Rusya'),
                (7,'Gabriel','García Márquez','Kolombiya'),(8,'Paulo','Coelho','Brezilya')`);
            // Kitaplar
            db.run(`INSERT INTO kitaplar VALUES
                (1,'Kürk Mantolu Madonna',3,1943,'Roman',160),
                (2,'İnce Memed',4,1955,'Roman',468),
                (3,'Benim Adım Kırmızı',1,1998,'Roman',475),
                (4,'Masumiyet Müzesi',1,2008,'Roman',592),
                (5,'İstanbul Hatırası',5,2003,'Polisiye',384),
                (6,'Aşk',2,2009,'Roman',360),
                (7,'10 Minutes 38 Seconds in This Strange World',2,2019,'Roman',320),
                (8,'Suç ve Ceza',6,1866,'Roman',672),
                (9,'Karamazov Kardeşler',6,1880,'Roman',824),
                (10,'Yüzyıllık Yalnızlık',7,1967,'Roman',417),
                (11,'Simyacı',8,1988,'Roman',188),
                (12,'Beyoğlunun En Güzel Abisi',5,2012,'Polisiye',432),
                (13,'Kar',1,2002,'Roman',464),
                (14,'Havva',2,2021,'Roman',400),
                (15,'Kuyucaklı Yusuf',3,1937,'Roman',192),
                (16,'İçimizdeki Şeytan',3,1940,'Roman',248),
                (17,'Yer Demir Gök Bakır',4,1963,'Roman',380),
                (18,'Budala',6,1869,'Roman',620),
                (19,'Kolera Günlerinde Aşk',7,1985,'Roman',368),
                (20,'Programlama Mantığı ve Tekniği',NULL,2020,'Ders Kitabı',450)`);
            // Uyeler
            db.run(`INSERT INTO uyeler VALUES
                (1,'Ahmet','Kaya','ahmet@email.com','2023-01-10','Premium'),
                (2,'Seda','Demir','seda@email.com','2023-02-15','Standart'),
                (3,'Murat','Yılmaz','murat@email.com','2023-03-20','Standart'),
                (4,'Elif','Çetin','elif@email.com','2023-01-05','Premium'),
                (5,'Okan','Şahin','okan@email.com','2023-04-12','Standart'),
                (6,'Defne','Arslan','defne@email.com','2023-05-18','Premium'),
                (7,'Cem','Koç','cem@email.com','2023-06-25','Standart'),
                (8,'Berna','Aydın','berna@email.com','2023-02-28','Standart'),
                (9,'Kaan','Özdemir','kaan@email.com','2023-07-14','Premium'),
                (10,'Nisa','Kurt','nisa@email.com','2023-08-30','Standart')`);
            // Odunc Kayitlari
            db.run(`INSERT INTO odunc_kayitlari VALUES
                (1,1,1,'2024-01-05','2024-01-20','İade Edildi'),(2,3,1,'2024-01-25','2024-02-10','İade Edildi'),
                (3,8,2,'2024-01-10','2024-02-05','İade Edildi'),(4,11,2,'2024-02-10','2024-03-01','İade Edildi'),
                (5,5,3,'2024-01-15',NULL,'Ödünç Verildi'),(6,2,3,'2024-02-20','2024-03-10','İade Edildi'),
                (7,6,4,'2024-01-20','2024-02-15','İade Edildi'),(8,10,4,'2024-02-18','2024-03-05','İade Edildi'),
                (9,9,5,'2024-02-01',NULL,'Ödünç Verildi'),(10,1,5,'2024-03-01','2024-03-15','İade Edildi'),
                (11,4,6,'2024-01-08','2024-01-28','İade Edildi'),(12,12,6,'2024-02-12','2024-03-02','İade Edildi'),
                (13,7,7,'2024-01-30',NULL,'Ödünç Verildi'),(14,15,7,'2024-02-25','2024-03-12','İade Edildi'),
                (15,13,8,'2024-02-05','2024-02-28','İade Edildi'),(16,3,8,'2024-03-05',NULL,'Ödünç Verildi'),
                (17,16,9,'2024-01-12','2024-02-01','İade Edildi'),(18,8,9,'2024-02-08','2024-03-01','İade Edildi'),
                (19,19,9,'2024-03-10',NULL,'Ödünç Verildi'),(20,14,10,'2024-01-22','2024-02-12','İade Edildi'),
                (21,2,10,'2024-02-15',NULL,'Ödünç Verildi'),(22,20,1,'2024-03-01','2024-03-20','İade Edildi'),
                (23,17,2,'2024-03-08',NULL,'Ödünç Verildi'),(24,11,3,'2024-03-12','2024-03-28','İade Edildi'),
                (25,5,4,'2024-03-15',NULL,'Ödünç Verildi'),(26,18,5,'2024-03-18',NULL,'Ödünç Verildi'),
                (27,6,6,'2024-03-20',NULL,'Ödünç Verildi'),(28,1,7,'2024-03-22',NULL,'Ödünç Verildi'),
                (29,10,8,'2024-03-25',NULL,'Ödünç Verildi'),(30,4,9,'2024-03-28',NULL,'Ödünç Verildi')`);
        }
    };

    async function init() {
        SQL = await initSqlJs({
            locateFile: file => `https://cdn.jsdelivr.net/npm/sql.js@1.12.0/dist/${file}`
        });
        resetDatabase('okul');
        resetDatabase('eticaret');
        resetDatabase('kutuphane');
    }

    function resetDatabase(name) {
        if (databases[name]) { try { databases[name].close(); } catch(e){} }
        databases[name] = new SQL.Database();
        SEED[name](databases[name]);
    }

    function executeQuery(dbName, sql) {
        try {
            const db = databases[dbName];
            if (!db) return { error: `Veritabanı bulunamadı: ${dbName}` };
            const results = db.exec(sql);
            if (results.length === 0) {
                // Check if it was a modification statement
                const changes = db.getRowsModified();
                if (changes > 0) {
                    return { columns: ['Etkilenen Satır'], values: [[changes]], message: `${changes} satır etkilendi.` };
                }
                return { columns: [], values: [], message: 'Sorgu başarıyla çalıştırıldı. Sonuç yok.' };
            }
            return { columns: results[0].columns, values: results[0].values };
        } catch (e) {
            return { error: translateError(e.message) };
        }
    }

    function getSchema(dbName) {
        const db = databases[dbName];
        if (!db) return [];
        const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
        if (tables.length === 0) return [];
        const schema = [];
        for (const row of tables[0].values) {
            const tableName = row[0];
            const cols = db.exec(`PRAGMA table_info('${tableName}')`);
            const fks = db.exec(`PRAGMA foreign_key_list('${tableName}')`);
            const columns = cols.length > 0 ? cols[0].values.map(c => {
                const fk = fks.length > 0 ? fks[0].values.find(f => f[3] === c[1]) : null;
                return {
                    name: c[1], type: c[2] || 'TEXT',
                    notNull: c[3] === 1, pk: c[5] === 1,
                    fk: fk ? `→ ${fk[2]}.${fk[4]}` : null
                };
            }) : [];
            schema.push({ name: tableName, columns });
        }
        return schema;
    }

    function translateError(msg) {
        if (msg.includes('no such table')) return '❌ Hata: Belirtilen tablo bulunamadı. Tablo adını kontrol edin.';
        if (msg.includes('no such column')) return '❌ Hata: Belirtilen sütun bulunamadı. Sütun adını kontrol edin.';
        if (msg.includes('syntax error') || msg.includes('near')) return '❌ Söz dizimi hatası: SQL komutunuzu kontrol edin. Eksik virgül, parantez veya yazım hatası olabilir.';
        if (msg.includes('UNIQUE constraint')) return '❌ Hata: Bu değer zaten mevcut. UNIQUE kısıtlaması ihlal edildi.';
        if (msg.includes('NOT NULL constraint')) return '❌ Hata: Zorunlu alan boş bırakılamaz. NOT NULL kısıtlaması ihlal edildi.';
        if (msg.includes('FOREIGN KEY constraint')) return '❌ Hata: Referans bütünlüğü ihlali. İlgili tabloda eşleşen kayıt bulunamadı.';
        if (msg.includes('datatype mismatch')) return '❌ Hata: Veri türü uyuşmazlığı. Doğru veri türünü kullandığınızdan emin olun.';
        return '❌ Hata: ' + msg;
    }

    return { init, resetDatabase, executeQuery, getSchema };
})();
