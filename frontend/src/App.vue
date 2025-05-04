<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="app-container">
    <header class="header">
      <nav class="navbar">
        <div class="logo">
          <RouterLink to="/">
            <span class="logo-text">Urban<span class="ampersand">Track</span></span>
          </RouterLink>
        </div>
        
        <!-- Mobile menu button -->
        <button class="mobile-menu-button" @click="toggleMenu" aria-label="Toggle menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        
        <!-- Navigation links -->
        <ul class="nav-links" :class="{ 'active': isMenuOpen }">
          <li>
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/lost" class="nav-link nav-btn lost-btn">
              Lost Something
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/found" class="nav-link nav-btn found-btn">
              Found Something
            </RouterLink>
          </li>
          <div class="auth-buttons">
            <li>
              <RouterLink to="/login" class="nav-link auth-link">Login</RouterLink>
            </li>
            <li>
              <RouterLink to="/register" class="nav-link auth-link register-link">Register</RouterLink>
            </li>
          </div>
        </ul>
      </nav>
    </header>
    
    <!-- Main content -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  font-size: 1.6rem;
  font-weight: 800;
}

.logo-text {
  color: #000;
  text-decoration: none;
}

.ampersand {
  color: #336622;
  font-weight: 900;
  margin: 0 -2px;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
}

.nav-link:not(.nav-btn):not(.auth-link)::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #336622;
  transition: width 0.3s;
}

.nav-link:not(.nav-btn):not(.auth-link):hover::after,
.router-link-active:not(.nav-btn):not(.auth-link)::after {
  width: 100%;
}

.nav-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.lost-btn {
  background-color: #e15b5b;
}

.found-btn {
  background-color: #57d957;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.auth-buttons {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  gap: 1rem;
  border-left: 1px solid #eee;
  padding-left: 1rem;
}

.auth-link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;
}

.auth-link:hover {
  background-color: #f5f5f5;
}

.register-link {
  background-color: #336622;
  color: white;
}

.register-link:hover {
  background-color: #2a5419;
  color: white;
}

.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.bar {
  height: 3px;
  width: 100%;
  background-color: #333;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    flex-direction: column;
    background-color: white;
    padding: 5rem 2rem 2rem;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 5;
    gap: 2rem;
    align-items: flex-start;
  }
  
  .nav-links.active {
    right: 0;
  }
  
  .nav-btn, .auth-link {
    width: 100%;
    text-align: center;
  }

  .auth-buttons {
    width: 100%;
    flex-direction: column;
    border-left: none;
    border-top: 1px solid #eee;
    margin-left: 0;
    padding: 1rem 0 0;
    gap: 1rem;
  }
  
  .mobile-menu-button.active .bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  
  .mobile-menu-button.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-button.active .bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}
</style>