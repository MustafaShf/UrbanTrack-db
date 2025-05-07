<!-- AdminDashboard.vue -->
<template>
    <div class="dashboard-layout">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="logo-container">
                <h1 class="logo">UrbanTrack</h1>
                <span class="logo-icon">🔍</span>
            </div>
            <div class="nav-links">
                <router-link to="/admin" class="nav-link" active-class="active">
                    <span class="nav-icon">📊</span>
                    <span>Dashboard</span>
                </router-link>
                <router-link to="/admin/LostItems" class="nav-link" active-class="active">
                    <span class="nav-icon">❓</span>
                    <span>Lost Items</span>
                </router-link>
                <router-link to="/admin/FoundItemsList" class="nav-link" active-class="active">
                    <span class="nav-icon">✓</span>
                    <span>Found Items</span>
                </router-link>
                <router-link to="/admin/ClaimRequests" class="nav-link" active-class="active">
                    <span class="nav-icon">📋</span>
                    <span>Claim Requests</span>
                </router-link>
                <router-link to="/admin/UserList" class="nav-link" active-class="active">
                    <span class="nav-icon">👥</span>
                    <span>Users</span>
                </router-link>
                <router-link to="/admin/FeedbackPage" class="nav-link" active-class="active">
                    <span class="nav-icon">💬</span>
                    <span>Feedback</span>
                </router-link>
            </div>
            <div class="sidebar-footer">
                <span class="user-name">Admin User</span>
                <button class="logout-btn">Logout</button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">


            <!-- Dashboard Content -->
            <div class="dashboard-content">
                <h1 class="page-title">Admin Dashboard</h1>

                <!-- Stats Cards -->
                <div class="stats-container">
                    <div class="stat-card">
                        <div class="stat-icon lost-icon">❓</div>
                        <div class="stat-details">
                            <h3 class="stat-value">{{ stats.totalLost }}</h3>
                            <p class="stat-label">Lost Items</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon found-icon">✓</div>
                        <div class="stat-details">
                            <h3 class="stat-value">{{ stats.totalFound }}</h3>
                            <p class="stat-label">Found Items</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon claims-icon">📋</div>
                        <div class="stat-details">
                            <h3 class="stat-value">{{ stats.totalClaims }}</h3>
                            <p class="stat-label">Claim Requests</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon users-icon">👥</div>
                        <div class="stat-details">
                            <h3 class="stat-value">{{ stats.totalUsers }}</h3>
                            <p class="stat-label">Users</p>
                        </div>
                    </div>
                </div>

                <!-- Graphs Section -->
                <div class="graphs-container">
                    <div class="graph-card">
                        <h3 class="graph-title">Lost Items by Location</h3>
                        <canvas id="locationChart" ref="locationChart"></canvas>
                    </div>
                    <div class="graph-card">
                        <h3 class="graph-title">Claims Status Summary</h3>
                        <canvas id="claimsChart" ref="claimsChart"></canvas>
                    </div>
                </div>

                <!-- Recent Activities -->
                <!-- <div class="recent-activities-container">
            <h2 class="section-title">Recent Activities</h2>
            <div class="activities-list">
              <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
                <div class="activity-icon" :class="activity.type">{{ activity.icon }}</div>
                <div class="activity-details">
                  <p class="activity-text">{{ activity.text }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </div> -->

                <!-- Quick Links -->
                <div class="quick-links-container">
                    <h2 class="section-title">Quick Links</h2>
                    <div class="quick-links">
                        <router-link to="/admin/lost-items" class="quick-link-btn">
                            Manage Lost Items
                        </router-link>
                        <router-link to="/admin/found-items" class="quick-link-btn">
                            Manage Found Items
                        </router-link>
                        <router-link to="/admin/claims" class="quick-link-btn">
                            Review Claims
                        </router-link>
                        <router-link to="/admin/feedback" class="quick-link-btn">
                            Review Feedback
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
    name: 'AdminDashboard',
    data() {
        return {
            stats: {
                totalLost: 127,
                totalFound: 89,
                totalClaims: 42,
                totalUsers: 215
            },
            recentActivities: [
                {
                    icon: '❓',
                    type: 'lost',
                    text: 'New lost item reported: iPhone 13 Pro',
                    time: '10 mins ago'
                },
                {
                    icon: '✓',
                    type: 'found',
                    text: 'New found item reported: Wallet',
                    time: '25 mins ago'
                },
                {
                    icon: '📋',
                    type: 'claim',
                    text: 'New claim request for MacBook Pro',
                    time: '45 mins ago'
                },
                {
                    icon: '👤',
                    type: 'user',
                    text: 'New user registered: sarah_smith',
                    time: '1 hour ago'
                },
                {
                    icon: '✅',
                    type: 'approved',
                    text: 'Claim approved for AirPods Pro',
                    time: '2 hours ago'
                }
            ],
            locationData: null,
            claimsData: null
        }
    },
    mounted() {
        this.initCharts()
    },
    methods: {
        initCharts() {
            // Location chart
            const locationCtx = this.$refs.locationChart.getContext('2d')
            const locationData = {
                labels: ['Downtown', 'Park', 'Mall', 'University', 'Transit'],
                datasets: [{
                    label: 'Lost Items by Location',
                    data: [35, 25, 22, 30, 15],
                    backgroundColor: [
                        'rgba(79, 209, 197, 0.8)',
                        'rgba(79, 209, 197, 0.6)',
                        'rgba(79, 209, 197, 0.4)',
                        'rgba(79, 209, 197, 0.3)',
                        'rgba(79, 209, 197, 0.2)'
                    ],
                    borderColor: [
                        'rgba(79, 209, 197, 1)',
                        'rgba(79, 209, 197, 1)',
                        'rgba(79, 209, 197, 1)',
                        'rgba(79, 209, 197, 1)',
                        'rgba(79, 209, 197, 1)'
                    ],
                    borderWidth: 1
                }]
            }

            this.locationChart = new Chart(locationCtx, {
                type: 'bar',
                data: locationData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#E2E8F0'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#E2E8F0'
                            }
                        }
                    }
                }
            })

            // Claims chart
            const claimsCtx = this.$refs.claimsChart.getContext('2d')
            const claimsData = {
                labels: ['Approved', 'Pending', 'Rejected'],
                datasets: [{
                    data: [25, 15, 2],
                    backgroundColor: [
                        'rgba(72, 187, 120, 0.7)',
                        'rgba(79, 209, 197, 0.7)',
                        'rgba(245, 101, 101, 0.7)'
                    ],
                    borderColor: [
                        'rgba(72, 187, 120, 1)',
                        'rgba(79, 209, 197, 1)',
                        'rgba(245, 101, 101, 1)'
                    ],
                    borderWidth: 1
                }]
            }

            this.claimsChart = new Chart(claimsCtx, {
                type: 'doughnut',
                data: claimsData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#E2E8F0'
                            }
                        }
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.dashboard-layout {
    display: flex;
    min-height: 100vh;
    background-color: #1a1b36;
    color: #E2E8F0;
}

