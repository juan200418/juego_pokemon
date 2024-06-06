<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/juego">juego</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #91c8ff;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #5dbe5d;

    &.router-link-exact-active {
      color: #055733;
    }
  }
}
</style>
