<template>
  <div class="items-container">
    <h1 class="page-title">Lost Items</h1>
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
import { useRoute } from 'vue-router';

const route = useRoute();
const items = ref([]);

// Sample data - replace with your actual data source
const sampleItems = [
  {
    name: "Sonic Frontiers physical copy",
    category: "Personal Item",
    description: "Man I just had it signed by Roger Craig Smith :(",
    image: "https://th.bing.com/th/id/OIP.IFhcMasBO_zlPOIBUJX-qQHaHZ?rs=1&pid=ImgDetMain"
  },
  {
    name: "Hatsune Miku Action Figure",
    category: "Personal Item",
    description: "I will give anything to whomever finds it. Its a limited edition figure PLEASE I NEED IT",
    image: "https://media-photos.depop.com/b1/44817058/1686462724_a8a4167aa4c94963ba8818fc1ffb4747/P0.jpg"
  },
  {
    name: "My dad",
    category: "Father",
    description: "He left to bring milk 9 days ago where is heeeee ????",
    image: "https://th.bing.com/th/id/OIP.GDjWAdUAzUUcQYSpc_94-gHaHa?rs=1&pid=ImgDetMain"
  }
];

const handleFoundClick = (item) => {
  console.log(`Found item: ${item.name}`);
  // Add your logic here for when someone clicks "Found it?"
  alert(`Thank you for reporting you found "${item.name}"! We'll contact you shortly.`);
};

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
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.button-container {
  margin-top: auto;
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