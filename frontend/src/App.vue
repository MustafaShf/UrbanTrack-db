<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <RouterLink to="/">MyApp</RouterLink>
      </div>
      <ul class="nav-links">
        <li>
          <RouterLink to="/" class="nav-link">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </li>
      </ul>
    </nav>
    <RouterView />
  </header>
</template>

<style scoped>
/* General Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
}

.navbar .logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 12px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
  color: #ecf0f1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
  }

  .nav-links li {
    margin-left: 0;
    margin-bottom: 10px;
  }
}
</style>
