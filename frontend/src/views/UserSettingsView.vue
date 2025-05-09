<script setup>
import { ref } from 'vue';

// User data
const userData = ref({
  username: 'urban_user',
  email: 'user@urbantrack.com',
  joinDate: 'May 15, 2024',
  lastLogin: 'May 7, 2025'
});

// Modal states
const showUsernameModal = ref(false);
const showPasswordModal = ref(false);
const showDeleteModal = ref(false);

// Form data
const newUsername = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const deleteConfirmation = ref('');

// Error and success messages
const errorMessage = ref('');
const successMessage = ref('');

// Open modals
const openUsernameModal = () => {
  resetMessages();
  newUsername.value = userData.value.username;
  showUsernameModal.value = true;
};

const openPasswordModal = () => {
  resetMessages();
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  showPasswordModal.value = true;
};

const openDeleteModal = () => {
  resetMessages();
  deleteConfirmation.value = '';
  showDeleteModal.value = true;
};

// Close modals
const closeUsernameModal = () => {
  showUsernameModal.value = false;
};

const closePasswordModal = () => {
  showPasswordModal.value = false;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Reset messages
const resetMessages = () => {
  errorMessage.value = '';
  successMessage.value = '';
};

// Update username
const updateUsername = () => {
  resetMessages();
  
  if (!newUsername.value) {
    errorMessage.value = 'Username cannot be empty';
    return;
  }
  
  if (newUsername.value.length < 3) {
    errorMessage.value = 'Username must be at least 3 characters long';
    return;
  }
  
  // Simulate API call
  setTimeout(() => {
    userData.value.username = newUsername.value;
    successMessage.value = 'Username updated successfully';
    
    // Close modal after delay
    setTimeout(() => {
      closeUsernameModal();
    }, 1500);
  }, 800);
};

// Change password
const changePassword = () => {
  resetMessages();
  
  if (!currentPassword.value) {
    errorMessage.value = 'Current password is required';
    return;
  }
  
  if (newPassword.value.length < 8) {
    errorMessage.value = 'New password must be at least 8 characters long';
    return;
  }
  
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }
  
  // Simulate password validation
  if (currentPassword.value !== 'password123') {
    errorMessage.value = 'Current password is incorrect';
    return;
  }
  
  // Simulate API call
  setTimeout(() => {
    successMessage.value = 'Password changed successfully';
    
    // Reset fields
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    
    // Close modal after delay
    setTimeout(() => {
      closePasswordModal();
    }, 1500);
  }, 800);
};

// Delete account
const deleteAccount = () => {
  resetMessages();
  
  if (deleteConfirmation.value.toLowerCase() !== 'yes' ) 
  {
    errorMessage.value = 'Please type YES to confirm';
    return;
  }
  
  // Simulate API call
  setTimeout(() => {
    successMessage.value = 'Account scheduled for deletion. You will be logged out shortly.';
    
    // Simulate logout after deletion
    setTimeout(() => {
      // In a real app, this would redirect to login or home page
      alert('Account deleted. Redirecting to home page...');
    }, 2000);
  }, 800);
};
</script>

