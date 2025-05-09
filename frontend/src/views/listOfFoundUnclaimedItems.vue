<template>
  <div class="items-container">
    <h1 class="page-title">Found Unclaimed Items</h1>
    <div v-if="loading" class="loading-message">Loading items...</div>
    <div v-else-if="error" class="error-message">Error loading items: {{ error }}</div>
    <div v-else class="items-grid">
      <div v-for="(item, index) in items" :key="index" class="item-card">
        <div class="item-image">
          <img :src="item.imageurl || defaultImage" :alt="item.itemname" />
          <div class="no-image" v-if="!item.imageurl">No Image Available</div>
        </div>
        <div class="item-details">
          <h3 class="item-name">{{ item.itemname }}</h3>
          <p class="item-category">{{ item.category }}</p>
          <p class="item-description">{{ item.description }}</p>
          <p class="item-location" v-if="item.locationFound">
            <strong>Found at:</strong> {{ item.locationFound }}
          </p>
          <p class="item-date" v-if="item.dateFound">
            <strong>Date found:</strong> {{ formatDate(item.dateFound) }}
          </p>
          <div class="button-container">
            <button @click="handleClaim(item)" class="claim-btn">Claim</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const items = ref([]);
const loading = ref(true);
const error = ref(null);
const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const handleClaim = async (item) => {
  // Debug: Show the complete item object
  console.log('Claiming item:', item);
  
  // Get the actual report ID (trying different possible property names)
  const reportId = item.ReportId || item.reportID || item.id;
  
  if (!reportId) {
    alert('Error: This item has no valid Report ID');
    return;
  }

  const reason = prompt(`Please explain why you're claiming "${item.itemname}" (Report ID: ${reportId}):`);
  
  if (!reason || reason.trim() === '') {
    alert('Claim reason cannot be empty');
    return;
  }

  try {
    loading.value = true;
    const response = await fetch('http://localhost:3000/api/submit-claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reportID: Number(reportId), // Ensure it's sent as a number
        reason: reason.trim()
      })
    });

    const result = await response.json();
    console.log('Claim submission result:', result);

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit claim');
    }

    alert(`Claim submitted successfully for Report ID: ${reportId}`);
    // Refresh the items list
    fetchItems();
  } catch (err) {
    console.error('Error submitting claim:', err);
    alert(`Error: ${err.message}\n\nReport ID: ${reportId}\nPlease try again.`);
  } finally {
    loading.value = false;
  }
};

const fetchItems = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await fetch('http://localhost:3000/api/found-unclaimed-items');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched items:', data); // Debug: show the complete API response
    items.value = data;
  } catch (err) {
    console.error('Error fetching items:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.items-container {
  padding: 2rem;
  background-color: #1c1e3a;
  min-height: 100vh;
}

.page-title {
  color: #29d0d0;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
}

.item-card {
  background-color: #252a59;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.item-card:hover {
  transform: translateY(-5px);
}

.item-image {
  height: 200px;
  background-color: #3d4270;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  color: #a2a5c8;
  font-size: 1rem;
}

.item-details {
  padding: 1.5rem;
  color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #29d0d0;
}

.item-category {
  font-size: 1rem;
  color: #a2a5c8;
  margin-bottom: 1rem;
}

.item-description {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.item-location,
.item-date,
.item-report-id {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.item-report-id {
  color: #ffcc00; /* Yellow color for visibility */
  font-weight: bold;
}

.button-container {
  margin-top: auto;
}

.claim-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: #ff6b6b;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.claim-btn:hover {
  background-color: #e05555;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.loading-message,
.error-message {
  text-align: center;
  color: #a2a5c8;
  font-size: 1.2rem;
  padding: 2rem;
}

.error-message {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .items-grid {
    grid-template-columns: 1fr;
  }
  
  .items-container {
    padding: 1rem;
  }
}
</style>