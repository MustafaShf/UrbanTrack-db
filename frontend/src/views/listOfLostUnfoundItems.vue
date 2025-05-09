<template>
  <div class="items-container">
    <h1 class="page-title">Lost Items</h1>
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
          <p class="item-location" v-if="item.AreaName">
            <strong>Lost at:</strong> {{ item.AreaName }}
          </p>
          <p class="item-date" v-if="item.dateLost">
            <strong>Date lost:</strong> {{ formatDate(item.dateLost) }}
          </p>
          <div class="button-container">
            <button @click="handleFoundClick(item)" class="found-btn">Found it?</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([]);
const loading = ref(true);
const error = ref(null);
const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const handleFoundClick = async (item) => {
  // Try to find any property that could be used as reportID
  const reportID = item.lostitemid || item.reportID || item.reportId || item.ReportID || item.ReportId;
  
  if (!reportID) {
    const availableProps = Object.keys(item).join(', ');
    alert(`Error: This item has no valid Report ID. Available properties: ${availableProps}`);
    return;
  }

  try {
    loading.value = true;
    
    const response = await fetch('http://localhost:3000/api/remove-lost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reportID: Number(reportID)
      })
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { message: text };
    }

    if (!response.ok) {
      throw new Error(result.error || result.details || result.message || 'Failed to remove lost item');
    }

    // Refresh the items list after successful operation
    await fetchItems();
    // Navigate to the report found item page
    router.push('/ReportFoundItem');
  } catch (err) {
    console.error('Error:', err);
    alert(`Error: ${err.message}`);
  } finally {
    loading.value = false;
  }
};

const fetchItems = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3000/api/lost-items');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Keep all original properties from the API response
    items.value = data;
  } catch (err) {
    console.error('Error fetching lost items:', err);
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

.loading-message,
.error-message {
  color: white;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.error-message {
  color: #ff6b6b;
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
  position: relative;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  color: #a2a5c8;
  font-size: 1rem;
  position: absolute;
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
.item-date {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: #a2a5c8;
}

.button-container {
  margin-top: 1rem;
}

.found-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: #29d0d0;
  color: #1c1e3a;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.found-btn:hover {
  background-color: #1fb6b6;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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