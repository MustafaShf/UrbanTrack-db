<!-- ClaimRequest.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const reportId = ref(parseInt(route.params.reportId, 10));

const claimReason = ref('');

const isLoading = ref(false);
const error = ref('');

onMounted(() => {
  // First try to get from route query
  const routeId = route.query.reportId;
  
  // Then try localStorage
  const storedId = localStorage.getItem('claimingReportId');
  
  // Parse the ID (priority to route query)
  const idToUse = routeId || storedId;
  
  if (idToUse) {
    reportId.value = parseInt(idToUse, 10);
    console.log('Loaded report ID:', reportId.value); // Debug
  } else {
    error.value = 'Invalid item reference. Please select an item to claim.';
    console.error('No report ID found in route or localStorage');
  }
});

const submitClaim = async () => {
  console.log('Submit button clicked'); // Debug log
  
  if (!claimReason.value) {
    error.value = 'Please provide a reason for your claim';
    console.error('No claim reason provided'); // Debug log
    return;
  }

  if (!reportId.value) {
    error.value = 'Invalid item reference. Please select an item to claim.';
    console.error('No report ID available'); // Debug log
    return;
  }

  isLoading.value = true;
  error.value = '';
  console.log('Submitting claim with:', { reportID: reportId.value, reason: claimReason.value }); // Debug log

  try {
    const response = await fetch('http://localhost:3000/api/submit-claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reportID: reportId.value,
        reason: claimReason.value
      })
    });
    console.log('Response status:', response.status); // Debug log

    const result = await response.json();
    console.log('Response data:', result); // Debug log

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit claim');
    }

    localStorage.removeItem('claimingReportId');
    router.push('/claim-submitted');
  } catch (err) {
    console.error('Error submitting claim:', err);
    error.value = err.message || 'Failed to submit claim. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
    <div class="claim-page">
      <div class="container">
        <div class="form-section">
          <form class="claim-form" @submit.prevent="submitClaim">
            <h2>Claim Request</h2>
            
            <!-- Add error display -->
            <div v-if="error" class="error-message">{{ error }}</div>
            
            <div class="input-group">
              <label>Reason for Claim *</label>
              <textarea 
                placeholder="Please explain why you're claiming this item..."
                v-model="claimReason"
                required
              ></textarea>
            </div>
            
            <button type="submit" class="btn-submit" :disabled="isLoading">
              {{ isLoading ? 'Submitting...' : 'Submit Claim' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.claim-page {
  background-color: #1c1e3a;
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 500px;
}

.form-section {
  background-color: #252a59;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #3d4270;
}

.claim-form h2 {
  margin-bottom: 30px;
  text-align: center;
  color: white;
  font-weight: 800;
  font-size: 1.8rem;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #a2a5c8;
  font-size: 14px;
}

.input-group textarea {
  width: 100%;
  padding: 12px 15px;
  min-height: 150px;
  border: 1px solid #3d4270;
  border-radius: 6px;
  background-color: #1c1e3a;
  color: white;
  resize: vertical;
}

.input-group textarea:focus {
  outline: none;
  border-color: #29d0d0;
}

.btn-submit {
  padding: 14px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
  background-color: #22b2b2;
  color: white;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
}

.error-message {
  color: #ff6b6b;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  text-align: center;
}

.btn-submit:hover {
  background-color: #1d9c9c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .form-section {
    padding: 30px;
  }
}
</style>