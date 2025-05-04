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
    <div class="container">
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

      <div class="action-content">
        <div class="action-buttons">
          <RouterLink to="/lost" class="btn-lost">
            Lost
            <span class="icon-lost">📦</span>
          </RouterLink>
          <RouterLink to="/found" class="btn-found">
            Found
            <span class="icon-found">✅</span>
          </RouterLink>
        </div>
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
  background-color: #252a59;
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
  color: white;
}

.highlight {
  color: #29d0d0;
  font-weight: 900;
}

.subtitle {
  font-size: 1.2rem;
  color: #a2a5c8;
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
  text-decoration: none;
  text-align: center;
}

.btn-lost {
  background-color: #ff6b6b;
  color: white;
}

.btn-found {
  background-color: #29d0d0;
  color: white;
}

.btn-lost:hover, .btn-found:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-lost:hover {
  background-color: #e05555;
}

.btn-found:hover {
  background-color: #22b2b2;
}

.icon-lost, .icon-found {
  font-size: 1.5rem;
  margin-left: 1rem;
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
}
</style>