<template>
  <div class="account-settings-page">
    <div class="container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 5C11.729 5 5 11.729 5 20C5 28.271 11.729 35 20 35C28.271 35 35 28.271 35 20C35 11.729 28.271 5 20 5ZM20 32C13.383 32 8 26.617 8 20C8 13.383 13.383 8 20 8C26.617 8 32 13.383 32 20C32 26.617 26.617 32 20 32Z" fill="#29d0d0"/>
            <path d="M13 17L20 10L27 17M13 23L20 30L27 23" fill="none" stroke="#29d0d0" stroke-width="2"/>
            <path d="M20 10V30" stroke="#29d0d0" stroke-width="2"/>
          </svg>
          <div class="logo-text">UrbanTrack</div>
        </div>
        <h1>Account <span class="highlight">Settings</span></h1>
        <p class="subtitle">Manage your profile and account preferences</p>
      </div>
      
      <!-- User Info Section -->
      <div class="user-info-card">
        <div class="user-avatar">
          <div class="avatar-circle">
            {{ userData.username.charAt(0).toUpperCase() }}
          </div>
        </div>
        <div class="user-details">
          <h2>{{ userData.username }}</h2>
          <p class="email">{{ userData.email }}</p>
          <div class="account-details">
            <div class="detail-item">
              <span class="detail-label">Member since:</span>
              <span class="detail-value">{{ userData.joinDate }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Last login:</span>
              <span class="detail-value">{{ userData.lastLogin }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Settings Options -->
      <div class="settings-section">
        <h3>Account Management</h3>
        
        <div class="settings-card" @click="openUsernameModal">
          <div class="settings-icon username-icon">👤</div>
          <div class="settings-content">
            <div class="settings-title">Update Username</div>
            <div class="settings-description">Change how your name appears on UrbanTrack</div>
          </div>
          <div class="settings-arrow">→</div>
        </div>
        
        <div class="settings-card" @click="openPasswordModal">
          <div class="settings-icon password-icon">🔒</div>
          <div class="settings-content">
            <div class="settings-title">Change Password</div>
            <div class="settings-description">Update your password for better security</div>
          </div>
          <div class="settings-arrow">→</div>
        </div>
        
        <div class="settings-card danger" @click="openDeleteModal">
          <div class="settings-icon delete-icon">🗑️</div>
          <div class="settings-content">
            <div class="settings-title">Delete Account</div>
            <div class="settings-description">Permanently delete your account and all data</div>
          </div>
          <div class="settings-arrow">→</div>
        </div>
      </div>
      
      <!-- Navigation Footer -->
      <div class="settings-footer">
        <router-link to="/" class="footer-link">
          <span class="footer-icon"></span>
          <span class="footer-text">Back to Home</span>
        </router-link>
      </div>
    </div>
    
    <!-- Username Modal -->
    <div class="modal-overlay" v-if="showUsernameModal" @click.self="closeUsernameModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Update Username</h3>
          <button class="close-button" @click="closeUsernameModal">×</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>New Username</label>
            <input 
              type="text" 
              v-model="newUsername" 
              placeholder="Enter new username"
              autofocus
            >
          </div>
          
          <div class="message error" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="message success" v-if="successMessage">{{ successMessage }}</div>
          
          <div class="modal-buttons">
            <button class="btn-cancel" @click="closeUsernameModal">Cancel</button>
            <button class="btn-primary" @click="updateUsername">Update Username</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Password Modal -->
    <div class="modal-overlay" v-if="showPasswordModal" @click.self="closePasswordModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Change Password</h3>
          <button class="close-button" @click="closePasswordModal">×</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>Current Password</label>
            <input 
              type="password" 
              v-model="currentPassword" 
              placeholder="Enter current password"
              autofocus
            >
          </div>
          
          <div class="input-group">
            <label>New Password</label>
            <input 
              type="password" 
              v-model="newPassword" 
              placeholder="Enter new password"
            >
          </div>
          
          <div class="input-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              v-model="confirmPassword" 
              placeholder="Confirm new password"
            >
          </div>
          
          <div class="password-requirements">
            <p>Password must be at least 8 characters long</p>
          </div>
          
          <div class="message error" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="message success" v-if="successMessage">{{ successMessage }}</div>
          
          <div class="modal-buttons">
            <button class="btn-cancel" @click="closePasswordModal">Cancel</button>
            <button class="btn-primary" @click="changePassword">Change Password</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Account Modal -->
    <div class="modal-overlay" v-if="showDeleteModal" @click.self="closeDeleteModal">
      <div class="modal-content">
        <div class="modal-header danger">
          <h3>Delete Account</h3>
          <button class="close-button" @click="closeDeleteModal">×</button>
        </div>
        <div class="modal-body">
          <div class="warning-message">
            <span class="warning-icon">⚠️</span>
            <p>Warning: This action cannot be undone. All your data will be permanently deleted.</p>
          </div>
          
          <div class="input-group">
            <label>To confirm, type <strong>YES</strong> below:</label>
            <input 
              type="text" 
              v-model="deleteConfirmation" 
              placeholder="Type YES to confirm"
              autofocus
            >
          </div>
          
          <div class="message error" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="message success" v-if="successMessage">{{ successMessage }}</div>
          
          <div class="modal-buttons">
            <button class="btn-cancel" @click="closeDeleteModal">Cancel</button>
            <button class="btn-danger" @click="deleteAccount">Delete My Account</button>
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

.account-settings-page {
  background-color: #1c1e3a;
  color: white;
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
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

.page-header h1 {
  color: white;
  font-weight: 800;
  font-size: 28px;
  margin-bottom: 10px;
}

.highlight {
  color: #29d0d0;
}

.subtitle {
  color: #a2a5c8;
  font-size: 14px;
}

/* User Info Card */
.user-info-card {
  background-color: #252a59;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid #3d4270;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.user-avatar {
  margin-right: 25px;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  background-color: #29d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #1c1e3a;
}

.user-details {
  flex: 1;
}

.user-details h2 {
  font-size: 24px;
  margin-bottom: 5px;
}

.email {
  color: #a2a5c8;
  margin-bottom: 15px;
}

.account-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 12px;
  color: #a2a5c8;
  margin-bottom: 3px;
}

.detail-value {
  font-size: 14px;
  color: #fff;
}

/* Settings Section */
.settings-section {
  margin-bottom: 30px;
}

.settings-section h3 {
  color: #a2a5c8;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
  padding-left: 5px;
}

.settings-card {
  background-color: #252a59;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #3d4270;
}

.settings-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  background-color: #2a305e;
}

.settings-card.danger {
  border-color: #e05555;
}

.settings-card.danger:hover {
  background-color: #2a2234;
}

.settings-icon {
  width: 40px;
  height: 40px;
  background-color: #1c1e3a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 15px;
}

.delete-icon {
  background-color: rgba(224, 85, 85, 0.1);
}

.settings-content {
  flex: 1;
}

.settings-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.settings-description {
  font-size: 13px;
  color: #a2a5c8;
}

.settings-arrow {
  color: #29d0d0;
  font-size: 20px;
  margin-left: 10px;
}

.settings-footer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #3d4270;
}

