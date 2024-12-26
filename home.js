const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginPopup = document.getElementById('loginPopup');
const signupPopup = document.getElementById('signupPopup');
const welcomePopup = document.getElementById('welcomePopup');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const closeWelcome = document.getElementById('closeWelcome');
const overlay = document.getElementById('overlay');
const switchToSignup = document.getElementById('switchToSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const welcomeMessage = document.getElementById('welcomeMessage');

function togglePopup(popup, state) {
    popup.classList[state ? 'add' : 'remove']('active');
    overlay.classList[state ? 'add' : 'remove']('active');
}

// Open and close popups
loginBtn.addEventListener('click', () => togglePopup(loginPopup, true));
signupBtn.addEventListener('click', () => togglePopup(signupPopup, true));
closeLogin.addEventListener('click', () => togglePopup(loginPopup, false));
closeSignup.addEventListener('click', () => togglePopup(signupPopup, false));
closeWelcome.addEventListener('click', () => togglePopup(welcomePopup, false));
overlay.addEventListener('click', () => {
    togglePopup(loginPopup, false);
    togglePopup(signupPopup, false);
    togglePopup(welcomePopup, false);
});
switchToSignup.addEventListener('click', () => {
    togglePopup(loginPopup, false);
    togglePopup(signupPopup, true);
});

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Validate confirm password matches
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(phone)) {
        alert('Invalid phone number. Please enter a 10-digit number.');
        return;
    }

    // Store in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('phone', phone);
    localStorage.setItem('password', password);

    alert('Signup Successful!');
    togglePopup(signupPopup, false);
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        welcomeMessage.textContent = `Welcome Back, ${username}!`;
        togglePopup(loginPopup, false);
        togglePopup(welcomePopup, true);
        loginBtn.textContent = 'Logout';
        signupBtn.style.display = 'none';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Handle logout
loginBtn.addEventListener('click', () => {
    if (loginBtn.textContent === 'Logout') {
        loginBtn.textContent = 'Login';
        signupBtn.style.display = 'inline-block';
        alert('Logged out successfully!');
    }
});
