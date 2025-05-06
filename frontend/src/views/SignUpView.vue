<script setup>
import { ref } from 'vue';

// Form data
const fullName = ref('');
const username = ref('');
const phoneNumber = ref('');
const email = ref('');
const password = ref('');

// Form submission
const handleSubmit = () => {
  // Handle signup logic here
  console.log('Signup submitted:', {
    fullName: fullName.value,
    username: username.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
    password: password.value
  });
};
</script>

<template>
  <div class="signup-page">
    <!-- Background design elements -->
    <div class="bg-shape bg-shape-1"></div>
    <div class="bg-shape bg-shape-2"></div>
    
    <div class="container">
      <div class="header">
        <div class="logo">
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
            <path d="M20 5C11.729 5 5 11.729 5 20C5 28.271 11.729 35 20 35C28.271 35 35 28.271 35 20C35 11.729 28.271 5 20 5ZM20 32C13.383 32 8 26.617 8 20C8 13.383 13.383 8 20 8C26.617 8 32 13.383 32 20C32 26.617 26.617 32 20 32Z" fill="#29d0d0"/>
            <path d="M13 17L20 10L27 17M13 23L20 30L27 23" fill="none" stroke="#29d0d0" stroke-width="2"/>
            <path d="M20 10V30" stroke="#29d0d0" stroke-width="2"/>
          </svg>
          <span class="logo-text">UrbanTrack</span>
        </div>
        
        <h1 class="form-title">Create Your Account and Be a Part of the UrbanTrack Family</h1>
      </div>
      
      <div class="form-container">
        <!-- Design accents -->
        <div class="corner-accent top-right"></div>
        <div class="corner-accent bottom-left"></div>
        
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" v-model="fullName">
            <span class="input-icon">👤</span>
          </div>
          
          <div class="input-group">
            <label>Username</label>
            <input type="text" placeholder="Choose a username" v-model="username">
            <span class="input-icon">@</span>
          </div>
          
          <div class="input-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" v-model="phoneNumber">
            <span class="input-icon">📱</span>
          </div>
          
          <div class="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email address" v-model="email">
            <span class="input-icon">✉️</span>
          </div>
          
          <div class="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" v-model="password">
            <span class="input-icon">🔒</span>
          </div>
          
          <button type="submit" class="submit-btn">Sign Up</button>
        </form>
      </div>
      
      <div class="footer">
        Already have an account? <router-link to="/login">Log in</router-link>
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

.signup-page {
  background-color: #1c1e3a;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Background design elements */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.04;
  z-index: -1;
}

.bg-shape-1 {
  width: 400px;
  height: 400px;
  background-color: #29d0d0;
  top: -200px;
  right: -100px;
}

.bg-shape-2 {
  width: 300px;
  height: 300px;
  background-color: #29d0d0;
  bottom: -100px;
  left: -150px;
}

.container {
  width: 450px;
  background-color: #252a59;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
}

.header {
  padding: 30px;
  text-align: center;
  border-bottom: 1px solid #3d4270;
  position: relative;
}

/* Decorative elements for header */
.header::before, .header::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #29d0d0;
  border-radius: 50%;
}

.header::before {
  top: 25px;
  left: 25px;
}

.header::after {
  top: 25px;
  right: 25px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-text {
  color: #29d0d0;
  font-weight: bold;
  font-size: 18px;
  margin-left: 10px;
}

.form-container {
  padding: 30px;
  position: relative;
}

/* Subtle corner accents */
.corner-accent {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid #29d0d0;
  opacity: 0.3;
}

.top-right {
  top: 20px;
  right: 20px;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
  border-right: none;
  border-top: none;
}

.form-title {
  text-align: center;
  margin-bottom: 25px;
  font-size: 20px;
  color: white;
}

.input-group {
  margin-bottom: 16px;
  position: relative;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  color: #a2a5c8;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
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
  right: 15px;
  bottom: 12px;
  color: #a2a5c8;
  font-size: 16px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #29d0d0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover {
  background-color: #22b2b2;
}

/* Button shine effect */
.submit-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
  transform: rotate(45deg);
  transition: all 0.5s;
  opacity: 0;
}

.submit-btn:hover::after {
  left: 100%;
  opacity: 1;
}

.footer {
  padding: 15px;
  text-align: center;
  color: #a2a5c8;
  font-size: 14px;
  background-color: #1c1e3a;
  position: relative;
}

.footer a {
  color: #29d0d0;
  text-decoration: none;
  font-weight: 600;
}

.footer a:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 500px) {
  .container {
    width: 95%;
    max-width: 450px;
  }
  
  .form-container {
    padding: 20px;
  }
}
</style>