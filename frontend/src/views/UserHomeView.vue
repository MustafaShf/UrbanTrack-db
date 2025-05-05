<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Location search functionality
const searchQuery = ref('');
const locationResults = ref([]);
const selectedLocation = ref(null);
const isSearching = ref(false);

// Date input functionality
const dateInput = ref('');
const showDateError = ref(false);

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
  searchQuery.value = location.display_name || '';
  locationResults.value = [];
};

const validateDate = () => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  showDateError.value = !dateRegex.test(dateInput.value);
};

// Computed property for button state
const isButtonDisabled = computed(() => !selectedLocation.value || !dateInput.value || showDateError.value);

// Function to handle search navigation
const handleSearch = () => {
  if (isButtonDisabled.value) return;
  
  router.push({
    path: '/listOfLostUnfoundItems',
    query: {
      location: selectedLocation.value.display_name,
      date: dateInput.value
    }
  });
};

const handleSearch2 = () => {
  if (isButtonDisabled.value) return;
  
  router.push({
    path: '/listOfFoundUnclaimedItems',
    query: {
      location: selectedLocation.value.display_name,
      date: dateInput.value
    }
  });
};
</script>

<template>
  <div class="UserHomepage">
    <!-- Hero Section -->
    <div class="hero-section1">
      <div class="containerLost">
        <div class="text-content-Lost">
          <h1 class="titleLost">
            <span class="highlightLost">Lost</span>
            Something ?            
          </h1>
          <p class="subtitleLost">
            Report and register your lost item now so it may be recovered or found later with ease.
          </p>
        </div>

        <div class="action-content-Lost">
          <div class="action-buttons-Lost">
            <RouterLink to="/lost" class="btn-lost">
              Report Lost Item
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- New Dark Section that appears when scrolling -->
    <div class="dark-section1">
      <div class="containerFound">
        <div class="text-content-Found">
          <h1 class="titleFound">
            <span class="highlightFound">Found</span>
            Something ? 
          </h1>
          <p class="subtitleFound">
            Report and register your found item now so it may be help someone else recover their lost belongings.
          </p>
        </div>

        <div class="action-content-Found">
          <div class="action-buttons-Found">
            <RouterLink to="/found" class="btn-found">
              Report Found Item
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section with Search -->
    <div class="hero-section1">
      <div class="containerLostList">
        <div class="text-content-Lost">
          <h1 class="titleLost">
            Looking for
            <br>
            <span class="highlightLost">Your Lost</span>
            <br>
            things ?
          </h1>
          <p class="subtitleLost">
            View the list of found items unclaimed in a specified area.
          </p>
        </div>

        <!-- Search Bar Section -->
        <div class="search-section">
          <div class="search-container">
            <svg v-if="!searchQuery" class="location-icon" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <input
              v-model="searchQuery"
              @input="searchLocations"
              type="text"
              placeholder="Enter a location..."
              class="search-input"
              :class="{ 'has-text': searchQuery }"
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
          
          <!-- Date Input -->
          <div class="date-input-container">
            <input
              v-model="dateInput"
              @input="validateDate"
              type="text"
              placeholder="DD/MM/YYYY"
              class="date-input"
              :class="{ 'error': showDateError }"
            />
            <div v-if="showDateError" class="date-error">Please enter a valid date (DD/MM/YYYY)</div>
          </div>
          
          <button
            class="btn-lost"
            :class="{ 'disabled-btn': isButtonDisabled }"
            @click="handleSearch2"
          >
            Search in this Area
          </button>
        </div>
      </div>
    </div>

    <!-- New Dark Section with Search -->
    <div class="dark-section1">
      <div class="containerFoundList">
        <div class="text-content-Found shifted-right">
          <h1 class="titleFound">
            Looking for
            <br>
            <span class="highlightFound">Lost Reports</span>
            ?
          </h1>
          <p class="subtitleFound">
            View the list of lost items not found yet in a specified area.
          </p>
        </div>
        
        <!-- Search Bar Section -->
        <div class="search-section">
          <div class="search-container">
            <svg v-if="!searchQuery" class="location-icon" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <input
              v-model="searchQuery"
              @input="searchLocations"
              type="text"
              placeholder="Enter a location..."
              class="search-input"
              :class="{ 'has-text': searchQuery }"
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
          
          <!-- Date Input -->
          <div class="date-input-container">
            <input
              v-model="dateInput"
              @input="validateDate"
              type="text"
              placeholder="DD/MM/YYYY"
              class="date-input"
              :class="{ 'error': showDateError }"
            />
            <div v-if="showDateError" class="date-error">Please enter a valid date (DD/MM/YYYY)</div>
          </div>
          
          <button
            class="btn-found"
            :class="{ 'disabled-btn2': isButtonDisabled }"
            @click="handleSearch"
          >
            Search in this Area
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.UserHomepage {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* Hero Section */
.hero-section1 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #252a59;
  position: relative;
}

/* Dark Section that appears when scrolling */
.dark-section1 {
  min-height: 100vh;
  background-color: #1c1e3a;
  padding: 4rem 0;
}

