# 🔮 Vibrio - Yapay Zeka Destekli İlişki Analisti

Vibrio, Jungiyen psikoloji ve gelişmiş astroloji algoritmalarını kullanarak ilişkileri analiz eden modern bir web uygulamasıdır. Google Gemini 2.5 Flash modeli ile güçlendirilmiştir.

## 🛠️ Bilgisayarınızda Çalıştırma (Lokal Kurulum)

Bu projeyi bilgisayarınıza indirdikten sonra çalıştırmak için:

1.  **Dosyaları İndirin:** Proje klasörünü bilgisayarınızda açın.
2.  **Terminali Açın:** Klasörün içinde sağ tıklayıp "Terminalde Aç" diyebilir veya VS Code kullanıyorsanız `Ctrl + j` ile terminali açabilirsiniz.
3.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```
4.  **API Anahtarını Ayarlayın:**
    Ana dizinde `.env` adında yeni bir dosya oluşturun ve içine Google AI Studio'dan aldığınız anahtarı yapıştırın:
    ```env
    VITE_GOOGLE_API_KEY=AIzaSy...AnahtarinizBuraya...
    ```
5.  **Projeyi Başlatın:**
    ```bash
    npm run dev
    ```

---

## 🚀 GitHub'a Manuel Yükleme Rehberi

Bu projeyi kendi GitHub hesabınıza "sıfırdan" yüklemek için aşağıdaki adımları sırasıyla uygulayın.

### 1. GitHub'da Yeni Depo (Repo) Açın
*   [GitHub.com](https://github.com) adresine gidin.
*   Sağ üstten **+** işaretine basıp **New repository** seçin.
*   Repository name kısmına `vibrio-app` (veya istediğiniz bir isim) yazın.
*   "Public" seçin ve **Create repository** butonuna basın.

### 2. Terminal Komutlarını Uygulayın
Bilgisayarınızdaki proje klasöründe terminali açın ve şu komutları sırasıyla yazın:

```bash
# 1. Git'i başlatın
git init

# 2. Tüm dosyaları ekleyin
git add .

# 3. İlk kaydı oluşturun
git commit -m "İlk kurulum: Vibrio v1.0"

# 4. Ana dalı (branch) isimlendirin
git branch -M main

# 5. Kendi GitHub reponuzu bağlayın
# DİKKAT: Aşağıdaki linki kendi GitHub repo linkinizle değiştirin!
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git

# 6. Kodları yükleyin
git push -u origin main
```

### 3. Yayına Alma (Vercel)
Kodlarınız GitHub'a yüklendikten sonra:
1.  [Vercel.com](https://vercel.com)'a gidin.
2.  **Add New Project** butonuna tıklayın.
3.  GitHub hesabınızı seçip az önce yüklediğiniz `vibrio-app` reposunu seçin (Import).
4.  **Environment Variables** kısmını açın ve `VITE_GOOGLE_API_KEY` isminde API anahtarınızı oraya da ekleyin.
5.  **Deploy** butonuna basın.

---

## ⚠️ Önemli Not (Shopier Entegrasyonu)

Müşterinin ödeme yaptıktan sonra siteye dönüp raporu görebilmesi için:

1.  **Shopier Paneline** giriş yapın.
2.  **Mağaza Ayarları** > **Geri Dönüş URL (Return URL)** alanına sitenizin canlı adresini sonuna parametre ekleyerek yazın:
    `https://SITENIZIN-ADRESI.vercel.app/?payment=success`
