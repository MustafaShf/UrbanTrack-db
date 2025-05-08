<script setup>
import { onMounted } from 'vue';

// Play success sound when component mounts
onMounted(() => {
  const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
  audio.play().catch(e => console.log("Audio play failed:", e));
});
</script>

<template>
  <div class="success-page">
    <!-- Floating objects background -->
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

    <!-- Success content -->
    <div class="success-content">
      <!-- Animated checkmark -->
      <div class="checkmark-container">
        <svg class="checkmark" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>

      <h1 class="success-title">Lost Report Successfully Submitted!</h1>
      <p class="success-message">Your item has been registered in our system. We'll notify you if it's found.</p>

      <router-link to="/" class="btn-home">
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.success-page {
  background-color: #1c1e3a;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.success-content {
  text-align: center;
  z-index: 2;
  max-width: 600px;
  padding: 40px;
  background-color: rgba(37, 42, 89, 0.9);
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #3d4270;
}

/* Checkmark animation */
.checkmark-container {
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
}

.checkmark {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #29d0d0;
  stroke-miterlimit: 10;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #29d0d0;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0 0 0 100px rgba(41, 208, 208, 0.1);
  }
}

.success-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
}

.highlight {
  color: #29d0d0;
}

.success-message {
  font-size: 1.1rem;
  color: #a2a5c8;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-home {
  padding: 14px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
  background-color: #22b2b2;
  color: white;
  text-decoration: none;
  display: inline-block;
  margin-top: 20px;
  font-size: 16px;
}

.btn-home:hover {
  background-color: #1d9c9c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Floating objects - same as your other components */
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
  top: 20%;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.phone {
  width: 14px;
  height: 25px;
  background-color: #29d0d0;
  border-radius: 4px;
  bottom: 15%;
  right: 10%;
  animation: float 8s ease-in-out infinite;
}

.wallet {
  width: 30px;
  height: 20px;
  background-color: #29d0d0;
  border-radius: 4px;
  top: 30%;
  right: 15%;
  animation: float 7s ease-in-out infinite;
}

.glasses {
  width: 35px;
  height: 15px;
  border: 2px solid #29d0d0;
  border-radius: 8px;
  bottom: 25%;
  left: 15%;
  animation: float 9s ease-in-out infinite;
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

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@media (max-width: 768px) {
  .success-content {
    padding: 30px;
    margin: 20px;
  }

  .success-title {
    font-size: 1.5rem;
  }

  .success-message {
    font-size: 1rem;
  }

  .checkmark-container {
    width: 80px;
    height: 80px;
  }
}
</style>