<template>
  <div id="main">
    <div id="nav">
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <router-link to="/"><a class="navbar-brand" href="javascript:void(0)" style="font-size:27px;">MINOR CHAIN</a></router-link>
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
    <div class="jumbotron text-center">
      <h1>LOCATION CHECK</h1>
      <p>Instantly check any disaster/landslide issues near your location</p>
      <button type="button" class="btn btn-default" onclick="getCoordinates2()" 
      style="text-align: center; padding-left: 300px; font-weight: bold; font-size: larger; padding-right: 300px;">AM I SAFE!!</button>
      <!-- <form>
        <input type="text" name="location" class="form-control" size="50" id="Location" onfocus="window.onfocuslocation();">
      </form> -->
    </div>
    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-sm-8">
          <h2>Create Alert</h2>
          <br>
          
          <br>
          <p>
            Alert is being created as soon as trigger from global LHASA (Landslide Hazard Assessment for Situational Awareness)
            model is obtained. It is a global landslide model built recently i.e. April 2018 & integrated
            with IMERG(Integrated Multi Satellite Retrievals for GPM) which shows recent precipitation & updated every 30 minutes. 
            In order to access location, we have used custom API (data.nasa.gov/resource/tfkf-kniw.json) to access location data for high alert in our smart contract.
          </p>
          <br>
          <button class="btn btn-default btn-lg">CREATE ALERT</button>
        </div>
        <div class="col-sm-4">
          <span class="glyphicon glyphicon-signal logo"></span>
        </div>
      </div>
    </div>
    <footer class="container-fluid text-center">
    <p>Developed By
      <a href="#" title="Visit w3schools">Minor Chain</a>
    </p>
  </footer>
  </div>
  
</template>


<style>
  body {
      font: 400 15px Lato, sans-serif;
      line-height: 1.8;
      color: #818181;
  }
  h2 {
      font-size: 24px;
      text-transform: uppercase;
      color: #303030;
      font-weight: 600;
      margin-bottom: 30px;
  }
  h4 {
      font-size: 19px;
      line-height: 1.375em;
      color: #303030;
      font-weight: 400;
      margin-bottom: 30px;
  }  
  .jumbotron {
      background-color: #b3b3b3;
      color: #fff;
      padding: 100px 25px;
      font-family: Montserrat, sans-serif;
  }
  .container-fluid {
      padding: 60px 50px;
  }
  .bg-grey {
      background-color: #f6f6f6;
  }
  .logo-small {
      color: #f4511e;
      font-size: 50px;
  }
  .logo {
      color: #f4511e;
      font-size: 200px;
  }
  .thumbnail {
      padding: 0 0 15px 0;
      border: none;
      border-radius: 0;
  }
  .thumbnail img {
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
  }
  .carousel-control.right, .carousel-control.left {
      background-image: none;
      color: #f4511e;
  }
  .carousel-indicators li {
      border-color: #f4511e;
  }
  .carousel-indicators li.active {
      background-color: #f4511e;
  }
  .item h4 {
      font-size: 19px;
      line-height: 1.375em;
      font-weight: 400;
      font-style: italic;
      margin: 70px 0;
  }
  .item span {
      font-style: normal;
  }
  .panel {
      border: 1px solid #f4511e; 
      border-radius:0 !important;
      transition: box-shadow 0.5s;
  }
  .panel:hover {
      box-shadow: 5px 0px 40px rgba(0,0,0, .2);
  }
  .panel-footer .btn:hover {
      border: 1px solid #f4511e;
      background-color: #fff !important;
      color: #f4511e;
  }
  .panel-heading {
      color: #fff !important;
      background-color: #f4511e !important;
      padding: 25px;
      border-bottom: 1px solid transparent;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
  }
  .panel-footer {
      background-color: white !important;
  }
  .panel-footer h3 {
      font-size: 32px;
  }
  .panel-footer h4 {
      color: #aaa;
      font-size: 14px;
  }
  .panel-footer .btn {
      margin: 15px 0;
      background-color: #f4511e;
      color: #fff;
  }
  .navbar {
      margin-bottom: 0;
      background-color: #f4511e;
      z-index: 9999;
      border: 0;
      font-size: 12px !important;
      line-height: 1.42857143 !important;
      letter-spacing: 4px;
      border-radius: 0;
      font-family: Montserrat, sans-serif;
  }
  .navbar li a, .navbar .navbar-brand {
      color: #fff !important;
  }
  .navbar-nav li a:hover, .navbar-nav li.active a {
      color: #f4511e !important;
      background-color: #fff !important;
  }
  .navbar-default .navbar-toggle {
      border-color: transparent;
      color: #fff !important;
  }
  footer .glyphicon {
      font-size: 20px;
      margin-bottom: 20px;
      color: #f4511e;
  }
  .slideanim {visibility:hidden;}
  .slide {
      animation-name: slide;
      -webkit-animation-name: slide;
      animation-duration: 1s;
      -webkit-animation-duration: 1s;
      visibility: visible;
  }
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes slide {
    0% {
      opacity: 0;
      -webkit-transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      -webkit-transform: translateY(0%);
    }
  }
  @media screen and (max-width: 768px) {
    .col-sm-4 {
      text-align: center;
      margin: 25px 0;
    }
    .btn-lg {
        width: 100%;
        margin-bottom: 35px;
    }
  }
  @media screen and (max-width: 480px) {
    .logo {
        font-size: 150px;
    }
  }
</style>

<script>

export default {
  name: 'home'
}
</script>

<style scope>
  #main {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
