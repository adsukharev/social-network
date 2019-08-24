<template>
  <div id="app">
    <header>
      <header-component></header-component>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <footer-component></footer-component>
    </footer>
  </div>

</template>

<script>
  import HeaderComponent from './components/header_footer/header-component.vue';
  import FooterComponent from './components/header_footer/footer-component.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      FooterComponent
    }
  };
</script>

<style>

</style>

