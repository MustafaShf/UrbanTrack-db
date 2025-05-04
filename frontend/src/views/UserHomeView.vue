<script setup>
import { ref } from 'vue';
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
        <!-- Add your content here when needed -->        
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
              Report Lost Item
            </RouterLink>
          </div>
        </div>
        <!-- This creates the empty dark purple space -->
      </div>
    </div>
  </div>

  <!-- thes -->

    <!-- Hero Section -->
    <div class="hero-section1">
      <div class="containerLostList">
        
        <!-- ////////////////////////////////////////////////////////////// -->
      </div>
    </div>

        <!-- New Dark Section that appears when scrolling -->
        <div class="dark-section1">
      <div class="containerFoundList">
        <!-- Add your content here when needed -->        

        <!-- This creates the empty dark purple space ///////////////////////////////////////-->
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

/* Keep existing button styles, just ensure this is present */

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
  max-width: 450px;
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

/* Keep all your existing button styles */
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
  max-width: 300px; /* Added to match your design */
  text-align: center;
  margin: 0 auto 0 0; /* Right-aligns button within its container */
}

.btn-found:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #22b2b2;
}

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