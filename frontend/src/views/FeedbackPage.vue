<template>
  <div class="dashboard-layout">
    <div class="main-content">
      <div class="page-content">
        <!-- Page Header -->
        <div class="page-header">
          <h1 class="page-title">User Feedback</h1>
        </div>

        <!-- Feedback List -->
        <div class="feedback-list">
          <div
            v-for="(feedback, index) in feedbacks"
            :key="index"
            class="feedback-card"
          >
            <div class="feedback-header">
              <h3>{{ feedback.Name }}</h3>
              <span class="feedback-date">{{ formatDate(feedback.DateSubmitted) }}</span>
            </div>
            <p class="feedback-message">{{ feedback.Comments }}</p>

            <!-- Star Rating -->
            <div class="star-rating">
              <span
                v-for="star in 5"
                :key="star"
                class="star"
                :class="{ filled: star <= feedback.Rating }"
              >★</span>
            </div>

            <div class="feedback-footer">
              <span class="feedback-email">{{ feedback.Email }}</span>
            </div>
          </div>

          <div v-if="feedbacks.length === 2" class="no-feedback">
            No feedback submitted yet.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeedbackPage",
  data() {
    return {
      feedbacks: [],
    };
  },
  created() {
    this.fetchFeedbacks();
  },
  methods: {
    async fetchFeedbacks() {
      try {
        const res = await fetch("http://localhost:3000/api/reviews/summary");
        const data = await res.json();
        this.feedbacks = data;
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
};
</script>
  <style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #1a1b36;
  color: #E2E8F0;
}

.main-content {
  flex-grow: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.page-content {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #4FD1C5; /* Light purple */
  margin: 0;
}

.feedback-card {
  background-color: #2e2f5b;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
}

.feedback-card:hover {
  background-color: #3a3b6b;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.feedback-header h3 {
  color: #4FD1C5;
  font-size: 1.125rem;
  margin: 0;
}

.feedback-date {
  font-size: 0.875rem;
  color: rgba(226, 232, 240, 0.6);
}

.feedback-message {
  font-size: 1rem;
  line-height: 1.5;
  color: #E2E8F0;
  margin-bottom: 0.75rem;
}

.feedback-footer {
  font-size: 0.875rem;
  color: #CBD5E0;
}

.no-feedback {
  text-align: center;
  padding: 2rem;
  color: rgba(226, 232, 240, 0.5);
  font-style: italic;
}

/* Buttons */
.add-item-btn,
.apply-filter-btn {
  background-color: #A78BFA;
  color: #1a1b36;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-item-btn:hover,
.apply-filter-btn:hover {
  background-color: #9F7AEA;
}

.reset-filter-btn {
  background-color: transparent;
  color: #E2E8F0;
  border: 1px solid #A78BFA;
}

.reset-filter-btn:hover {
  background-color: rgba(167, 139, 250, 0.1);
}

/* Table Headers */
.items-table th {
  font-weight: 600;
  color: #A78BFA;
  background-color: #3e3f7b;
}

/* Pagination Buttons */
.pagination-btn:hover:not(:disabled) {
  background-color: #A78BFA;
  color: #1a1b36;
}

/* Status Badges */
.status-badge.pending {
  background-color: rgba(237, 137, 54, 0.15);
  color: #ED8936;
}

.status-badge.matched {
  background-color: rgba(167, 139, 250, 0.2);
  color: #A78BFA;
}

.status-badge.claimed {
  background-color: rgba(72, 187, 120, 0.2);
  color: #48BB78;
}

/* Modal */
.modal-title {
  color: #A78BFA;
}

/* Form Inputs & Filters */
.filter-select,
.date-input,
.search-input {
  background-color: #1a1b36;
  border: 1px solid #3e3f7b;
  border-radius: 0.375rem;
  padding: 0.5rem;
  color: #E2E8F0;
  outline: none;
  transition: border-color 0.2s ease;
}

.filter-select:focus,
.date-input:focus,
.search-input:focus {
  border-color: #A78BFA;
}
</style>
