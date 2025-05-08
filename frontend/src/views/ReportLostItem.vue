<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form data
const formData = ref({
  itemName: '',
  categoryId: null,
  description: '',
  imageUrl: '',
  location: '',
  dateLost: ''
});

// Location search functionality - same as UserHomeView
const searchQuery = ref('');
const locationResults = ref([]);
const selectedLocation = ref(null);
const isSearching = ref(false);

// Hardcoded categories
const categories = ref([
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Personal Items' },
  { id: 3, name: 'Collectibles' },
  { id: 4, name: 'Consumables' },
  { id: 5, name: 'Clothing and Accessories' },
  { id: 6, name: 'Toys' }
]);

// Using OpenStreetMap Nominatim API (free)
const searchLocations = async () => {
  if (searchQuery.value.length < 3) {
    locationResults.value = [];
    return;
  }
  
  isSearching.value = true;
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&addressdetails=1`
    );
    locationResults.value = await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
  } finally {
    isSearching.value = false;
  }
};

const selectLocation = (location) => {
  selectedLocation.value = location;
  formData.value.location = location.display_name || '';
  searchQuery.value = location.display_name || '';
  locationResults.value = [];
};

const showDateError = ref(false);
const validateDate = () => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  showDateError.value = !dateRegex.test(formData.value.dateLost);
};

const submitReport = async () => {
  try {
    // Validate required fields
    if (!formData.value.itemName || !formData.value.categoryId || 
        !formData.value.description || !formData.value.location || 
        !formData.value.dateLost) {
      alert('Please fill in all required fields');
      return;
    }

    validateDate();
    if (showDateError.value) {
      alert('Please enter a valid date in DD/MM/YYYY format');
      return;
    }

    // Convert date to ISO format for backend
    const [day, month, year] = formData.value.dateLost.split('/');
    const isoDate = `${year}-${month}-${day}`;

    // Prepare payload
    const payload = {
      itemName: formData.value.itemName,
      categoryId: formData.value.categoryId,
      description: formData.value.description,
      imageUrl: formData.value.imageUrl || null,
      location: formData.value.location,
      dateLost: isoDate
    };

    // Send to backend
    const response = await fetch('http://localhost:3000/api/report-lost-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    router.push('/ss');
    
  } catch (error) {
    console.error('Error submitting report:', error);
    alert(`Error: ${error.message}`);
  }
};
</script>

<template>
  <div class="report-page">
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
        
        <h1>Report a Lost Item</h1>
        <p>Help us help you find your lost belongings</p>
        
        <div class="illustration">
          <div class="item-found">
            <div class="item-icon">
              <span class="search-icon">🔍</span>
            </div>
            <div class="item-text">
              Provide accurate details to increase chances of recovery
            </div>
          </div>
        </div>
      </div>
      
      <!-- Report Form Section -->
      <div class="form-section">
        <form class="report-form" @submit.prevent="submitReport">
          <h2>Item Details <span class="highlight">Report</span></h2>
          
          <div class="input-group">
            <label>Item Name *</label>
            <input 
              type="text" 
              placeholder="e.g. iPhone 12, Wallet, Keys" 
              v-model="formData.itemName"
              required
            >
          </div>
          
          <div class="input-group">
            <label>Category *</label>
            <select v-model="formData.categoryId" required>
              <option value="" disabled selected>Select a category</option>
              <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          
          <div class="input-group">
            <label>Description *</label>
            <textarea 
              placeholder="Provide detailed description (color, brand, distinguishing features)"
              v-model="formData.description"
              required
            ></textarea>
          </div>
          
          <div class="input-group">
            <label>Image URL (optional)</label>
            <input 
              type="text" 
              placeholder="Paste image URL if available"
              v-model="formData.imageUrl"
            >
          </div>
          
          <!-- Location Search -->
          <div class="input-group">
            <label>Location Lost *</label>
            <div class="search-container">
              <svg v-if="!searchQuery" class="location-icon" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <input
                v-model="searchQuery"
                @input="searchLocations"
                type="text"
                placeholder="Where did you lose it?"
                class="search-input"
                :class="{ 'has-text': searchQuery }"
                required
              />
              <div v-if="isSearching" class="search-loading">Searching...</div>
              <ul v-if="locationResults.length > 0" class="search-results">
                <li
                  v-for="(result, index) in locationResults"
                  :key="index"
                  @click="selectLocation(result)"
                  class="search-result-item"
                >
                  {{ result.display_name }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Date Input -->
          <div class="input-group">
            <label>Date Lost (DD/MM/YYYY) *</label>
            <div class="date-input-container">
              <input
                v-model="formData.dateLost"
                @input="validateDate"
                type="text"
                placeholder="DD/MM/YYYY"
                class="date-input"
                :class="{ 'error': showDateError }"
                required
              />
              <div v-if="showDateError" class="date-error">Please enter a valid date (DD/MM/YYYY)</div>
            </div>
          </div>
          
          <button type="submit" class="btn-submit">Submit Report</button>
          
          <div class="terms">
            By submitting, you confirm this information is accurate to the best of your knowledge.
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

.report-page {
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

.form-section {
  flex: 1;
  background-color: #1c1e3a;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #3d4270;
  overflow-y: auto;
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

.btn-submit {
  padding: 14px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
  background-color: #22b2b2;
  color: white;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
}

.btn-submit:hover {
  background-color: #1d9c9c;
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

.report-form {
  width: 100%;
}

.report-form h2 {
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

.input-group input,
.input-group select,
.input-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #3d4270;
  border-radius: 6px;
  background-color: #1c1e3a;
  color: white;
  transition: border-color 0.3s;
}

.input-group textarea {
  min-height: 80px;
  resize: vertical;
}

.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #29d0d0;
}

.terms {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #a2a5c8;
}

.search-container {
  position: relative;
  width: 100%;
}

.location-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  fill: #666;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  padding-left: 40px;
  border-radius: 6px;
  border: 1px solid #3d4270;
  background-color: #1c1e3a;
  color: white;
  transition: all 0.3s;
}

.search-input.has-text {
  padding-left: 15px;
}

.search-input:focus {
  outline: none;
  border-color: #29d0d0;
}

.search-results {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #252a59;
  border: 1px solid #3d4270;
  border-radius: 0 0 6px 6px;
  z-index: 10;
  margin-top: -1px;
  list-style: none;
  padding: 0;
}

.search-result-item {
  padding: 10px 15px;
  cursor: pointer;
  color: #a2a5c8;
  border-bottom: 1px solid #3d4270;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: #29d0d0;
  color: white;
}

.search-loading {
  padding: 10px 15px;
  color: #a2a5c8;
  font-style: italic;
}

.date-input-container {
  width: 100%;
}

.date-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 6px;
  border: 1px solid #3d4270;
  background-color: #1c1e3a;
  color: white;
  transition: all 0.3s;
}

.date-input:focus {
  outline: none;
  border-color: #29d0d0;
}

.date-input.error {
  border-color: #ff6b6b;
}

.date-error {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.input-group .search-container,
.input-group .date-input-container {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
    max-width: 100%;
  }
  
  .welcome-section,
  .form-section {
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