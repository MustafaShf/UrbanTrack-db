<script setup>
import { ref } from 'vue';

// Admin data
const adminData = ref({
  username: 'admin_user',
  email: 'admin@urbantrack.com',
  joinDate: 'January 10, 2024',
  lastLogin: 'May 7, 2025',
  role: 'Super Admin'
});

// Admin list
const adminList = ref([
  {
    id: 1,
    username: 'admin_user',
    email: 'admin@urbantrack.com',
    roles: ['Super Admin'],
    lastLogin: 'May 7, 2025'
  },
  {
    id: 2,
    username: 'john_admin',
    email: 'john@urbantrack.com',
    roles: ['Content Admin'],
    lastLogin: 'May 6, 2025'
  },
  {
    id: 3,
    username: 'sarah_admin',
    email: 'sarah@urbantrack.com',
    roles: ['User Admin'],
    lastLogin: 'May 5, 2025'
  }
]);

// Modal states
const showUsernameModal = ref(false);
const showPasswordModal = ref(false);
const showAddAdminModal = ref(false);
const showDeleteAdminModal = ref(false);

// Form data
const newUsername = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const newAdminUsername = ref('');
const newAdminEmail = ref('');
const newAdminRole = ref('User Admin');
const newAdminPassword = ref('');
const confirmAdminPassword = ref('');
const selectedAdminId = ref(null);
const deleteConfirmation = ref('');

// Error and success messages
const errorMessage = ref('');
const successMessage = ref('');

// Role options
const roleOptions = ref(['Super Admin', 'Content Admin', 'User Admin', 'Analytics Admin']);

// Tabs
const activeTab = ref('account');

// Reset messages
const resetMessages = () => {
  errorMessage.value = '';
  successMessage.value = '';
};

// Open modals
const openUsernameModal = () => {
  resetMessages();
  newUsername.value = adminData.value.username;
  showUsernameModal.value = true;
};

const openPasswordModal = () => {
  resetMessages();
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  showPasswordModal.value = true;
};

const openAddAdminModal = () => {
  resetMessages();
  newAdminUsername.value = '';
  newAdminEmail.value = '';
  newAdminRole.value = 'User Admin';
  newAdminPassword.value = '';
  confirmAdminPassword.value = '';
  showAddAdminModal.value = true;
};

const openDeleteAdminModal = (adminId) => {
  resetMessages();
  selectedAdminId.value = adminId;
  deleteConfirmation.value = '';
  showDeleteAdminModal.value = true;
};

// Close modals
const closeUsernameModal = () => {
  showUsernameModal.value = false;
};

const closePasswordModal = () => {
  showPasswordModal.value = false;
};

const closeAddAdminModal = () => {
  showAddAdminModal.value = false;
};

const closeDeleteAdminModal = () => {
  showDeleteAdminModal.value = false;
};

