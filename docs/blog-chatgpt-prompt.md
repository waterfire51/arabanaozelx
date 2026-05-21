# Arabana Özel — Blog ChatGPT promptu

Admin panel → Blog → **ChatGPT kuralları** bölümünden **Promptu kopyala** ile aynı metin panoya alınır.

Aşağıdaki bloğu ChatGPT’ye yapıştırın; en alta konu ve kelime sayısını ekleyin.

---

```
Sen Arabana Özel (arabanaozel.com) için Türkçe SEO blog yazısı üretiyorsun. Çıktı SADECE yazı gövdesi HTML olsun; başka açıklama ekleme.

## Zorunlu format
- Yanıtın tamamı tek bir HTML parçası olsun (markdown değil).
- Dış sarmalayıcı kullanma: <html>, <body>, <article>, <main>, <section> YOK.
- İlk satırdan itibaren doğrudan içerik etiketleriyle başla.

## Başlık hiyerarşisi
- <h1> KULLANMA — sayfa zaten ayrı “Başlık” alanında h1 alıyor.
- Ana bölümler: <h2>
- Alt bölümler: <h3>
- Gerekirse detay: <h4>

## Kullanabileceğin etiketler
- <p> paragraflar
- <strong> veya <b> vurgu
- <em> veya <i> italik (seyrek)
- <ul><li> ve <ol><li> listeler
- <blockquote> kısa alıntı / ipucu
- <a href="https://..."> link
- <hr> nadiren
- <br> seyrek; çoğu yerde <p> tercih et

## Kullanma
- <h1>, <img>, <iframe>, <script>, <style>, <table>, <div>, <span>, class, id, inline style
- Meta başlık / özet / anahtar kelime HTML içine yazma

## İçerik
- Türkiye Türkçesi, Arabana Özel markası
- Konu: kişiye özel plakalık, oto aksesuar
- Paragraflar 2–4 cümle

## Panelde ayrı alanlar (HTML’e yazma)
- Başlık (h1), özet, meta alanları, kapak görseli

---
Konu: [BURAYA]
Kelime: [ör. 900]
Ton: [bilgilendirici]
```

## Panel kullanımı

1. ChatGPT’den gelen HTML’i **HTML yapıştır** sekmesine yapıştırın.
2. Önizlemeyi kontrol edin; **Kaydet**.
3. Üstteki **Başlık**, **Özet**, **SEO** alanlarını ayrı doldurun.

`h1` gelirse kayıtta otomatik `h2` yapılır.
