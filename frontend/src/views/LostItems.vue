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
<template>
    <div class="dashboard-layout">
        <div class="main-content">
            <div class="page-content">
                <div class="page-header">
                    <h1 class="page-title">Lost Items</h1>
                </div>

                <!-- Filters -->
                <div class="filters-section">
                    <div class="filter-container">
                        <div class="filter-group">
                            <label class="filter-label">Location</label>
                            <select v-model="filters.location" class="filter-select">
                                <option value="">All</option>
                                <option v-for="loc in uniqueLocations" :key="loc">{{ loc }}</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label class="filter-label">Date</label>
                            <input type="date" v-model="filters.date" class="date-input" />
                        </div>
                    </div>

                    <div class="filter-actions">
                        <button @click="applyFilters" class="apply-filter-btn">Apply</button>
                        <button @click="resetFilters" class="reset-filter-btn">Reset</button>
                    </div>
                </div>

                <!-- Lost Items Table -->
                <div class="items-table-container">
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filteredItems" :key="item.ReportId">
                                <td>{{ item.ItemName }}</td>
                                <td>{{ item.Description }}</td>
                                <td>{{ item.Location }}</td>
                                <td>{{ item.Date }}</td>
                            </tr>
                            <tr v-if="filteredItems.length === 0">
                                <td colspan="4" style="text-align:center;">No items found.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Data variables
const items = ref([]);
const filters = ref({
    location: '',
    date: ''
});

// Fetch data from the API on component mount
onMounted(async () => {
    const response = await fetch('http://localhost:3000/api/lost-items');
    const data = await response.json();
    items.value = data;
});

// Get unique locations for the filter
const uniqueLocations = computed(() => {
    const locations = items.value.map(item => item.Location);
    return [...new Set(locations)];
});

// Filter the items based on the selected filters
const filteredItems = computed(() => {
    return items.value.filter(item => {
        const matchesLocation = !filters.value.location || item.Location === filters.value.location;
        const matchesDate = !filters.value.date || item.Date === filters.value.date;
        return matchesLocation && matchesDate;
    });
});

// Apply filters (computed automatically updates)
const applyFilters = () => {
    // Logic already handled in computed property
};

// Reset filters
const resetFilters = () => {
    filters.value.location = '';
    filters.value.date = '';
};
</script>
