/**
 * Semester 6 Notes Portal - Firebase Core Logic
 * - Auth (Firebase Auth)
 * - Profile Creation (Realtime Database)
 * - Navigation & Guards
 */

import { auth, db, ref, set, get, child } from "./firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // 1. UI Elements
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    if (showSignup && showLogin) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginSection.style.display = 'none';
            signupSection.style.display = 'block';
            generateCaptcha();
        });
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
        });
    }

    // 2. Captcha Logic
    const captchaDisplay = document.getElementById('captcha-display');
    const refreshCaptcha = document.getElementById('refresh-captcha');
    let currentCaptcha = "";

    function generateCaptcha() {
        if (!captchaDisplay) return;
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        currentCaptcha = result;
        captchaDisplay.textContent = result;
    }

    if (refreshCaptcha) {
        refreshCaptcha.addEventListener('click', generateCaptcha);
    }

    // 3. Auth Persistence Check
    onAuthStateChanged(auth, async (user) => {
        const path = window.location.pathname;
        const page = path.split("/").pop();

        if (user) {
            // User is signed in
            console.log("User logged in:", user.email);
            if (page === "index.html" || page === "") {
                window.location.href = "home.html";
            }
            
            // Show username if we are on home or viewer
            const userNameDisplay = document.getElementById('user-name');
            if (userNameDisplay) {
                const snapshot = await get(child(ref(db), `users/${user.uid}`));
                if (snapshot.exists()) {
                    userNameDisplay.textContent = snapshot.val().name;
                } else {
                    userNameDisplay.textContent = user.email.split('@')[0];
                }
            }
        } else {
            // User is signed out
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
                // Firebase Signup
                const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;

                // Save extra profile info to RTDB
                await set(ref(db, 'users/' + user.uid), {
                    name: name,
                    email: email,
                    role: email === 'vishnurajan24766@gmail.com' ? 'admin' : 'student',
                    createdAt: new Date().toISOString()
                });

                alert("Account created successfully!");
                // onAuthStateChanged handles redirect
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
                // Firebase Login
                await signInWithEmailAndPassword(auth, email, pass);
                // onAuthStateChanged handles redirect
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
