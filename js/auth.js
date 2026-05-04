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
        
        const btnProfile = document.getElementById('btn-profile');
        const profileModal = document.getElementById('profile-modal');
        const btnCloseProfile = document.getElementById('btn-close-profile');
        
        // Listeners
        btnShowLogin.addEventListener('click', () => { authModal.classList.remove('hidden'); });
        btnCloseAuth.addEventListener('click', () => { authModal.classList.add('hidden'); });
        btnLogout.addEventListener('click', () => { auth.signOut(); });
        
        btnProfile.addEventListener('click', () => { 
            profileModal.classList.remove('hidden'); 
            loadProfileData();
        });
        btnCloseProfile.addEventListener('click', () => { profileModal.classList.add('hidden'); });
        
        authSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            updateAuthModalUI();
        });

        // Profil - Sınıf Kodu Güncelleme
        document.getElementById('btn-update-class-code').addEventListener('click', async () => {
            if (!currentUser) return;
            const msgEl = document.getElementById('profile-student-msg');
            const newCode = document.getElementById('profile-class-code').value.trim();
            try {
                await db.collection('users').doc(currentUser.uid).update({ classCode: newCode });
                msgEl.textContent = 'Sınıf kodu güncellendi!';
                msgEl.style.color = 'var(--success)';
            } catch (e) {
                msgEl.textContent = 'Hata: ' + e.message;
                msgEl.style.color = 'var(--error)';
            }
        });

        // Profil - Öğretmen Kodu Üretme
        document.getElementById('btn-generate-class-code').addEventListener('click', async () => {
            if (!currentUser) return;
            const msgEl = document.getElementById('profile-teacher-msg');
            const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            try {
                await db.collection('users').doc(currentUser.uid).update({ ownsClassCode: randomCode });
                msgEl.textContent = 'Yeni kod üretildi!';
                msgEl.style.color = 'var(--success)';
                loadProfileData(); // UI güncelle
                btnTeacherPanel.classList.remove('hidden'); // Öğretmen oldu
            } catch (e) {
                msgEl.textContent = 'Hata: ' + e.message;
                msgEl.style.color = 'var(--error)';
            }
        });

        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            const password = document.getElementById('auth-password').value;
            const name = document.getElementById('auth-name').value;
            const classCode = document.getElementById('auth-class-code').value.trim();
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
                        classCode: classCode,
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
                // Öğretmen kontrolü - Eğer ownsClassCode varsa butonu göster
                db.collection('users').doc(user.uid).get().then(doc => {
                    if (doc.exists && doc.data().ownsClassCode) {
                        document.getElementById('btn-teacher-panel').classList.remove('hidden');
                    } else {
                        document.getElementById('btn-teacher-panel').classList.add('hidden');
                    }
                });
                
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
        const codeGroup = document.getElementById('register-code-group');
        
        if (isLoginMode) {
            title.textContent = 'Giriş Yap';
            submitBtn.textContent = 'Giriş Yap';
            switchText.textContent = 'Hesabınız yok mu?';
            switchLink.textContent = 'Kayıt Ol';
            nameGroup.classList.add('hidden');
            codeGroup.classList.add('hidden');
        } else {
            title.textContent = 'Kayıt Ol';
            submitBtn.textContent = 'Hesap Oluştur';
            switchText.textContent = 'Zaten hesabınız var mı?';
            switchLink.textContent = 'Giriş Yap';
            nameGroup.classList.remove('hidden');
            codeGroup.classList.remove('hidden');
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

    async function loadProfileData() {
        if (!currentUser) return;
        const msgS = document.getElementById('profile-student-msg');
        const msgT = document.getElementById('profile-teacher-msg');
        msgS.textContent = ''; msgT.textContent = '';
        
        try {
            const doc = await db.collection('users').doc(currentUser.uid).get();
            if (doc.exists) {
                const data = doc.data();
                if (data.classCode) {
                    document.getElementById('profile-class-code').value = data.classCode;
                }
                
                const tCodeDisplay = document.getElementById('teacher-code-display');
                const tCodeStrong = document.getElementById('teacher-owns-code');
                const btnGenCode = document.getElementById('btn-generate-class-code');
                
                if (data.ownsClassCode) {
                    tCodeDisplay.classList.remove('hidden');
                    tCodeStrong.textContent = data.ownsClassCode;
                    btnGenCode.textContent = 'Sınıf Kodunu Değiştir';
                } else {
                    tCodeDisplay.classList.add('hidden');
                    btnGenCode.textContent = 'Yeni Sınıf Kodu Üret';
                }
            }
        } catch (e) {
            console.error("Profil yüklenemedi", e);
        }
    }

    async function syncProgressFromCloud() {
        if (!currentUser) return;
        try {
            const doc = await db.collection('users').doc(currentUser.uid).get();
            if (doc.exists) {
                const cloudCompleted = doc.data().completedLessons || [];
                const cloudAssisted = doc.data().assistedLessons || [];
                // Yerel localStorage'a yaz
                localStorage.setItem('sql_egitim_progress', JSON.stringify(cloudCompleted));
                localStorage.setItem('sql_egitim_assisted', JSON.stringify(cloudAssisted));
                // Arayüzü güncelle
                if (typeof ProgressTracker !== 'undefined') ProgressTracker.resetUIOnly();
            }
        } catch (e) {
            console.error("İlerleme senkronizasyon hatası:", e);
        }
    }

    async function saveProgressToCloud(completedLessons, assistedLessons = []) {
        if (!currentUser) return;
        try {
            await db.collection('users').doc(currentUser.uid).set({
                completedLessons: completedLessons,
                assistedLessons: assistedLessons,
                lastActive: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (e) {
            console.error("İlerleme kaydedilemedi:", e);
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
