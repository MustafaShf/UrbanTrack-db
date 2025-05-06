<template>
    <div class="items-container">
      <h1 class="page-title">Found Claimed Items</h1>
      <div class="items-grid">
        <div v-for="(item, index) in items" :key="index" class="item-card">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" v-if="item.image" />
            <div class="no-image" v-else>No Image Available</div>
          </div>
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-category">{{ item.category }}</p>
            <p class="item-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const items = ref([]);
  
  // Sample data - replace with your actual data source
  const sampleItems = [
  {
    name: "Hatsune Miku Air Pods",
    category: "Personal Item",
    image: "https://th.bing.com/th/id/OIP.g2yijiq3s2QibN50rXPeUQHaHa?rs=1&pid=ImgDetMain"
  },
  ];
  
  onMounted(() => {
  // Get search parameters from URL
  const location = route.query.location;
  const date = route.query.date;
  
  console.log('Search Parameters:', { location, date });
  
  // Here you would normally fetch data based on location and date
  // For now, we'll use sample data
  items.value = sampleItems.filter(item => {
    // Add your filtering logic here based on location/date
    return true;
  });
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