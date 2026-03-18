# Yabbok Web Phase 3 Plan (Telegram Style Redesign)

Gönderdiğiniz Telegram ekran görüntülerini inceledim. Uygulamanın navigasyon ve detay sayfalarını Telegram'ın o meşhur, kullanışlı ve temiz (list-based) arayüzüne yaklaştıracağız.

## User Review Required
Bu aşamada yan menü (Drawer) eklenecek ve mevcut sayfaların düzeni daha profesyonel bir liste yapısına dönüştürülecektir.

Aşağıdaki planı onaylarsanız geliştirmelere başlayacağım.

## Proposed Changes

### 1. Yan Menü (Side Drawer)
#### [NEW] `src/components/layout/Sidebar.tsx`
- Sol taraftan açılan bir menü (drawer) eklenecek.
- İçerisinde Profil özeti, Cüzdan, Yeni Grup, Ayarlar ve Gece/Gündüz modu geçişi olacak.
- `Header.tsx` bileşenine bu menüyü açacak bir hamburger menü ikonu yerleştirilecek.

### 2. Gelişmiş Profil Sayfası
#### [MODIFY] `src/app/profile/page.tsx`
- Telegram'daki gibi üstte büyük profil fotoğrafı ve altında "Bilgi" (Info) bölümü olacak.
- Telefon numarası ve kullanıcı adı (@kullanici) gibi detaylar liste şeklinde sunulacak.
- Telegram'daki "Beiträge" (Gönderiler) benzeri bir tab yapısı eklenecek.

### 3. Cüzdan Ayarları ve Listesi
#### [MODIFY] `src/app/wallet/page.tsx` (Yeni veya Mevcut)
- Gönderdiğiniz ekran görüntüsündeki "Passcode", "Language", "Default Currency" gibi ayarların olduğu liste yapısı uygulanacak.
- Görseldeki ikonlar ve renk paleti (yeşil, mor, sarı ikon arka planları) kullanılacak.

## Verification Plan

### Automated / Manual Verification
- Menünün sol taraftan pürüzsüz bir animasyonla açılıp kapandığı kontrol edilecek.
- Profil ve Cüzdan sayfalarındaki liste öğelerinin tıklandığında doğru tepki verdiği doğrulanacak.
- Responsive tasarımın 390px genişliğinde mükemmel durduğu teyit edilecek.
