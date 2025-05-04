<script setup>
import { ref } from 'vue';

// Team members data
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'With over 10 years of experience in community service, Sarah founded Find & Recover to help reconnect people with their lost belongings.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    bio: 'Michael leads our technology initiatives, ensuring our platform is secure, efficient, and user-friendly for all community members.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a'
  },
  {
    name: 'Aisha Patel',
    role: 'Community Relations',
    bio: 'Aisha works with local businesses and organizations to expand our network and enhance our lost and found capabilities.',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e'
  }
];

// Stats
const stats = [
  { value: '15,000+', label: 'Items Recovered' },
  { value: '98%', label: 'Success Rate' },
  { value: '50+', label: 'Local Communities' }
];

// Testimonials
const testimonials = [
  {
    quote: "I lost my wallet during a morning jog and thought it was gone forever. Within hours of posting on Find & Recover, someone had found it and we arranged a meetup. The service was incredible!",
    author: "James Wilson",
    location: "Portland, OR"
  },
  {
    quote: "As a small business owner, we use Find & Recover for our cafe's lost and found system. It's streamlined our process and helped countless customers retrieve forgotten items.",
    author: "Maria Rodriguez",
    location: "Austin, TX"
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
          We're on a mission to reunite people with their lost belongings and create more connected communities.
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
              Find & Recover began in 2020 when our founder lost a cherished family heirloom and experienced firsthand
              how challenging and disorganized the process of finding lost items can be.
            </p>
            <p class="section-paragraph">
              What started as a simple community bulletin board has grown into a comprehensive platform that helps
              thousands of people recover their belongings every month.
            </p>
            <p class="section-paragraph">
              Our dedicated team works tirelessly to improve our services and expand our reach, all with the goal of
              making the recovery process as seamless as possible.
            </p>
          </div>
          <div class="image-container">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" alt="Team collaboration meeting"
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
        <h2 class="section-title">Meet Our <span class="highlight">Team</span></h2>
        <div class="team-grid">
          <div v-for="(member, index) in teamMembers" :key="index" class="team-member">
            <div class="member-image-container">
              <img :src="member.image" :alt="member.name" class="member-image" />
            </div>
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
        <h2 class="cta-title">Ready to <span class="highlight">Find</span> What You've Lost?</h2>
        <p class="cta-text">Join thousands of community members who have successfully recovered their belongings.</p>
        <div class="cta-buttons">
          <button class="btn-lost">Report Lost Item</button>
          <button class="btn-found">Report Found Item</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  background: linear-gradient(135deg, #ffefef 0%, #fffbef 50%, #efffef 100%);
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
  color: #000;
}

.highlight {
  color: #336622;
}

.hero-text {
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  color: #444;
}

/* Content Sections */
section {
  padding: 5rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #000;
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.section-paragraph {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.image-container {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.about-image {
  width: 100%;
  height: auto;
  display: block;
}

/* Stats Section */
.stats-section {
  background-color: rgba(255, 255, 255, 0.7);
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
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #336622;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #444;
}

/* Team Section */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.team-member {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-image-container {
  height: 250px;
  overflow: hidden;
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1.5rem 0 0.5rem;
  padding: 0 1.5rem;
}

.member-role {
  font-size: 1rem;
  color: #336622;
  font-weight: 600;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
}

.member-bio {
  font-size: 1rem;
  color: #444;
  line-height: 1.5;
  padding: 0 1.5rem 1.5rem;
}

/* Testimonials Section */
.testimonials-section {
  background-color: rgba(51, 102, 34, 0.05);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.quote-mark {
  font-size: 5rem;
  color: rgba(51, 102, 34, 0.1);
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-family: serif;
  font-weight: 900;
}

.testimonial-quote {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.testimonial-location {
  color: #666;
  font-size: 0.9rem;
}

/* Call to Action Section */
.cta-section {
  text-align: center;
  background-color: white;
  padding: 5rem 0;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-text {
  font-size: 1.2rem;
  color: #444;
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
  background-color: #e15b5b;
  color: white;
}

.btn-found {
  background-color: #57d957;
  color: white;
}

.btn-lost:hover,
.btn-found:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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