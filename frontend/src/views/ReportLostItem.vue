<template>
    <div class="report-container">
      <div class="report-card">
        <h1 class="report-title">Report Lost Item</h1>
        
        <form @submit.prevent="handleSubmit" class="report-form">
          <div class="form-group">
            <label for="itemName">Item Name</label>
            <input
              id="itemName"
              v-model="formData.name"
              type="text"
              placeholder="e.g. iPhone 13 Pro Max"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="itemCategory">Category</label>
            <select id="itemCategory" v-model="formData.category" required>
              <option value="" disabled selected>Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Documents">Documents</option>
              <option value="Clothing">Clothing</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="itemDescription">Description</label>
            <textarea
              id="itemDescription"
              v-model="formData.description"
              placeholder="Provide detailed description..."
              required
            ></textarea>
          </div>
  
          <div class="form-group">
            <label for="itemImage">Image URL</label>
            <input
              id="itemImage"
              v-model="formData.image"
              type="url"
              placeholder="https://example.com/image.jpg"
            />
            <div v-if="formData.image" class="image-preview">
              <img :src="formData.image" alt="Preview" />
            </div>
          </div>
  
          <!-- Location Search -->
          <div class="form-group">
            <label>Location Lost</label>
            <div class="search-container">
              <svg v-if="!locationQuery" class="location-icon" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <input
                v-model="locationQuery"
                @input="searchLocations"
                type="text"
                placeholder="    Enter location where lost..."
                class="search-input"
                :class="{ 'has-text': locationQuery }"
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
  
          <div class="form-group">
            <label for="dateLost">Date Lost</label>
            <input
              id="dateLost"
              v-model="formData.date"
              type="date"
              required
            />
          </div>
  
          <button type="submit" class="submit-btn">Report Item</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Location search functionality
  const locationQuery = ref('');
  const locationResults = ref([]);
  const selectedLocation = ref(null);
  const isSearching = ref(false);
  
  const searchLocations = async () => {
    if (locationQuery.value.length < 3) {
      locationResults.value = [];
      return;
    }
    
    isSearching.value = true;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery.value)}&addressdetails=1`
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
    locationQuery.value = location.display_name || '';
    locationResults.value = [];
    formData.value.location = location.display_name;
  };
  
  const formData = ref({
    name: '',
    category: '',
    description: '',
    image: '',
    location: '',
    date: ''
  });
  
  const handleSubmit = () => {
    if (!selectedLocation.value) {
      alert('Please select a location from the search results');
      return;
    }
    
    console.log('Form submitted:', formData.value);
    alert('Item reported successfully!');
    formData.value = {
      name: '',
      category: '',
      description: '',
      image: '',
      location: '',
      date: ''
    };
    locationQuery.value = '';
  };
  </script>
  
  <style scoped>
  /* Add these styles to your existing styles */
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
    padding: 0.8rem 1rem;
    padding-left: 40px;
    border-radius: 8px;
    border: 2px solid #3d4270;
    background-color: white;
    color: #333;
    font-size: 1rem;
  }
  
  .search-input.has-text {
    padding-left: 40px;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #29d0d0;
    box-shadow: 0 0 0 2px rgba(41, 208, 208, 0.2);
  }
  
  .search-results {
    position: absolute;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-top: 0.5rem;
    z-index: 10;
    list-style: none;
    padding: 0;
  }
  
  .search-result-item {
    padding: 0.8rem 1rem;
    cursor: pointer;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  
  .search-result-item:hover {
    background-color: #f5f5f5;
  }
  
  .search-loading {
    padding: 0.8rem 1rem;
    color: #666;
    font-style: italic;
  }
  
  /* Keep all your existing styles below */
  .report-container {
    min-height: 100vh;
    background-color: #1c1e3a;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }


  .report-container {
    min-height: 100vh;
    background-color: #1c1e3a;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  
  .report-card {
    background-color: #252a59;
    border-radius: 15px;
    padding: 2.5rem;
    width: 100%;
    max-width: 700px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  .report-title {
    color: #29d0d0;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.2rem;
  }
  
  .report-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group label {
    color: #a2a5c8;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.8rem 1rem;
    border-radius: 8px;
    border: 2px solid #3d4270;
    background-color: #1c1e3a;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #29d0d0;
    box-shadow: 0 0 0 2px rgba(41, 208, 208, 0.2);
  }
  
  .form-group textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .image-preview {
    margin-top: 1rem;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    border: 2px solid #3d4270;
  }
  
  .submit-btn {
    padding: 1rem;
    border-radius: 8px;
    border: none;
    background-color: #ff6b6b;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }
  
  .submit-btn:hover {
    background-color: #e05555;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .report-card {
      padding: 1.5rem;
    }
    
    .report-title {
      font-size: 1.8rem;
    }
  }
  
  @media (max-width: 480px) {
    .report-container {
      padding: 1rem;
    }
    
    .report-card {
      padding: 1.2rem;
    }
  }
  </style>