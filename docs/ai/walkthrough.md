# Yabbok Web Redesign Walkthrough

Telegram stilini yansıtan kapsamlı arayüz güncellemeleri tamamlandı! 🚀

## Yapılan Değişiklikler

### 1. Telegram Stil Yan Menü (Sidebar Drawer)
- Ana sayfada sol üstteki hamburger menü ikonuna basıldığında açılan profesyonel bir yan panel eklendi.
- Panelde profil özeti, telefon numarası ve "Cüzdan", "Ayarlar", "Kaydedilenler" gibi kısayollar yer alıyor.

### 2. Detaylı Profil Sayfası
- Profili Telegram'daki kişi detay sayfasıyla aynı yapıya getirdik.
- Üstte büyük profil resmi, "online" durumu ve altında "Bilgi" (Info) bölümü yer alıyor.
- Gönderiler (Posts) için tab yapısı ve boş durum placeholder'ları eklendi.

### 3. Liste Tabanlı Cüzdan Ayarları
- Wallet sayfası görsellerdeki gibi liste öğelerinden oluşan şık bir yapıya büründü.
- "Passcode & Fingerprint", "Identification Level" ve "Support" bölümleri tüm ikon ve statüleriyle (`Basic`, `On` vb.) uygulandı.

## Test Adımları
1. **Yan Menü:** Ana sayfadaki menü butonuna basın ve panelin açıldığını görün.
2. **Profil:** Yan menüden veya alt bardan Profile gidin, yeni "Info" kartlarını ve tab yapısını kontrol edin.
3. **Cüzdan:** Alt bardaki cüzdan ikonuna basarak yeni liste görünümünü inceleyin.

## Teknik Detaylar
- Tüm ikonlar `lucide-react` ve `FontAwesome` kullanılarak Telegram'dakine en yakın şekilde seçildi.
- Renk paleti Telegram'ın koyu modundaki (`#17212B`, `#0B0F19`) tonlara sabitlendi.
