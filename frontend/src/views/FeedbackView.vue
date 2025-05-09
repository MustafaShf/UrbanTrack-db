<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form data
const rating = ref(0);
const comments = ref('');
const name = ref('');
const email = ref('');
const category = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);

// Star hover state
const hoverRating = ref(0);

// Set rating
const setRating = (value) => {
  rating.value = value;
};

// Handle hover
const handleHover = (value) => {
  hoverRating.value = value;
};

// Reset hover
const resetHover = () => {
  hoverRating.value = 0;
};

// Form submission
const handleSubmit = async () => {
  errorMessage.value = '';
  isSuccess.value = false;
  
  // Basic validation
  if (rating.value === 0) {
    errorMessage.value = 'Please select a rating';
    return;
  }
  
  if (!comments.value.trim()) {
    errorMessage.value = 'Please enter your comments';
    return;
  }

  isLoading.value = true;
  
  try {
    const response = await fetch('http://localhost:3000/api/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        category: category.value,
        rating: rating.value,
        comments: comments.value
      })
    });

    const data = await response.json();

    if (!data.success) {
      errorMessage.value = data.details || 'Feedback submission failed';
      return;
    }

    // Reset form after successful submission
    rating.value = 0;
    comments.value = '';
    name.value = '';
    email.value = '';
    category.value = '';
    
    // Show success state
    isSuccess.value = true;
    
  } catch (error) {
    console.error('Submission error:', error);
    errorMessage.value = 'Failed to submit feedback. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="feedback-page">
    <div class="container">
      <!-- Feedback Form Section -->
      <div class="feedback-section">
        <form class="feedback-form" @submit.prevent="handleSubmit">
          <div class="form-header">
            <div class="logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5C11.729 5 5 11.729 5 20C5 28.271 11.729 35 20 35C28.271 35 35 28.271 35 20C35 11.729 28.271 5 20 5ZM20 32C13.383 32 8 26.617 8 20C8 13.383 13.383 8 20 8C26.617 8 32 13.383 32 20C32 26.617 26.617 32 20 32Z" fill="#29d0d0"/>
                <path d="M13 17L20 10L27 17M13 23L20 30L27 23" fill="none" stroke="#29d0d0" stroke-width="2"/>
                <path d="M20 10V30" stroke="#29d0d0" stroke-width="2"/>
              </svg>
              <div class="logo-text">UrbanTrack</div>
            </div>
            <h2>Your <span class="highlight">Feedback</span> Matters</h2>
            <p class="subtitle">Help us improve our services by sharing your experience</p>
          </div>
          
          <!-- Success Message -->
          <div v-if="isSuccess" class="success-message">
            <div class="success-icon">✓</div>
            <div class="success-text">Thank you for your feedback! We appreciate your time.</div>
          </div>
          
          <!-- Error Message -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          
          <div class="input-container" v-if="!isSuccess">
            <div class="input-row">
              <div class="input-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" v-model="name">
                <span class="input-icon">👤</span>
              </div>
              
              <div class="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" v-model="email">
                <span class="input-icon">✉️</span>
              </div>
            </div>
            
            <div class="input-group">
              <label>Feedback Category</label>
              <select v-model="category">
                <option value="" disabled selected>Select a category</option>
                <option value="user-experience">User Experience</option>
                <option value="customer-service">Customer Service</option>
                <option value="features">App Features</option>
                <option value="bug-report">Bug Report</option>
                <option value="other">Other</option>
              </select>
              <span class="input-icon">📋</span>
            </div>
            
            <div class="rating-group">
              <label>Your Rating</label>
              <div class="stars-container">
                <div class="stars">
                  <span 
                    v-for="i in 5" 
                    :key="i"
                    class="star" 
                    :class="{ 
                      'filled': i <= (hoverRating || rating),
                      'pulse': i === rating && !hoverRating
                    }"
                    @click="setRating(i)"
                    @mouseover="handleHover(i)"
                    @mouseleave="resetHover"
                  >★</span>
                </div>
                <div class="rating-text">
                  {{ rating === 0 ? 'Select a rating' : 
                     rating === 1 ? 'Poor' :
                     rating === 2 ? 'Fair' :
                     rating === 3 ? 'Good' :
                     rating === 4 ? 'Very Good' : 'Excellent' }}
                </div>
              </div>
            </div>
            
            <div class="input-group">
              <label>Your Comments</label>
              <textarea 
                placeholder="Share your thoughts, suggestions or experiences..." 
                v-model="comments"
                rows="4"
              ></textarea>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="btn-primary"
            :disabled="isLoading"
            v-if="!isSuccess"
          >
            {{ isLoading ? 'Submitting...' : 'Submit Feedback' }}
          </button>
          
          <div class="form-footer">
            <div class="thank-you" v-if="!isSuccess">Thank you for helping us improve!</div>
            <router-link to="/" class="back-link">{{ isSuccess ? 'Return to Home' : 'Cancel' }}</router-link>
          </div>
        </form>
      </div>
      
      <!-- Decoration Section -->
      <div class="decoration-section">
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
        
        <div class="feedback-illustration">
          <div class="feedback-icon">
            <span class="icon">📝</span>
          </div>
          <div class="feedback-text">
            Your feedback helps us create a better experience for everyone
          </div>
          
          <div class="testimonial">
            <div class="quote">"Your voice shapes our service"</div>
            <div class="signature">- The UrbanTrack Team</div>
          </div>
        </div>
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

