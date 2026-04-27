// ========== INTERMEDIATE CURRICULUM ==========
const IntermediateLessons = [
    {
        id: "9.1", topicId: 9, level: "intermediate",
        title: "Karşılaştırma Operatörleri — Temel",
        topicTitle: "Karşılaştırma Operatörleri",
        description: `Karşılaştırma operatörleri WHERE ile birlikte kullanılarak verileri filtrelemek için kullanılır:<br><br>
• <code>=</code> Eşit<br>• <code>!=</code> veya <code>&lt;&gt;</code> Eşit değil<br>
• <code>&lt;</code> Küçük<br>• <code>&gt;</code> Büyük<br>
• <code>&lt;=</code> Küçük eşit<br>• <code>&gt;=</code> Büyük eşit`,
        task: "Notlar tablosundan ortalaması 80'den büyük olan kayıtları listeleyin.",
        database: "okul",
        initialCode: "",
        hints: ["SELECT * FROM notlar WHERE ... şeklinde başlayın.", "ortalama > 80 koşulunu kullanın."],
        solution: "SELECT * FROM notlar WHERE ortalama > 80;",
        expectedQuery: "SELECT * FROM notlar WHERE ortalama > 80;",
        checkType: "result"
    },
    {
        id: "9.2", topicId: 9, level: "intermediate",
        title: "Karşılaştırma Operatörleri — BETWEEN ve IN",
        topicTitle: "Karşılaştırma Operatörleri",
        description: `<code>BETWEEN</code> bir aralıktaki değerleri filtreler:<br>
<code>WHERE fiyat BETWEEN 50 AND 100</code><br><br>
<code>IN</code> belirli değerlerden birini kontrol eder:<br>
<code>WHERE sehir IN ('İstanbul', 'Ankara')</code>`,
        task: "Ürünler tablosundan fiyatı 100 ile 1000 TL arasında olan ürünleri listeleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["BETWEEN operatörünü kullanın.", "WHERE fiyat BETWEEN 100 AND 1000"],
        solution: "SELECT * FROM urunler WHERE fiyat BETWEEN 100 AND 1000;",
        expectedQuery: "SELECT * FROM urunler WHERE fiyat BETWEEN 100 AND 1000;",
        checkType: "result"
    },
    {
        id: "10.1", topicId: 10, level: "intermediate",
        title: "WHERE — Temel Filtreleme",
        topicTitle: "WHERE Şart İfadesi",
        description: `<code>WHERE</code> ifadesi sorgu sonuçlarını filtrelemek için kullanılır. SELECT, UPDATE ve DELETE komutlarıyla birlikte çalışır.<br><br>
<code>SELECT * FROM tablo WHERE koşul;</code>`,
        task: "Müşteriler tablosundan İstanbul'da yaşayan müşterileri listeleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["WHERE sehir = '...' şeklinde yazın.", "Metin değerlerini tek tırnak içinde yazın."],
        solution: "SELECT * FROM musteriler WHERE sehir = 'İstanbul';",
        expectedQuery: "SELECT * FROM musteriler WHERE sehir = 'İstanbul';",
        checkType: "result"
    },
    {
        id: "10.2", topicId: 10, level: "intermediate",
        title: "WHERE — Birden Fazla Koşul",
        topicTitle: "WHERE Şart İfadesi",
        description: `WHERE ile birden fazla koşul kullanabilirsiniz. Koşulları <code>AND</code> veya <code>OR</code> ile bağlayın.<br><br>
<code>WHERE koşul1 AND koşul2</code>`,
        task: "Siparişler tablosundan durumu 'Teslim Edildi' olan ve toplam tutarı 1000 TL'den büyük olan siparişleri listeleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["İki koşulu AND ile bağlayın.", "WHERE durum = 'Teslim Edildi' AND toplam_tutar > 1000"],
        solution: "SELECT * FROM siparisler WHERE durum = 'Teslim Edildi' AND toplam_tutar > 1000;",
        expectedQuery: "SELECT * FROM siparisler WHERE durum = 'Teslim Edildi' AND toplam_tutar > 1000;",
        checkType: "result"
    },
    {
        id: "11.1", topicId: 11, level: "intermediate",
        title: "Mantıksal Operatörler — AND, OR",
        topicTitle: "Mantıksal Operatörler",
        description: `Mantıksal operatörler birden fazla koşulu birleştirmek için kullanılır:<br><br>
• <code>AND</code> — Her iki koşul da doğru olmalı<br>
• <code>OR</code> — Koşullardan en az biri doğru olmalı<br>
• <code>NOT</code> — Koşulun tersini alır`,
        task: "Ürünler tablosundan kategori_id'si 1 (Elektronik) VEYA 5 (Spor) olan ürünleri listeleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["WHERE ... OR ... kullanın.", "kategori_id = 1 OR kategori_id = 5"],
        solution: "SELECT * FROM urunler WHERE kategori_id = 1 OR kategori_id = 5;",
        expectedQuery: "SELECT * FROM urunler WHERE kategori_id = 1 OR kategori_id = 5;",
        checkType: "result"
    },
    {
        id: "11.2", topicId: 11, level: "intermediate",
        title: "Mantıksal Operatörler — NOT",
        topicTitle: "Mantıksal Operatörler",
        description: `<code>NOT</code> operatörü bir koşulun tersini alır:<br><br>
<code>WHERE NOT koşul</code><br>
<code>WHERE sütun NOT IN (değer1, değer2)</code><br>
<code>WHERE sütun NOT BETWEEN a AND b</code>`,
        task: "Ürünler tablosundan kategorisi 'Kitap' (kategori_id = 3) OLMAYAN ürünleri listeleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["WHERE kategori_id != 3 veya WHERE NOT kategori_id = 3 kullanın.", "!= ve <> aynı anlama gelir."],
        solution: "SELECT * FROM urunler WHERE kategori_id != 3;",
        expectedQuery: "SELECT * FROM urunler WHERE kategori_id != 3;",
        checkType: "result"
    },
    {
        id: "12.1", topicId: 12, level: "intermediate",
        title: "Hesaplama Fonksiyonları — COUNT, SUM",
        topicTitle: "Hesaplama Fonksiyonları",
        description: `SQL'de toplama (aggregate) fonksiyonları verileri özetlemek için kullanılır:<br><br>
• <code>COUNT(*)</code> — Satır sayısını sayar<br>
• <code>SUM(sütun)</code> — Değerlerin toplamını hesaplar<br>
• <code>COUNT(DISTINCT sütun)</code> — Benzersiz değerleri sayar`,
        task: "Siparişler tablosundaki toplam sipariş sayısını ve toplam tutarların toplamını hesaplayın.",
        database: "eticaret",
        initialCode: "",
        hints: ["SELECT COUNT(*), SUM(toplam_tutar) FROM ... kullanın.", "Sütunlara AS ile takma ad verebilirsiniz."],
        solution: "SELECT COUNT(*) AS siparis_sayisi, SUM(toplam_tutar) AS toplam FROM siparisler;",
        expectedQuery: "SELECT COUNT(*) AS siparis_sayisi, SUM(toplam_tutar) AS toplam FROM siparisler;",
        checkType: "result"
    },
    {
        id: "12.2", topicId: 12, level: "intermediate",
        title: "Hesaplama Fonksiyonları — AVG, MIN, MAX",
        topicTitle: "Hesaplama Fonksiyonları",
        description: `Diğer önemli toplama fonksiyonları:<br><br>
• <code>AVG(sütun)</code> — Ortalama değer<br>
• <code>MIN(sütun)</code> — En küçük değer<br>
• <code>MAX(sütun)</code> — En büyük değer`,
        task: "Notlar tablosundan ortalama notu (ortalama sütunu), en düşük ve en yüksek ortalamayı hesaplayın.",
        database: "okul",
        initialCode: "",
        hints: ["SELECT AVG(...), MIN(...), MAX(...) FROM ... kullanın.", "Sütun adı 'ortalama' dır."],
        solution: "SELECT AVG(ortalama) AS ort, MIN(ortalama) AS en_dusuk, MAX(ortalama) AS en_yuksek FROM notlar;",
        expectedQuery: "SELECT AVG(ortalama) AS ort, MIN(ortalama) AS en_dusuk, MAX(ortalama) AS en_yuksek FROM notlar;",
        checkType: "result"
    },
    {
        id: "12.3", topicId: 12, level: "intermediate",
        title: "Hesaplama Fonksiyonları — GROUP BY",
        topicTitle: "Hesaplama Fonksiyonları",
        description: `<code>GROUP BY</code> verileri gruplandırarak her grup için ayrı hesaplama yapar:<br><br>
<code>SELECT sütun, COUNT(*) FROM tablo GROUP BY sütun;</code><br><br>
<code>HAVING</code> ise GROUP BY sonuçlarını filtrelemek için kullanılır.`,
        task: "Ürünler tablosunda her kategoride kaç ürün olduğunu bulun. Kategori ID'sine göre gruplandırın.",
        database: "eticaret",
        initialCode: "",
        hints: ["SELECT kategori_id, COUNT(*) FROM ... GROUP BY ... kullanın.", "GROUP BY kategori_id yazın."],
        solution: "SELECT kategori_id, COUNT(*) AS urun_sayisi FROM urunler GROUP BY kategori_id;",
        expectedQuery: "SELECT kategori_id, COUNT(*) AS urun_sayisi FROM urunler GROUP BY kategori_id;",
        checkType: "result"
    },
    {
        id: "13.1", topicId: 13, level: "intermediate",
        title: "LIKE — Temel Arama",
        topicTitle: "LIKE Komutu",
        description: `<code>LIKE</code> operatörü metin arama için kullanılır. Joker karakterler:<br><br>
• <code>%</code> — Sıfır veya daha fazla karakter<br>
• <code>_</code> — Tam olarak bir karakter<br><br>
<code>WHERE ad LIKE 'A%'</code> → A ile başlayanlar<br>
<code>WHERE ad LIKE '%kan'</code> → 'kan' ile bitenler<br>
<code>WHERE ad LIKE '%met%'</code> → İçinde 'met' geçenler`,
        task: "Yazarlar tablosundan soyadı 'A' harfi ile başlayan yazarları bulun.",
        database: "kutuphane",
        initialCode: "",
        hints: ["WHERE soyad LIKE 'A%' kullanın.", "% işareti sıfır veya daha fazla karakter anlamına gelir."],
        solution: "SELECT * FROM yazarlar WHERE soyad LIKE 'A%';",
        expectedQuery: "SELECT * FROM yazarlar WHERE soyad LIKE 'A%';",
        checkType: "result"
    },
    {
        id: "13.2", topicId: 13, level: "intermediate",
        title: "LIKE — İleri Arama",
        topicTitle: "LIKE Komutu",
        description: `LIKE operatörü ile daha karmaşık aramalar yapabilirsiniz:<br><br>
<code>'_a%'</code> → İkinci harfi 'a' olanlar<br>
<code>'%an%'</code> → İçinde 'an' geçenler<br>
<code>'___'</code> → Tam 3 karakter uzunluğundakiler`,
        task: "Kitaplar tablosundan başlığında 'Mantolu' geçen kitapları bulun.",
        database: "kutuphane",
        initialCode: "",
        hints: ["WHERE baslik LIKE '%...%' kalıbını kullanın.", "'Mantolu' kelimesini % işaretleri arasına yazın."],
        solution: "SELECT * FROM kitaplar WHERE baslik LIKE '%Mantolu%';",
        expectedQuery: "SELECT * FROM kitaplar WHERE baslik LIKE '%Mantolu%';",
        checkType: "result"
    },
    {
        id: "14.1", topicId: 14, level: "intermediate",
        title: "ORDER BY — Tek Sütun Sıralama",
        topicTitle: "ORDER BY Komutu",
        description: `<code>ORDER BY</code> sorgu sonuçlarını sıralamak için kullanılır:<br><br>
• <code>ASC</code> — Küçükten büyüğe (varsayılan)<br>
• <code>DESC</code> — Büyükten küçüğe<br><br>
<code>SELECT * FROM tablo ORDER BY sütun DESC;</code>`,
        task: "Kitaplar tablosundaki kitapları yayın yılına göre en yeniden en eskiye sıralayın.",
        database: "kutuphane",
        initialCode: "",
        hints: ["ORDER BY yayin_yili DESC kullanın.", "DESC büyükten küçüğe sıralama yapar."],
        solution: "SELECT * FROM kitaplar ORDER BY yayin_yili DESC;",
        expectedQuery: "SELECT * FROM kitaplar ORDER BY yayin_yili DESC;",
        checkType: "result"
    },
    {
        id: "14.2", topicId: 14, level: "intermediate",
        title: "ORDER BY — Çoklu Sıralama ve LIMIT",
        topicTitle: "ORDER BY Komutu",
        description: `Birden fazla sütuna göre sıralama yapabilir ve <code>LIMIT</code> ile sonuç sayısını sınırlayabilirsiniz:<br><br>
<code>SELECT * FROM tablo ORDER BY sütun1 ASC, sütun2 DESC LIMIT 5;</code>`,
        task: "Ürünler tablosundaki ürünleri fiyata göre en pahalıdan en ucuza sıralayın ve sadece ilk 5 tanesini gösterin.",
        database: "eticaret",
        initialCode: "",
        hints: ["ORDER BY fiyat DESC LIMIT 5 kullanın.", "LIMIT sorgunun en sonuna yazılır."],
        solution: "SELECT * FROM urunler ORDER BY fiyat DESC LIMIT 5;",
        expectedQuery: "SELECT * FROM urunler ORDER BY fiyat DESC LIMIT 5;",
        checkType: "result"
    },
    {
        id: "15.1", topicId: 15, level: "intermediate",
        title: "UPDATE — Tek Kayıt Güncelleme",
        topicTitle: "UPDATE Komutu",
        description: `<code>UPDATE</code> mevcut verileri güncellemek için kullanılır:<br><br>
<code>UPDATE tablo SET sütun = yeni_değer WHERE koşul;</code><br><br>
⚠️ <strong>WHERE olmadan UPDATE yaparsanız tüm satırlar güncellenir!</strong>`,
        task: "Ürünler tablosunda 'Akıllı Telefon X' ürününün fiyatını 9499.99 olarak güncelleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["UPDATE urunler SET fiyat = ... WHERE ... kullanın.", "WHERE urun_adi = 'Akıllı Telefon X' koşulunu ekleyin."],
        solution: "UPDATE urunler SET fiyat = 9499.99 WHERE urun_adi = 'Akıllı Telefon X';",
        checkType: "contains-value",
        checkQuery: "SELECT fiyat FROM urunler WHERE urun_adi = 'Akıllı Telefon X';",
        checkValue: "9499.99"
    },
    {
        id: "15.2", topicId: 15, level: "intermediate",
        title: "UPDATE — Koşullu Güncelleme",
        topicTitle: "UPDATE Komutu",
        description: `Birden fazla kaydı koşula göre güncelleyebilirsiniz. Birden fazla sütunu da aynı anda güncelleyebilirsiniz:<br><br>
<code>UPDATE tablo SET sütun1 = değer1, sütun2 = değer2 WHERE koşul;</code>`,
        task: "Ürünler tablosunda kategorisi 'Spor' (kategori_id = 5) olan tüm ürünlerin stokunu 100 olarak güncelleyin.",
        database: "eticaret",
        initialCode: "",
        hints: ["UPDATE urunler SET stok = 100 WHERE ... kullanın.", "WHERE kategori_id = 5 koşulunu yazın."],
        solution: "UPDATE urunler SET stok = 100 WHERE kategori_id = 5;",
        checkType: "contains-value",
        checkQuery: "SELECT stok FROM urunler WHERE kategori_id = 5;",
        checkValue: "100"
    },
    {
        id: "16.1", topicId: 16, level: "intermediate",
        title: "DELETE — Kayıt Silme",
        topicTitle: "DELETE Komutu",
        description: `<code>DELETE</code> komutu tablodaki kayıtları silmek için kullanılır:<br><br>
<code>DELETE FROM tablo WHERE koşul;</code><br><br>
⚠️ <strong>WHERE olmadan DELETE yaparsanız tablodaki TÜM veriler silinir!</strong>`,
        task: "Siparişler tablosundan durumu 'İptal Edildi' olan siparişleri silin.",
        database: "eticaret",
        initialCode: "",
        hints: ["DELETE FROM siparisler WHERE ... kullanın.", "WHERE durum = 'İptal Edildi' yazın."],
        solution: "DELETE FROM siparisler WHERE durum = 'İptal Edildi';",
        checkType: "run-check",
        checkQuery: "SELECT COUNT(*) as sayi FROM siparisler WHERE durum = 'İptal Edildi';",
        checkValue: "0"
    }
];