.containerLost {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.text-content-Lost {
  flex: 1;
  padding-right: 2rem;
}

.titleLost {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1.5rem;
  color: white;
}

.highlightLost {
  color: #29d0d0;
  font-weight: 900;
}

.subtitleLost {
  font-size: 1.2rem;
  color: #a2a5c8;
  max-width: 450px;
}

.action-content-Lost {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.action-buttons-Lost {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 300px;
}

.btn-lost {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: #ff6b6b;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.btn-lost:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #e05555;
}

.containerFound {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center; /* This ensures vertical centering */
  flex-direction: row-reverse;
  min-height: 100vh; /* Ensures full viewport height */
}

.text-content-Found {
  flex: 1;
  padding-right: 2rem;
}

.titleFound {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1.5rem;
  color: white;
}

.highlightFound {
  color: #ff6b6b;
  font-weight: 900;
}

.subtitleFound {
  font-size: 1.2rem;
  color: #a2a5c8;
  max-width: 600px;
}

.action-buttons-Found {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 300px;
}

.action-content-Found {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Added for vertical centering */
  align-items: flex-start; /* Aligns button to left */
  height: 100%; /* Takes full height of container */
}

.btn-found {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: #29d0d0;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin: 0 auto 0 0; /* Right-aligns button within its container */
}

.btn-found:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #22b2b2;
}

.containerLostList {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.containerFoundList {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center; /* This ensures vertical centering */
  flex-direction: row-reverse;
  min-height: 100vh; /* Ensures full viewport height */
}

.shifted-right {
  margin-left: auto;  /* Pushes content to the right */
  padding-right: 2rem; /* Adds some spacing from the edge */
  text-align: left;   /* Keeps text left-aligned */
  max-width: 50%;     /* Prevents text from stretching full width */
}

.search-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-top: 2rem;
}

.search-container {
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
}

.location-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  fill: #666;
  pointer-events: none; /* Allows clicks to pass through to input */
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  color: #333;
  padding-left: 15px;
  transition: padding 0.2s ease;
}

.search-input::placeholder {
  color: #aaa;
}

.search-input:focus {
  outline: 2px solid #29d0d0;
}

.search-results {
  position: absolute;
  width: 100%;
  max-height: 300px;
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
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  color: #333;
  border-bottom: 1px solid #eee;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.search-loading {
  padding: 0.8rem 1.5rem;
  color: #666;
  font-style: italic;
}

.disabled-btn {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #ff6b6b !important;
}

.disabled-btn2 {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #29d0d0 !important;
}

.disabled-btn, .disabled-btn2 {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none; /* This prevents any click events */
}

.search-input.has-text {
  padding-left: 15px; /* Keep consistent padding when icon disappears */
}

.search-input:not(.has-text) {
  padding-left: 40px;
}

/* Only adding these new styles for the date input */
/* Update the date input styles */
.date-input-container {
  width: 100%;
  max-width: 500px;
  margin: 1.5rem 0;
}

.date-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 2px solid #3d4270;
  background-color: white;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}


.dark-section1 .date-input {
  background-color: white;
  color: #333; /* Ensure text remains black when typing */
}

.dark-section1 .date-input-container {
  max-width: 500px;
}

.date-input:focus {
  outline: none;
  border-color: #29d0d0;
  box-shadow: 0 0 0 2px rgba(41, 208, 208, 0.2);
}

.date-input::placeholder {
  color: #aaa; /* Placeholder color */
}

.date-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 2px solid #3d4270;
  background-color: white;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.date-input.error {
  border-color: #ff6b6b;
}

.date-error {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: left;
}

/* ---------------------------------------------------------------------------------------------------- */

@media (max-width: 768px) {
  /* General mobile styles */
  .containerLost,
  .containerFound,
  .containerLostList,
  .containerFoundList {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
    min-height: auto;
  }

  /* Text content sections */
  .text-content-Lost,
  .text-content-Found {
    padding-right: 0;
    margin-bottom: 3rem;
    width: 100%;
  }

  /* Titles */
  .titleLost,
  .titleFound {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  /* Subtitles */
  .subtitleLost,
  .subtitleFound {
    max-width: 100%;
    font-size: 1.1rem;
  }

  /* Action sections */
  .action-content-Lost,
  .action-content-Found {
    align-items: center;
    width: 100%;
  }

  /* Buttons */
  .action-buttons-Lost,
  .action-buttons-Found {
    margin: 0 auto;
    max-width: 100%;
  }

  .btn-lost,
  .btn-found {
    margin: 0 auto;
    width: 100%;
  }

  /* Section padding adjustments */
  .hero-section1,
  .dark-section1 {
    padding: 4rem 0;
    min-height: auto;
  }

  /* Fix for reversed container */
  .containerFound {
    flex-direction: column;
  }
}

/* Additional breakpoint for very small screens */
@media (max-width: 480px) {
  .titleLost,
  .titleFound {
    font-size: 2.5rem;
  }

  .subtitleLost,
  .subtitleFound {
    font-size: 1rem;
  }

  .btn-lost,
  .btn-found {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>