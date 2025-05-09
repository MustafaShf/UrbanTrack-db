<script setup>
import { ref } from 'vue';

// Team members data - updated with the co-founders
const teamMembers = [
  {
    name: 'Isbah Arif',
    role: 'Co-Founder & CEO',
    bio: 'As a co-founder of Urban Track, Isbah brings innovative vision and leadership to our mission of revolutionizing urban mobility tracking.'
  },
  {
    name: 'Muhammad Hassaan Moazan',
    role: 'Co-Founder & CEO',
    bio: 'Hassaan co-founded Urban Track with a passion for developing technology solutions that address real urban transportation challenges.'
  },
  {
    name: 'Ghulam Mustafa',
    role: 'Co-Founder & CEO',
    bio: 'Mustafas expertise in urban planning and technology has been instrumental in shaping Urban Tracks comprehensive approach to transportation solutions.'
  }
];

// Stats
const stats = [
  { value: '1500+', label: 'Journeys Tracked' },
  { value: '95%', label: 'Accuracy Rate' },
  { value: '20++', label: 'Urban Communities' }
];

// Testimonials
const testimonials = [
  {
    quote: "Urban Track has transformed how our city manages public transportation. The real-time tracking has improved our operational efficiency by over 30%.",
    author: "Syed Shahbaz Shah",
    location: "City Transit Authority"
  },
  {
    quote: "As a daily commuter, Urban Track has eliminated the uncertainty from my travels. I can plan my day with confidence knowing exactly when my transport will arrive.",
    author: "Muhammad Sohaib Naveed",
    location: "Urban Commuter"
  }
];
</script>

<template>
  <div class="about-page">
    <!-- Hero Section with Gradient Background -->
    <section class="hero-section">
      <div class="content-container">
        <h1 class="page-title">About <span class="highlight">Us</span></h1>
        <p class="hero-text">
          We're revolutionizing urban mobility with real-time tracking solutions for smarter, more efficient cities.
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="story-section">
      <div class="content-container">
        <div class="section-grid">
          <div class="text-content">
            <h2 class="section-title">Our <span class="highlight">Story</span></h2>
            <p class="section-paragraph">
              Urban Track began when our co-founders experienced firsthand the challenges of unreliable urban transportation
              and recognized the need for better tracking solutions.
            </p>
            <p class="section-paragraph">
              What started as a simple tracking application has evolved into a comprehensive urban mobility platform that helps
              thousands of commuters and transit authorities optimize their transportation networks every day.
            </p>
            <p class="section-paragraph">
              Our dedicated team works tirelessly to improve our technology and expand our services, all with the goal of
              making urban transportation more reliable, efficient, and accessible.
            </p>
          </div>
          <div class="image-container">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" alt="Urban mobility technology"
              class="about-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="content-container">
        <div class="stats-grid">
          <div v-for="(stat, index) in stats" :key="index" class="stat-card">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="team-section">
      <div class="content-container">
        <h2 class="section-title">Meet Our <span class="highlight">Founders</span></h2>
        <div class="team-grid">
          <div v-for="(member, index) in teamMembers" :key="index" class="team-member">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-bio">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="content-container">
        <h2 class="section-title">What People <span class="highlight">Say</span></h2>
        <div class="testimonials-grid">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
            <div class="quote-mark">"</div>
            <p class="testimonial-quote">{{ testimonial.quote }}</p>
            <p class="testimonial-author">{{ testimonial.author }}</p>
            <p class="testimonial-location">{{ testimonial.location }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="content-container">
        <h2 class="cta-title">Ready to <span class="highlight">Track</span> Your City?</h2>
        <p class="cta-text">Join thousands of urban commuters and transportation authorities who have optimized their mobility with Urban Track.</p>
        <div class="cta-buttons">
          <button class="btn-lost">Request Demo</button>
          <button class="btn-found">Download App</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  background-color: #252a59;
  color: white;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  padding: 6rem 0 4rem;
  text-align: center;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: white;
}

.highlight {
  color: #29d0d0;
}

.hero-text {
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  color: #a2a5c8;
}

/* Content Sections */
section {
  padding: 5rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: white;
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.section-paragraph {
  font-size: 1.1rem;
  color: #a2a5c8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.image-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.about-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Stats Section */
.stats-section {
  background-color: #1c1e3a;
  padding: 4rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}

.stat-card {
  padding: 2rem;
  border-radius: 10px;
  background-color: #252a59;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  border: 1px solid #3d4270;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #29d0d0;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #a2a5c8;
}

/* Team Section */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.team-member {
  background-color: #1c1e3a;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  border: 1px solid #3d4270;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: white;
}

.member-role {
  font-size: 1rem;
  color: #29d0d0;
  font-weight: 600;
  margin-bottom: 1rem;
}

.member-bio {
  font-size: 1rem;
  color: #a2a5c8;
  line-height: 1.5;
}

/* Testimonials Section */
.testimonials-section {
  background-color: #1c1e3a;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background-color: #252a59;
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d4270;
}

.quote-mark {
  font-size: 5rem;
  color: rgba(41, 208, 208, 0.1);
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-family: serif;
  font-weight: 900;
}

.testimonial-quote {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #a2a5c8;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: white;
}

.testimonial-location {
  color: #a2a5c8;
  font-size: 0.9rem;
}

/* Call to Action Section */
.cta-section {
  text-align: center;
  background-color: #1c1e3a;
  padding: 5rem 0;
  border-top: 1px solid #3d4270;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
}

.cta-text {
  font-size: 1.2rem;
  color: #a2a5c8;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn-lost,
.btn-found {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-lost {
  background-color: #ff6b6b;
  color: white;
}

.btn-found {
  background-color: #29d0d0;
  color: white;
}

.btn-lost:hover,
.btn-found:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-lost:hover {
  background-color: #e05555;
}

.btn-found:hover {
  background-color: #22b2b2;
}

/* Responsive Design */
@media (max-width: 992px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>