.feedback-page {
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
  min-height: 600px;
  background-color: #252a59;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #3d4270;
}

.feedback-section {
  flex: 1.3;
  background-color: #1c1e3a;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.decoration-section {
  flex: 0.7;
  background-color: #252a59;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  border-left: 1px solid #3d4270;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  color: white;
  font-weight: 800;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.subtitle {
  color: #a2a5c8;
  font-size: 14px;
}

.highlight {
  color: #29d0d0;
}

.input-container {
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.input-row .input-group {
  flex: 1;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
}

.input-group label, .rating-group label {
  display: block;
  margin-bottom: 8px;
  color: #a2a5c8;
  font-size: 14px;
}

.input-group input, .input-group select, .input-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #3d4270;
  border-radius: 6px;
  background-color: #1c1e3a;
  color: white;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23a2a5c8' viewBox='0 0 16 16'%3E%3Cpath d='M8 12L2 6h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  padding-right: 30px;
}

.input-group textarea {
  resize: none;
  min-height: 100px;
}

.input-group input:focus, .input-group select:focus, .input-group textarea:focus {
  outline: none;
  border-color: #29d0d0;
  box-shadow: 0 0 0 2px rgba(41, 208, 208, 0.2);
}

.input-icon {
  position: absolute;
  right: 15px;
  top: 38px;
  color: #a2a5c8;
}

.rating-group {
  margin-bottom: 20px;
}

.stars-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stars {
  display: flex;
  gap: 8px;
}

.star {
  font-size: 32px;
  cursor: pointer;
  color: #3d4270;
  transition: all 0.2s ease;
}

.star.filled {
  color: #29d0d0;
  text-shadow: 0 0 5px rgba(41, 208, 208, 0.5);
}

.star.pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.rating-text {
  color: #a2a5c8;
  font-size: 16px;
  min-width: 90px;
  margin-left: 5px;
}

.btn-primary {
  background-color: #22b2b2;
  color: white;
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
}

.btn-primary:hover:not(:disabled) {
  background-color: #29d0d0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 13px;
}

.thank-you {
  color: #a2a5c8;
}

.back-link {
  color: #29d0d0;
  text-decoration: none;
  transition: all 0.2s;
}

.back-link:hover {
  color: #22b2b2;
  text-decoration: underline;
}

/* Error and Success Messages */
.error-message {
  color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.success-message {
  background-color: rgba(41, 208, 208, 0.1);
  border: 1px solid #29d0d0;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.success-icon {
  font-size: 40px;
  color: #29d0d0;
  margin-bottom: 10px;
}

.success-text {
  color: white;
  font-size: 16px;
}

/* Decoration section styles */
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

.feedback-illustration {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
}

.feedback-icon {
  width: 80px;
  height: 80px;
  background-color: #1c1e3a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d4270;
}

.icon {
  font-size: 40px;
}

.feedback-text {
  color: #a2a5c8;
  text-align: center;
  font-size: 14px;
  margin-bottom: 30px;
  max-width: 200px;
}

.testimonial {
  background-color: #1c1e3a;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #3d4270;
  text-align: center;
  max-width: 200px;
}

.quote {
  color: white;
  font-size: 16px;
  font-style: italic;
  margin-bottom: 10px;
}

.signature {
  color: #29d0d0;
  font-size: 14px;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.logo-text {
  color: #29d0d0;
  font-weight: bold;
  font-size: 18px;
  margin-top: 8px;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
    max-width: 100%;
  }
  
  .feedback-section,
  .decoration-section {
    padding: 30px;
  }
  
  .input-row {
    flex-direction: column;
    gap: 0;
  }
  
  .decoration-section {
    display: none;
  }
}
</style>