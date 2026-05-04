// ========== AUTHENTICATION & SYNC MODULE ==========
const AuthModule = (function () {
    // Firebase Projenizin Konfigürasyon Bilgileri
    const firebaseConfig = {
        apiKey: "AIzaSyCXnvLjxUVXHYFNoVH_BzJhDoYtGTslU7c",
        authDomain: "sqlogreniyorum.firebaseapp.com",
        projectId: "sqlogreniyorum",
        storageBucket: "sqlogreniyorum.firebasestorage.app",
        messagingSenderId: "179051755372",
        appId: "1:179051755372:web:b92dca7d4efeb71864e549"
    };

    if (!firebase.apps.length) {
        try {
            firebase.initializeApp(firebaseConfig);
        } catch (e) {
            console.error("Firebase başlatılamadı:", e);
        }
    }

    const auth = firebase.auth();
    const db = firebase.firestore();
    
    let currentUser = null;
    let isLoginMode = true; // true = Login, false = Register

    function init() {
        // Elements
        const btnShowLogin = document.getElementById('btn-show-login');
        const btnLogout = document.getElementById('btn-logout');
        const authModal = document.getElementById('auth-modal');
        const btnCloseAuth = document.getElementById('btn-close-auth');
        const authForm = document.getElementById('auth-form');
        const authSwitchLink = document.getElementById('auth-switch-link');
        const btnTeacherPanel = document.getElementById('btn-teacher-panel');
        
        // Listeners
        btnShowLogin.addEventListener('click', () => { authModal.classList.remove('hidden'); });
        btnCloseAuth.addEventListener('click', () => { authModal.classList.add('hidden'); });
        btnLogout.addEventListener('click', () => { auth.signOut(); });
        
        authSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            updateAuthModalUI();
        });

        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            const password = document.getElementById('auth-password').value;
            const name = document.getElementById('auth-name').value;
            const errorDiv = document.getElementById('auth-error');
            errorDiv.classList.add('hidden');

            try {
                if (isLoginMode) {
                    await auth.signInWithEmailAndPassword(email, password);
                } else {
                    const userCred = await auth.createUserWithEmailAndPassword(email, password);
                    // Firestore'da kullanıcı dökümanı oluştur
                    await db.collection('users').doc(userCred.user.uid).set({
                        email: email,
                        name: name || email.split('@')[0],
                        completedLessons: [],
                        lastActive: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
                authModal.classList.add('hidden');
                authForm.reset();
            } catch (error) {
                errorDiv.textContent = translateFirebaseError(error.code);
                errorDiv.classList.remove('hidden');
            }
        });

        // Yetki durumu değiştiğinde
        auth.onAuthStateChanged((user) => {
            currentUser = user;
            updateTopBarUI();
            
            if (user) {
                // Öğretmen kontrolü (Bunu daha sonra Firestore kurallarıyla da kısıtlayabilirsiniz)
                if (user.email === 'mhmtyzk@gmail.com') {
                    btnTeacherPanel.classList.remove('hidden');
                } else {
                    btnTeacherPanel.classList.add('hidden');
                }
                
                // İlerlemeyi buluttan çek
                syncProgressFromCloud();
                
                // Son aktif zamanı güncelle
                db.collection('users').doc(user.uid).update({
                    lastActive: firebase.firestore.FieldValue.serverTimestamp()
                }).catch(() => {}); // Eğer döküman yoksa hata fırlatır, görmezden gel
            }
        });
    }

    function updateAuthModalUI() {
        const title = document.getElementById('auth-modal-title');
        const submitBtn = document.getElementById('btn-auth-submit');
        const switchText = document.getElementById('auth-switch-text');
        const switchLink = document.getElementById('auth-switch-link');
        const nameGroup = document.getElementById('register-name-group');
        
        if (isLoginMode) {
            title.textContent = 'Giriş Yap';
            submitBtn.textContent = 'Giriş Yap';
            switchText.textContent = 'Hesabınız yok mu?';
            switchLink.textContent = 'Kayıt Ol';
            nameGroup.classList.add('hidden');
        } else {
            title.textContent = 'Kayıt Ol';
            submitBtn.textContent = 'Hesap Oluştur';
            switchText.textContent = 'Zaten hesabınız var mı?';
            switchLink.textContent = 'Giriş Yap';
            nameGroup.classList.remove('hidden');
        }
    }

    function updateTopBarUI() {
        const btnShowLogin = document.getElementById('btn-show-login');
        const userProfile = document.getElementById('user-profile');
        const userNameDisplay = document.getElementById('user-name-display');

        if (currentUser) {
            btnShowLogin.classList.add('hidden');
            userProfile.classList.remove('hidden');
            
            // İsim almayı dene, yoksa e-posta
            db.collection('users').doc(currentUser.uid).get().then(doc => {
                if (doc.exists && doc.data().name) {
                    userNameDisplay.textContent = '👤 ' + doc.data().name;
                } else {
                    userNameDisplay.textContent = '👤 ' + currentUser.email;
                }
            });
        } else {
            btnShowLogin.classList.remove('hidden');
            userProfile.classList.add('hidden');
        }
    }

    async function syncProgressFromCloud() {
        if (!currentUser) return;
        try {
            const doc = await db.collection('users').doc(currentUser.uid).get();
            if (doc.exists) {
                const cloudCompleted = doc.data().completedLessons || [];
                // Yerel localStorage'a yaz
                localStorage.setItem('sql_egitim_progress', JSON.stringify(cloudCompleted));
                // Arayüzü güncelle
                if (typeof ProgressTracker !== 'undefined') ProgressTracker.resetUIOnly();
            }
        } catch (e) {
            console.error("İlerleme senkronizasyon hatası:", e);
        }
    }

    async function saveProgressToCloud(completedLessons) {
        if (!currentUser) return;
        try {
            await db.collection('users').doc(currentUser.uid).set({
                completedLessons: completedLessons,
                lastActive: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (e) {
            console.error("İlerleme buluta kaydedilemedi:", e);
        }
    }

    function translateFirebaseError(code) {
        switch (code) {
            case 'auth/user-not-found': return 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.';
            case 'auth/wrong-password': return 'Hatalı şifre girdiniz.';
            case 'auth/email-already-in-use': return 'Bu e-posta adresi zaten kullanımda.';
            case 'auth/weak-password': return 'Şifreniz çok zayıf. En az 6 karakter olmalıdır.';
            case 'auth/invalid-email': return 'Geçersiz bir e-posta adresi girdiniz.';
            default: return 'Bir hata oluştu: ' + code;
        }
    }

    return { init, saveProgressToCloud };
})();
