<script setup>
import { ref } from 'vue';

const images = [
  { 
    src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    alt: 'Person using laptop for recovery services'
  },
  { 
    src: 'https://images.unsplash.com/photo-1584625271765-2681156a2329',
    alt: 'Lost item notice on a bulletin board'
  },
  { 
    src: 'https://images.unsplash.com/photo-1564329296477-58fc37677921',
    alt: 'Compass on a map'
  }
];
</script>

<template>
  <div class="homepage">
    <!-- Gradient Background -->
    <div class="gradient-background"></div>
    
    <!-- Main Content -->
    <div class="container">
      <!-- Left side with text -->
      <div class="text-content">
        <h1 class="title">
          Find & <br />
          Recover <br />
          <span class="highlight">With Ease</span>
        </h1>
        <p class="subtitle">
          Experience effortless recovery with our dedicated lost and found service.
        </p>
      </div>

      <!-- Right side with buttons and images -->
      <div class="action-content">
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-lost">
            Lost
            <span class="icon-lost">📦</span>
          </button>
          <button class="btn-found">
            Found
            <span class="icon-found">✅</span>
          </button>
        </div>

        <!-- Image Gallery -->
        <!-- <div class="image-gallery">
          <div 
            v-for="(image, index) in images" 
            :key="index" 
            class="gallery-image"
            :style="{ 
              transform: `translateX(${index * 20}px)`, 
              zIndex: images.length - index 
            }"
          >
            <img :src="image.src" :alt="image.alt" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ffefef 0%, #fffbef 50%, #efffef 100%);
  z-index: -1;
}

.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.text-content {
  flex: 1;
  padding-right: 2rem;
}

.title {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1.5rem;
  color: #000;
}

.highlight {
  color: #336622;
  font-weight: 900;
}

.subtitle {
  font-size: 1.2rem;
  color: #444;
  max-width: 450px;
}

.action-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 300px;
}

.btn-lost, .btn-found {
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-lost {
  background-color: #e15b5b;
  color: white;
}

.btn-found {
  background-color: #57d957;
  color: white;
}

.btn-lost:hover, .btn-found:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-lost, .icon-found {
  font-size: 1.5rem;
  margin-left: 1rem;
}

.image-gallery {
  position: relative;
  height: 300px;
  width: 400px;
}

.gallery-image {
  position: absolute;
  width: 250px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.gallery-image:hover {
  transform: translateY(-5px) !important;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }
  
  .text-content {
    padding-right: 0;
    margin-bottom: 3rem;
  }
  
  .title {
    font-size: 3.5rem;
  }
  
  .action-content {
    align-items: center;
  }
  
  .image-gallery {
    width: 100%;
    margin-top: 2rem;
  }
}
</style>