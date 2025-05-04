<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style scoped>
.navbar {
    background-color: #333;
    color: white;
    padding: 10px;
}

.navbar ul {
    list-style-type: none;
    padding: 0;
}

.navbar li {
    display: inline;
    margin-right: 20px;
}

.navbar a {
    color: white;
    text-decoration: none;
}

.navbar a:hover {
    text-decoration: underline;
}
</style>