// Set active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
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
    adminData.value.username = newUsername.value;
    
    // Also update in admin list
    const currentAdmin = adminList.value.find(admin => admin.id === 1);
    if (currentAdmin) {
      currentAdmin.username = newUsername.value;
    }
    
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
  if (currentPassword.value !== 'adminpass') {
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

// Add admin
const addAdmin = () => {
  resetMessages();
  
  if (!newAdminUsername.value) {
    errorMessage.value = 'Username cannot be empty';
    return;
  }
  
  if (newAdminUsername.value.length < 3) {
    errorMessage.value = 'Username must be at least 3 characters long';
    return;
  }
  
  if (!newAdminEmail.value) {
    errorMessage.value = 'Email cannot be empty';
    return;
  }
  
  if (!validateEmail(newAdminEmail.value)) {
    errorMessage.value = 'Please enter a valid email address';
    return;
  }
  
  if (newAdminPassword.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long';
    return;
  }
  
  if (newAdminPassword.value !== confirmAdminPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }
  
  // Simulate API call
  setTimeout(() => {
    // Add to admin list
    adminList.value.push({
      id: adminList.value.length + 1,
      username: newAdminUsername.value,
      email: newAdminEmail.value,
      roles: [newAdminRole.value],
      lastLogin: 'Never'
    });
    
    successMessage.value = 'New admin account created successfully';
    
    // Reset fields
    newAdminUsername.value = '';
    newAdminEmail.value = '';
    newAdminRole.value = 'User Admin';
    newAdminPassword.value = '';
    confirmAdminPassword.value = '';
    
    // Close modal after delay
    setTimeout(() => {
      closeAddAdminModal();
    }, 1500);
  }, 800);
};

// Delete admin
const deleteAdmin = () => {
  resetMessages();
  
  if (deleteConfirmation.value !== 'DELETE') {
    errorMessage.value = 'Please type DELETE to confirm';
    return;
  }
  
  // Check if trying to delete self (admin_user)
  const adminToDelete = adminList.value.find(admin => admin.id === selectedAdminId.value);
  if (adminToDelete && adminToDelete.username === 'admin_user') {
    errorMessage.value = 'You cannot delete your own account from here';
    return;
  }
  
  // Simulate API call
  setTimeout(() => {
    // Remove from admin list
    adminList.value = adminList.value.filter(admin => admin.id !== selectedAdminId.value);
    
    successMessage.value = 'Admin account deleted successfully';
    
    // Close modal after delay
    setTimeout(() => {
      closeDeleteAdminModal();
    }, 1500);
  }, 800);
};

// Email validation
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
</script>

<template>
  <div class="admin-settings-page">
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
        <div class="admin-badge">Admin Portal</div>
        <h1>Admin <span class="highlight">Settings</span></h1>
        <p class="subtitle">Manage administrator accounts and settings</p>
      </div>
      
      <!-- Tabs Navigation -->
      <div class="tabs-navigation">
        <button 
          :class="['tab-button', { active: activeTab === 'account' }]" 
          @click="setActiveTab('account')"
        >
          Account Settings
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'management' }]" 
          @click="setActiveTab('management')"
        >
          Admin Management
        </button>
      </div>
      
      <!-- Account Settings Tab -->
      <div v-if="activeTab === 'account'" class="tab-content">
        <!-- Admin Info Section -->
        <div class="admin-info-card">
          <div class="admin-avatar">
            <div class="avatar-circle">
              {{ adminData.username.charAt(0).toUpperCase() }}
            </div>
          </div>
          <div class="admin-details">
            <div class="admin-name-role">
              <h2>{{ adminData.username }}</h2>
              <span class="role-badge">{{ adminData.role }}</span>
            </div>
            <p class="email">{{ adminData.email }}</p>
            <div class="account-details">
              <div class="detail-item">
                <span class="detail-label">Admin since:</span>
                <span class="detail-value">{{ adminData.joinDate }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Last login:</span>
                <span class="detail-value">{{ adminData.lastLogin }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Account Settings Options -->
        <div class="settings-section">
          <h3>Account Management</h3>
          
          <div class="settings-card" @click="openUsernameModal">
            <div class="settings-icon username-icon">👤</div>
            <div class="settings-content">
              <div class="settings-title">Update Admin Username</div>
              <div class="settings-description">Change how your name appears on the admin portal</div>
            </div>
            <div class="settings-arrow">→</div>
          </div>
          
          <div class="settings-card" @click="openPasswordModal">
            <div class="settings-icon password-icon">🔒</div>
            <div class="settings-content">
              <div class="settings-title">Change Admin Password</div>
              <div class="settings-description">Update your admin account password for better security</div>
            </div>
            <div class="settings-arrow">→</div>
          </div>
        </div>
      </div>
      
      <!-- Admin Management Tab -->
      <div v-if="activeTab === 'management'" class="tab-content">
        <div class="management-header">
          <h3>Admin Accounts</h3>
          <button class="btn-add" @click="openAddAdminModal">+ Add Admin</button>
        </div>
        
        <div class="admin-list">
          <div class="admin-list-header">
            <div class="header-username">Username</div>
            <div class="header-email">Email</div>
            <div class="header-role">Role</div>
            <div class="header-last-login">Last Login</div>
            <div class="header-actions">Actions</div>
          </div>
          
          <div v-for="admin in adminList" :key="admin.id" class="admin-list-item">
            <div class="admin-username">
              <div class="small-avatar">{{ admin.username.charAt(0).toUpperCase() }}</div>
              <span>{{ admin.username }}</span>
              <span v-if="admin.username === adminData.username" class="current-badge">You</span>
            </div>
            <div class="admin-email">{{ admin.email }}</div>
            <div class="admin-role">
              <span v-for="(role, index) in admin.roles" :key="index" class="role-chip">
                {{ role }}
              </span>
            </div>
            <div class="admin-last-login">{{ admin.lastLogin }}</div>
            <div class="admin-actions">
              <button 
                class="btn-delete-admin" 
                @click="openDeleteAdminModal(admin.id)"
                :disabled="admin.username === adminData.username"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation Footer -->
      <div class="settings-footer">
        <router-link to="/" class="footer-link">
          <span class="footer-icon">🏠</span>
          <span class="footer-text">Back to Dashboard</span>
        </router-link>
      </div>
    </div>
    
    <!-- Username Modal -->
    <div class="modal-overlay" v-if="showUsernameModal" @click.self="closeUsernameModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Update Admin Username</h3>
          <button class="close-button" @click="closeUsernameModal">×</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>New Username</label>
            <input 
              type="text" 
              v-model="newUsername" 
              placeholder="Enter new admin username"
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
          <h3>Change Admin Password</h3>
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
    
    <!-- Add Admin Modal -->
    <div class="modal-overlay" v-if="showAddAdminModal" @click.self="closeAddAdminModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Admin</h3>
          <button class="close-button" @click="closeAddAdminModal">×</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label>Username</label>
            <input 
              type="text" 
              v-model="newAdminUsername" 
              placeholder="Enter admin username"
              autofocus
            >
          </div>
          
          <div class="input-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="newAdminEmail" 
              placeholder="Enter admin email"
            >
          </div>
          
          <div class="input-group">
            <label>Role</label>
            <select v-model="newAdminRole">
              <option v-for="role in roleOptions" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
          </div>
          
          <div class="input-group">
            <label>Password</label>
            <input 
              type="password" 
              v-model="newAdminPassword" 
              placeholder="Enter password"
            >
          </div>
          
          <div class="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              v-model="confirmAdminPassword" 
              placeholder="Confirm password"
            >
          </div>
          
          <div class="password-requirements">
            <p>Password must be at least 8 characters long</p>
          </div>
          
          <div class="message error" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="message success" v-if="successMessage">{{ successMessage }}</div>
          
          <div class="modal-buttons">
            <button class="btn-cancel" @click="closeAddAdminModal">Cancel</button>
            <button class="btn-primary" @click="addAdmin">Add Admin</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Admin Modal -->
    <div class="modal-overlay" v-if="showDeleteAdminModal" @click.self="closeDeleteAdminModal">
      <div class="modal-content">
        <div class="modal-header danger">
          <h3>Delete Admin Account</h3>
          <button class="close-button" @click="closeDeleteAdminModal">×</button>
        </div>
        <div class="modal-body">
          <div class="warning-message">
            <span class="warning-icon">⚠️</span>
            <p>Warning: This action cannot be undone. The admin account will be permanently deleted.</p>
          </div>
          
          <div class="input-group">
            <label>To confirm, type <strong>DELETE</strong> below:</label>
            <input 
              type="text" 
              v-model="deleteConfirmation" 
              placeholder="Type DELETE to confirm"
              autofocus
            >
          </div>
          
          <div class="message error" v-if="errorMessage">{{ errorMessage }}</div>
          <div class="message success" v-if="successMessage">{{ successMessage }}</div>
          
          <div class="modal-buttons">
            <button class="btn-cancel" @click="closeDeleteAdminModal">Cancel</button>
            <button class="btn-danger" @click="deleteAdmin">Delete Admin</button>
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

.admin-settings-page {
  background-color: #1c1e3a;
  color: white;
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
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

.admin-badge {
  background-color: #29d0d0;
  color: #1c1e3a;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 12px;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 10px;
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

/* Tabs Navigation */
.tabs-navigation {
  display: flex;
  border-bottom: 1px solid #3d4270;
  margin-bottom: 30px;
}

.tab-button {
  background: transparent;
  border: none;
  color: #a2a5c8;
  font-size: 15px;
  font-weight: 600;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-button.active {
  color: #29d0d0;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #29d0d0;
}

.tab-button:hover {
  color: white;
}

/* Admin Info Card */
.admin-info-card {
  background-color: #252a59;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid #3d4270;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.admin-avatar {
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

.admin-details {
  flex: 1;
}

.admin-name-role {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.admin-name-role h2 {
  font-size: 24px;
  margin-right: 15px;
}

.role-badge {
  background-color: #9d4edd;
  color: white;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
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

/* Management Section */
.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.management-header h3 {
  color: #a2a5c8;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-add {
  background-color: #29d0d0;
  color: #1c1e3a;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add:hover {
  background-color: #22b2b2;
}

.admin-list {
  background-color: #252a59;
  border-radius: 12px;
  border: 1px solid #3d4270;
  overflow: hidden;
  margin-bottom: 30px;
}

.admin-list-header {
  display: flex;
  padding: 15px;
  background-color: #1c1e3a;
  color: #a2a5c8;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #3d4270;
}

.admin-list-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #3d4270;
  transition: background-color 0.3s;
}

.admin-list-item:last-child {
  border-bottom: none;
}

.admin-list-item:hover {
  background-color: #2a305e;
}

.header-username,
.admin-username {
  flex: 2;
  display: flex;
  align-items: center;
}

.small-avatar {
  width: 30px;
  height: 30px;
  background-color: #29d0d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #1c1e3a;
  margin-right: 10px;
}

.current-badge {
  background-color: #3d4270;
  color: #a2a5c8;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  margin-left: 8px;
}

.header-email,
.admin-email {
  flex: 2;
}

.header-role,
.admin-role {
  flex: 2;
}

.header-last-login,
.admin-last-login {
  flex: 1;
}

.header-actions,
.admin-actions {
  flex: 1;
  text-align: right;
}

.role-chip {
  background-color: #3d4270;
  color: #a2a5c8;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;
}

.btn-delete-admin {
  background-color: #ff4d6d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-delete-admin:hover {
  background-color: #e5405e;
}

.btn-delete-admin:disabled {
  background-color: #5c5f7e;
  cursor: not-allowed;
}

/* Footer */
.settings-footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #3d4270;
  text-align: center;
}

.footer-link {
  color: #a2a5c8;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s;
}

.footer-link:hover {
  color: #29d0d0;
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1c1e3a;
  width: 90%;
  max-width: 450px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  animation: modal-in 0.3s ease-out;
}

@keyframes modal-in {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  background-color: #252a59;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3d4270;
}

.modal-header.danger {
  background-color: #4a273e;
  border-bottom: 1px solid #6e3854;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.close-button {
  background: none;
  border: none;
  color: #a2a5c8;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.close-button:hover {
  color: white;
}

.modal-body {
  padding: 20px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  font-size: 14px;
  color: #a2a5c8;
  margin-bottom: 8px;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 12px;
  background-color: #252a59;
  border: 1px solid #3d4270;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  transition: all 0.3s;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: #29d0d0;
  box-shadow: 0 0 0 2px rgba(41, 208, 208, 0.2);
}

.input-group input::placeholder {
  color: #5c5f7e;
}

.password-requirements {
  margin-bottom: 15px;
}

.password-requirements p {
  color: #a2a5c8;
  font-size: 12px;
}

.message {
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
}

.message.error {
  background-color: #4a273e;
  color: #ff4d6d;
  border: 1px solid #6e3854;
}

.message.success {
  background-color: #234a3d;
  color: #4ade80;
  border: 1px solid #356854;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  background-color: transparent;
  border: 1px solid #3d4270;
  color: #a2a5c8;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background-color: #252a59;
  color: white;
}

.btn-primary {
  background-color: #29d0d0;
  border: none;
  color: #1c1e3a;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background-color: #22b2b2;
}

.btn-danger {
  background-color: #ff4d6d;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-danger:hover {
  background-color: #e5405e;
}

.warning-message {
  display: flex;
  align-items: flex-start;
  background-color: #4a273e;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.warning-icon {
  font-size: 20px;
  margin-right: 10px;
}

.warning-message p {
  color: #ff9fb1;
  font-size: 14px;
  margin: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .admin-info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .admin-avatar {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .admin-name-role {
    justify-content: center;
  }
  
  .account-details {
    justify-content: center;
  }
  
  .admin-list-header {
    display: none;
  }
  
  .admin-list-item {
    flex-direction: column;
    padding: 15px;
  }
  
  .admin-username, 
  .admin-email, 
  .admin-role, 
  .admin-last-login,
  .admin-actions {
    margin-bottom: 10px;
    flex: 1;
    text-align: left;
  }
  
  .admin-actions {
    text-align: left;
  }
  
  .admin-email::before {
    content: 'Email: ';
    color: #a2a5c8;
    font-size: 12px;
  }
  
  .admin-role::before {
    content: 'Role: ';
    color: #a2a5c8;
    font-size: 12px;
  }
  
  .admin-last-login::before {
    content: 'Last Login: ';
    color: #a2a5c8;
    font-size: 12px;
  }
}
</style>