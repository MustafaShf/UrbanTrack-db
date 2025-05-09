<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form data
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

// Form submission
const handleSubmit = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      errorMessage.value = data.details || data.error || 'Login failed';
      return;
    }

    // Login successful
    successMessage.value = data.message || 'Login successful! Redirecting...';
    console.log('Login successful:', data);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
    
  } catch (error) {
    errorMessage.value = 'Network error. Please try again.';
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="container">
      <!-- Welcome Section -->
      <div class="welcome-section">
        <div class="floating-objects">
          <div class="floating-object keychain"></div>
          <div class="floating-object phone"></div>
          <div class="floating-object wallet"></div>
          <div class="floating-object glasses"></div>
          <div class="leaf1"></div>
          <div class="leaf2"></div>
          <div class="leaf3"></div>
          <div class="leaf4"></div>
        </div>
        
        <div class="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 5C11.729 5 5 11.729 5 20C5 28.271 11.729 35 20 35C28.271 35 35 28.271 35 20C35 11.729 28.271 5 20 5ZM20 32C13.383 32 8 26.617 8 20C8 13.383 13.383 8 20 8C26.617 8 32 13.383 32 20C32 26.617 26.617 32 20 32Z" fill="#29d0d0"/>
            <path d="M13 17L20 10L27 17M13 23L20 30L27 23" fill="none" stroke="#29d0d0" stroke-width="2"/>
            <path d="M20 10V30" stroke="#29d0d0" stroke-width="2"/>
          </svg>
          <div class="logo-text">UrbanTrack</div>
        </div>
        
        <h1>Welcome to UrbanTrack</h1>
        <p>Connect, find, and recover your lost items safely and efficiently</p>
        
        <div class="illustration">
          <div class="item-found">
            <div class="item-icon">
              <span class="search-icon">🔍</span>
            </div>
            <div class="item-text">
              Track, report, and recover lost items with UrbanTrack
            </div>
          </div>
        </div>
        
        <div class="button-container">
          <router-link to="/register" class="btn-secondary">Sign Up</router-link>
        </div>
      </div>
      
      <!-- Login Section -->
      <div class="login-section">
        <form class="login-form" @submit.prevent="handleSubmit">
          <h2>Log In to <span class="highlight">UrbanTrack</span></h2>
          
          <!-- Success Notification -->
          <div v-if="successMessage" class="notification success">
            {{ successMessage }}
          </div>
          
          <!-- Error Notification -->
          <div v-if="errorMessage" class="notification error">
            {{ errorMessage }}
          </div>
          
          <div class="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" v-model="email" required>
            <span class="input-icon">✉️</span>
          </div>
          
          <div class="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" v-model="password" required>
            <span class="input-icon">🔑</span>
          </div>
          
          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="!isLoading">Log In</span>
            <span v-else>Logging In...</span>
          </button>
          
          <div class="terms">
            By signing in, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
          </div>
          
          <div class="admin-link">
            <router-link to="/admin-login">Login as Admin</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-page {
  background-color: #1c1e3a;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  display: flex;
  width: 900px;
  height: 500px;
  background-color: #252a59;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #3d4270;
}

.welcome-section {
  flex: 1;
  background-color: #252a59;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
}

.login-section {
  flex: 1;
  background-color: #1c1e3a;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #3d4270;
}

.welcome-section h1 {
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  z-index: 2;
}

.welcome-section p {
  color: #a2a5c8;
  margin-bottom: 30px;
  text-align: center;
  z-index: 2;
}

.highlight {
  color: #29d0d0;
}

.btn-primary,
.btn-secondary {
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
  z-index: 2;
}

.btn-primary {
  background-color: #22b2b2;
  color: white;
  width: 100%;
  padding: 14px;
}

.btn-primary:disabled {
  background-color: #1a8a8a;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #e05555;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #22b2b2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-secondary:hover {
  background-color: #e05555;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.illustration {
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

/* Notification styles */
.notification {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}

.notification.success {
  background-color: rgba(40, 167, 69, 0.2);
  border: 1px solid #28a745;
  color: #28a745;
}

.notification.error {
  background-color: rgba(220, 53, 69, 0.2);
  border: 1px solid #dc3545;
  color: #dc3545;
}

/* Elements for the illustration */
.item-found {
  width: 180px;
  height: 180px;
  background-color: #1c1e3a;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d4270;
  transition: transform 0.3s ease;
}

.item-found:hover {
  transform: translateY(-5px);
}

.item-icon {
  width: 60px;
  height: 60px;
  background-color: #29d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.search-icon {
  font-size: 30px;
  color: white;
}

.item-text {
  color: #a2a5c8;
  text-align: center;
  font-size: 14px;
  padding: 0 20px;
}

.floating-objects {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.floating-object {
  position: absolute;
  opacity: 0.6;
}

.keychain {
  width: 25px;
  height: 25px;
  background-color: #29d0d0;
  border-radius: 50%;
  top: 80px;
  left: 40px;
}

.phone {
  width: 14px;
  height: 25px;
  background-color: #29d0d0;
  border-radius: 4px;
  bottom: 100px;
  right: 50px;
}

.wallet {
  width: 30px;
  height: 20px;
  background-color: #29d0d0;
  border-radius: 4px;
  top: 100px;
  right: 70px;
}

.glasses {
  width: 35px;
  height: 15px;
  border: 2px solid #29d0d0;
  border-radius: 8px;
  bottom: 140px;
  left: 60px;
}

.leaf1, .leaf2, .leaf3, .leaf4 {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: #1f2248;
  border-radius: 0 70% 70% 70%;
  transform: rotate(45deg);
  z-index: 1;
}

.leaf1 {
  top: -20px;
  left: -20px;
}

.leaf2 {
  bottom: -20px;
  right: -20px;
}

.leaf3 {
  bottom: -20px;
  left: 40px;
}

.leaf4 {
  top: 40px;
  right: -20px;
}

/* Login form styles */
.login-form {
  width: 100%;
}

.login-form h2 {
  margin-bottom: 30px;
  text-align: center;
  color: white;
  font-weight: 800;
  font-size: 1.8rem;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #a2a5c8;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid #3d4270;
  border-radius: 6px;
  background-color: #1c1e3a;
  color: white;
  transition: border-color 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #29d0d0;
}

.input-icon {
  position: absolute;
  left: 15px;
  bottom: 12px;
  color: #a2a5c8;
}

.terms {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #a2a5c8;
}

.terms a {
  color: #29d0d0;
  text-decoration: none;
}

.terms a:hover {
  text-decoration: underline;
}

.admin-link {
  text-align: center;
  margin-top: 15px;
  font-size: 13px;
}

.admin-link a {
  color: #29d0d0;
  text-decoration: none;
  transition: all 0.2s;
}

.admin-link a:hover {
  color: #22b2b2;
  text-decoration: underline;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  z-index: 2;
}

.logo-text {
  color: #29d0d0;
  font-weight: bold;
  font-size: 18px;
  margin-top: 8px;
}

.button-container {
  text-align: center;
  width: 100%;
  margin-top: -10px;  
  z-index: 2;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
    max-width: 100%;
  }
  
  .welcome-section,
  .login-section {
    padding: 30px;
  }
  
  .illustration {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
  
  .item-found {
    width: 150px;
    height: 150px;
  }
}
</style>