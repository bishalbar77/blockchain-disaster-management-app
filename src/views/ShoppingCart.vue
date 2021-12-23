<template>
  <div id="main">
    <div id="nav">
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <router-link to="/"><a class="navbar-brand" href="javascript:void(0)" style="font-size:27px;">MINOR CHAIN</a></router-link>
          </div>
            <ul class="nav navbar-nav">
              <router-link to="/shopping"><li><a href="javascript:void(0)">Get Resources</a></li></router-link>
            </ul>
        </div>
      </nav>
    </div>
    <div class='container'>
        <GetResources />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GetResources from '@/components/GetResources.vue'

export default {
  name: 'shoppingCart',
  components: {
    GetResources
  }
}
</script>