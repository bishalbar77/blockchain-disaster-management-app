<template>
  <div id="main">
    <div id="nav">
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="/" style="font-size:27px;">NASA CHAIN</a>
          </div>
            <ul class="nav navbar-nav">
              <router-link to="/payments"><li><a href="javascript:void(0)">All Transactions</a></li></router-link>
            </ul>
            <ul class="nav navbar-nav">
              <router-link to="/shopping"><li><a href="javascript:void(0)">Claims</a></li></router-link>
            </ul>
        </div>
      </nav>
    </div>
    <div class='container'>
        <Basket />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Basket from '@/components/Basket.vue'

export default {
  name: 'shoppingCart',
  components: {
    Basket
  }
}
</script>