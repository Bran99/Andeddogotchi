var app=angular.module("andeddogotchi",[]),fillfull=$(".fillfull").width(),fillhealth=$(".fillhealth").width(),token=$('[name="csrf-token"]').attr("content");app.config(["$httpProvider",function(e){e.defaults.headers.common["X-CSRF-Token"]=token}]),app.controller("andeddoController",["$http",function(e){this.user={},this.gotchi={},this.gotchiName,this.loggedIn,this.newName,this.isDead,this.helper_shown,this.fbName;var t=this;angular.element(document).ready(function(){t.checkLogin()}),this.checkLogin=function(){e.get("/session_check.json").success(function(e){e.user?s(e):t.loggedIn=!1})};var s=function(e){t.loggedIn=!0,t.gotchiName=e.user.gotchi_name,t.helper_shown=e.user.helper_shown,e.gotchi?(t.gotchi=e.gotchi,interval=setInterval(pageTick,isSleeping)):$(".gotchi").addClass("died")};this.createUser=function(){e.post("/users.json",{authenticity_token:token,user:this.user}).success(function(e){t.gotchiName=e.user.gotchi_name,s(e)})},this.login=function(){e.post("/session.json",{authenticity_token:token,user:this.user}).success(function(e){e.user.gotchi_name?(t.gotchiName=e.user.gotchi_name,s(e),readyFunction(),t.isDead=isDead(),t.isDead!==!0||$(".death-show")||$(".grabThis").addClass("death-show")):isDead()})},this.logOut=function(){e({method:"DELETE",url:"/session.json",data:{params:{authenticity_token:token}}}).success(function(){t.loggedIn=!1,clearInterval(interval),$(".grabThis").hasClass("death-show")&&$(".grabThis").removeClass("death-show")})},this.deadGotchi=function(){e.get("/gotchis/new.json",{authenticity_token:token}).success(function(e){s(e),t.gotchiName=t.newName,$(".grabThis").removeClass("death-show"),$(".grabThis").addClass("death"),$(".gotchi").removeClass("died")})}}]);