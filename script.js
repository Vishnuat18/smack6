import { auth, fs, doc, getDoc, setDoc } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // 1. UI Elements (unchanged)
    // ... logic for showSignup, showLogin ...

    // 2. Captcha Logic (unchanged)
    // ... logic for generateCaptcha ...

    // 3. Auth Persistence Check
    onAuthStateChanged(auth, async (user) => {
        const path = window.location.pathname;
        const page = path.split("/").pop();

        if (user) {
            console.log("User logged in:", user.email);
            if (page === "index.html" || page === "") {
                window.location.href = "home.html";
            }
            
            // Show username using Firestore
            const userNameDisplay = document.getElementById('user-name');
            if (userNameDisplay) {
                try {
                    const userDoc = await getDoc(doc(fs, "users", user.uid));
                    if (userDoc.exists()) {
                        userNameDisplay.textContent = userDoc.data().name;
                    } else {
                        userNameDisplay.textContent = user.email.split('@')[0];
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    userNameDisplay.textContent = "Student";
                }
            }
        } else {
            if (page !== "index.html" && page !== "") {
                window.location.href = "index.html";
            }
        }
    });

    // 4. Signup Logic
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const pass = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            const captchaInput = document.getElementById('signup-captcha').value;

            if (pass !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            if (captchaInput.toUpperCase() !== currentCaptcha) {
                alert("Incorrect Captcha!");
                generateCaptcha();
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;

                // Save profile to Firestore instead of RTDB
                await setDoc(doc(fs, "users", user.uid), {
                    name: name,
                    email: email,
                    role: email === 'vishnurajan24766@gmail.com' ? 'admin' : 'student',
                    createdAt: new Date().toISOString()
                });

                alert("Account created successfully!");
            } catch (error) {
                alert("Signup failed: " + error.message);
            }
        });
    }

    // 5. Login Logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-password').value;

            try {
                await signInWithEmailAndPassword(auth, email, pass);
            } catch (error) {
                alert("Login failed: " + error.message);
            }
        });
    }

    // 6. Logout Logic (Used in Navbar)
    const logoutLinks = document.querySelectorAll('.logout');
    logoutLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Logout failed", error);
            }
        });
    });

    // Initial captcha
    generateCaptcha();

    // 7. Password Visibility Toggle
    window.togglePassword = function(fieldId, icon) {
        const passwordField = document.getElementById(fieldId);
        if (passwordField.type === "password") {
            passwordField.type = "text";
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            passwordField.type = "password";
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    };

    // 8. Captcha Uppercase Forcing
    const captchaInput = document.getElementById('signup-captcha');
    if (captchaInput) {
        captchaInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }
});