.footer-link {
  display: flex;
  align-items: center;
  color: #29d0d0;
  text-decoration: none;
  transition: all 0.2s;
}

.footer-link:hover {
  transform: translateY(-2px);
}

.footer-icon {
  margin-right: 8px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(3px);
}

.modal-content {
  background-color: #252a59;
  width: 400px;
  max-width: 90vw;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #3d4270;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  background-color: #1c1e3a;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3d4270;
}

.modal-header.danger {
  border-bottom: 1px solid #e05555;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: #a2a5c8;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s;
}

.close-button:hover {
  color: white;
}

.modal-body {
  padding: 20px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
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
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #29d0d0;
  box-shadow: 0 0 0 2px rgba(41, 208, 208, 0.2);
}

.password-requirements {
  margin-bottom: 20px;
  font-size: 12px;
  color: #a2a5c8;
}

.warning-message {
  background-color: rgba(224, 85, 85, 0.1);
  border-left: 3px solid #e05555;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  border-radius: 4px;
}

.warning-icon {
  margin-right: 10px;
  font-size: 18px;
}

.message {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  text-align: center;
}

.error {
  background-color: rgba(224, 85, 85, 0.1);
  color: #e05555;
  border: 1px solid rgba(224, 85, 85, 0.3);
}

.success {
  background-color: rgba(39, 174, 96, 0.1);
  color: #2ecc71;
  border: 1px solid rgba(39, 174, 96, 0.3);
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary,
.btn-cancel,
.btn-danger {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
}

.btn-primary {
  background-color: #22b2b2;
  color: white;
}

.btn-primary:hover {
  background-color: #29d0d0;
}

.btn-cancel {
  background-color: transparent;
  color: #a2a5c8;
  border: 1px solid #3d4270;
}

.btn-cancel:hover {
  background-color: #1c1e3a;
  color: white;
}

.btn-danger {
  background-color: #e05555;
  color: white;
}

.btn-danger:hover {
  background-color: #d23f3f;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .user-info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .user-avatar {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .account-details {
    justify-content: center;
  }
}
</style>