<template>
  <div class="items-container">
    <h1 class="page-title">Found Unclaimed Items</h1>
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
            <button @click="handleClaim(item)" class="claim-btn">Claim</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const items = ref([]);

// Sample data - replace with your actual data source
const sampleItems = [
  {
    name: "Sonic Frontiers physical copy",
    category: "Personal Item",
    description: "I found this on a desk. Was even signed so its probably important to someone.",
    image: "https://th.bing.com/th/id/OIP.IFhcMasBO_zlPOIBUJX-qQHaHZ?rs=1&pid=ImgDetMain"
  },
  {
    name: "Some dude",
    category: "Father (probably)",
    description: "Found a cool fella partyin lmao he so chill",
    image: "https://i.ytimg.com/vi/wg5f2dBHOqE/maxresdefault.jpg"
  }
];

const handleClaim = (item) => {
  console.log('Claiming item:', item);
  router.push('/');
};

onMounted(() => {
  const location = route.query.location;
  const date = route.query.date;
  console.log('Search Parameters:', { location, date });
  items.value = sampleItems.filter(item => true);
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