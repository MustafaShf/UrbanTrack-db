<template>
  <div class="dashboard-layout">
    <div class="main-content">
      <div class="page-content">
        <!-- Page Header -->
        <div class="page-header">
          <h1 class="page-title">Claim Requests</h1>
        </div>

        <!-- Filters -->
        <div class="filters-section">
          <div class="filter-container">
            <div class="filter-group">
              <label class="filter-label">Location</label>
              <select v-model="filters.location" class="filter-select">
                <option value="">All</option>
                <option v-for="loc in uniqueLocations" :key="loc" :value="loc">{{ loc }}</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label">From Date</label>
              <input type="date" v-model="filters.from" class="date-input" />
            </div>

            <div class="filter-group">
              <label class="filter-label">To Date</label>
              <input type="date" v-model="filters.to" class="date-input" />
            </div>
          </div>

          <div class="filter-actions">
            <button @click="applyFilters" class="apply-filter-btn">Apply</button>
            <button @click="resetFilters" class="reset-filter-btn">Reset</button>
          </div>
        </div>

        <!-- Claim Requests Table -->
        <div class="items-table-container">
          <table class="items-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Requested By</th>
                <th>Reason</th>
                <th>Location</th>
                <th>Date Requested</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in filteredRequests" :key="request.id">
                <td>{{ request.itemName }}</td>
                <td>{{ request.requestedBy }}</td>
                <td>{{ request.reason }}</td>
                <td>{{ request.location }}</td>
                <td>{{ formatDate(request.dateRequested) }}</td>
                <td class="actions-cell">
                  <button @click="approve(request)" :disabled="request.approved !== null" class="approve-btn">
                    Approve
                  </button>
                  <button @click="disapprove(request)" :disabled="request.approved !== null" class="disapprove-btn">
                    Disapprove
                  </button>
                </td>
              </tr>
              <tr v-if="filteredRequests.length === 0">
                <td colspan="6">No claim requests match the selected filters.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClaimRequests",
  data() {
    return {
      filters: {
        location: '',
        from: '',
        to: ''
      },
      requests: [],
      filteredRequests: []
    };
  },
  computed: {
    uniqueLocations() {
      return [...new Set(this.requests.map(r => r.location))];
    }
  },
  mounted() {
    this.fetchClaims();
  },
  methods: {
    async fetchClaims() {
      try {
        const res = await fetch('http://localhost:3000/api/claims');
        const data = await res.json();
        console.log("data in fetch claims ",data )
        this.requests = data.map(c => ({
          id: c.ClaimID,
          ReportID:c.ReportID,
          itemName: c.ItemName,
          requestedBy: c.RequestedBy,
          reason: c.Reason,
          location: c.Location,
          dateRequested: c.DateRequested,
          status: c.ClaimStatus,
          approved: null // local state for UI
        }));
        this.filteredRequests = this.requests;
      } catch (err) {
        console.error("Error fetching claims:", err);
      }
    },
    applyFilters() {
      const { location, from, to } = this.filters;
      this.filteredRequests = this.requests.filter(req => {
        const matchesLocation = !location || req.location === location;
        const reqDate = new Date(req.dateRequested);
        const fromDate = from ? new Date(from) : null;
        const toDate = to ? new Date(to) : null;
        const matchesFrom = !fromDate || reqDate >= fromDate;
        const matchesTo = !toDate || reqDate <= toDate;
        return matchesLocation && matchesFrom && matchesTo;
      });
    },
    resetFilters() {
      this.filters = { location: '', from: '', to: '' };
      this.filteredRequests = this.requests;
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    async approve(request) {
      console.log("request in approve",request)
      try {
        const response = await fetch('http://localhost:3000/api/claims/accept', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reportId: request.ReportID })
        });

        const result = await response.text(); // assuming response is a message string
        alert(`Approved: ${result}`);
        request.approved = true;
      } catch (error) {
        console.error("Approval error:", error);
        alert("Failed to approve the request.");
      }
    },
    async disapprove(request) {
      try {
        const response = await fetch('http://localhost:3000/api/claims/reject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reportId: request.ReportID })
        });

        const result = await response.text(); // assuming response is a message string
        alert(`Rejected: ${result}`);
        request.approved = false;
      } catch (error) {
        console.error("Rejection error:", error);
        alert("Failed to reject the request.");
      }
    }
  }
};
</script>


<style scoped>
.items-table .actions-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.approve-btn {
  padding: 4px 8px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.disapprove-btn {
  padding: 4px 8px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.approve-btn:disabled,
.disapprove-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

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
  color: #4FD1C5;
  margin: 0;
}

.add-item-btn {
  display: flex;
  align-items: center;
  background-color: #4FD1C5;
  color: #1a1b36;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-item-btn:hover {
  background-color: #38B2AC;
}

.btn-icon {
  margin-right: 0.5rem;
  font-size: 1.25rem;
}

.filters-section {
  background-color: #2e2f5b;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filter-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: rgba(226, 232, 240, 0.7);
}

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
  border-color: #4FD1C5;
}

.date-range {
  display: flex;
  align-items: center;
}

.date-separator {
  margin: 0 0.5rem;
  color: rgba(226, 232, 240, 0.7);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.apply-filter-btn,
.reset-filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.apply-filter-btn {
  background-color: #4FD1C5;
  color: #1a1b36;
  border: none;
}

.apply-filter-btn:hover {
  background-color: #38B2AC;
}

.reset-filter-btn {
  background-color: transparent;
  color: #E2E8F0;
  border: 1px solid #E2E8F0;
}

.reset-filter-btn:hover {
  background-color: rgba(226, 232, 240, 0.1);
}

.items-table-container {
  background-color: #2e2f5b;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.items-table {
  width: 100%;
  border-collapse: collapse;
}

.items-table th,
.items-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.items-table th {
  font-weight: 600;
  color: #4FD1C5;
  background-color: #3e3f7b;
}

.items-table tr:hover {
  background-color: #3e3f7b;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.pending {
  background-color: rgba(237, 137, 54, 0.2);
  color: #ED8936;
}

.status-badge.matched {
  background-color: rgba(79, 209, 197, 0.2);
  color: #4FD1C5;
}

.status-badge.claimed {
  background-color: rgba(72, 187, 120, 0.2);
  color: #48BB78;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: #3e3f7b;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-btn {
  background-color: #2e2f5b;
  color: #E2E8F0;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #4FD1C5;
  color: #1a1b36;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: rgba(226, 232, 240, 0.7);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background-color: #2e2f5b;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4FD1C5;
  margin: 0;
}

.modal-close-btn {
  background-color: transparent;
  border: none;
  color: #E2E8F0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
}

.modal-content {
  padding: 1.5rem;
}

.item-details {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.item-image-container {
  width: 100%;
  aspect-ratio: 1;
  background-color: #1a1b36;
  border-radius: 0.5rem;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-group {
  display: flex;
  flex-direction: column;
}

.info-group label {
  font-size: 0.875rem;
  color: rgba(226, 232, 240, 0.7);
  margin-bottom: 0.25rem;
}

.info-group p {
  margin: 0;
}

.modal-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-action-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-action-btn.edit {
  background-color: #4FD1C5;
  color: #1a1b36;
  border: none;
}

.modal-action-btn.edit:hover {
  background-color: #38B2AC;
}

.modal-action-btn.cancel {
  background-color: transparent;
  color: #E2E8F0;
  border: 1px solid #E2E8F0;
}

.modal-action-btn.cancel:hover {
  background-color: rgba(226, 232, 240, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .item-details {
    grid-template-columns: 1fr;
  }

  .item-image-container {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style><!-- LostItemsManagement.vue -->