.sidebar {
    width: 250px;
    background-color: #2e2f5b;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.logo-container {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4FD1C5;
    margin-right: 0.5rem;
}

.logo-icon {
    font-size: 1.2rem;
}

.nav-links {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.nav-link {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    margin-bottom: 0.5rem;
    color: #E2E8F0;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
}

.nav-link:hover {
    background-color: #3e3f7b;
}

.nav-link.active {
    background-color: #4FD1C5;
    color: #1a1b36;
    font-weight: 500;
}

.nav-icon {
    margin-right: 0.75rem;
    font-size: 1.1rem;
}

.sidebar-footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
}

.user-name {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
}

.logout-btn {
    background-color: transparent;
    color: #4FD1C5;
    border: 1px solid #4FD1C5;
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.logout-btn:hover {
    background-color: #4FD1C5;
    color: #1a1b36;
}

.main-content {
    flex-grow: 1;
    padding: 1.5rem;
    overflow-y: auto;
}

.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.search-container {
    display: flex;
    align-items: center;
    background-color: #2e2f5b;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
}

.search-input {
    background-color: transparent;
    border: none;
    color: #E2E8F0;
    outline: none;
    width: 200px;
}

.search-input::placeholder {
    color: rgba(226, 232, 240, 0.5);
}

.search-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0;
}

.user-actions {
    display: flex;
    align-items: center;
}

.notification-icon {
    font-size: 1.2rem;
    margin-right: 1rem;
    cursor: pointer;
}

.user-avatar {
    font-size: 1.2rem;
    cursor: pointer;
}

.page-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #4FD1C5;
}

.stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background-color: #2e2f5b;
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-icon {
    font-size: 2rem;
    margin-right: 1rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
}

.lost-icon {
    background-color: rgba(245, 101, 101, 0.2);
    color: #F56565;
}

.found-icon {
    background-color: rgba(72, 187, 120, 0.2);
    color: #48BB78;
}

.claims-icon {
    background-color: rgba(237, 137, 54, 0.2);
    color: #ED8936;
}

.users-icon {
    background-color: rgba(79, 209, 197, 0.2);
    color: #4FD1C5;
}

.stat-details {
    display: flex;
    flex-direction: column;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.stat-label {
    font-size: 0.875rem;
    color: rgba(226, 232, 240, 0.7);
    margin: 0;
}

.graphs-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.graph-card {
    background-color: #2e2f5b;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.graph-title {
    font-size: 1.125rem;
    margin-bottom: 1rem;
    color: #4FD1C5;
}

.section-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #4FD1C5;
}

.recent-activities-container {
    background-color: #2e2f5b;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.activities-list {
    display: flex;
    flex-direction: column;
}

.activity-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-item:last-child {
    border-bottom: none;
}

.activity-icon {
    font-size: 1.25rem;
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
}

.activity-icon.lost {
    background-color: rgba(245, 101, 101, 0.2);
    color: #F56565;
}

.activity-icon.found {
    background-color: rgba(72, 187, 120, 0.2);
    color: #48BB78;
}

.activity-icon.claim {
    background-color: rgba(237, 137, 54, 0.2);
    color: #ED8936;
}

.activity-icon.user {
    background-color: rgba(79, 209, 197, 0.2);
    color: #4FD1C5;
}

.activity-icon.approved {
    background-color: rgba(72, 187, 120, 0.2);
    color: #48BB78;
}

.activity-details {
    flex-grow: 1;
}

.activity-text {
    margin: 0;
    font-size: 0.875rem;
}

.activity-time {
    font-size: 0.75rem;
    color: rgba(226, 232, 240, 0.5);
}

.quick-links-container {
    background-color: #2e2f5b;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quick-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.quick-link-btn {
    background-color: #3e3f7b;
    color: #E2E8F0;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}

.quick-link-btn:hover {
    background-color: #4FD1C5;
    color: #1a1b36;
}
</style>