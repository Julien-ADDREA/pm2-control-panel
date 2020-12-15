var ctrl = angular.module('controllers', ['directives']);

var socket = io();

ctrl.controller('indexController', function ($scope) {
  socket.emit('get-apps', "");
  socket.on('error', function (error) {
    UIkit.notification({
      message: "Une erreur s'est produite !",
      status: 'danger',
      pos: 'top-center',
      timeout: 3000
    });
  });
  socket.on('list-apps', function (applist) {
    $('body').addClass('loaded');
    $('#appsBody').empty();
    for (i in applist) {
      var app = applist[i];
      console.log('APP >', app);
      $('#appsBody').append("<tr><td>" + app.name + "</td><td>" + (app.pm2_env.status == 'online' ? '<span class="badge badge-online">ONLINE</span>' : '<span class="badge badge-offline">OFFLINE</span>') + "</td><td>" + (app.pm2_env.pm_uptime == 0 ? '--' : moment(app.pm2_env.pm_uptime).fromNow()) + "</td><td>" + (app.pid == 0 ? '--' : app.pid) + "</td><td>" + (app.monit.memory == 0 ? '--' : (app.monit.memory / 1024 / 1024).toFixed(2) + " MB") + "</td><td>" + (app.monit.cpu == 0 ? '--' : app.monit.cpu + ' %') + "</td><td><ul class='uk-iconnav'><li><a id='" + app.name + "' class='restartApp' href='' uk-icon='icon: refresh' title='Reload'></a></li><li><a id='" + app.name + "' class='startApp' href='' uk-icon='icon: play' title='Start'></a></li><li><a id='" + app.name + "' class='stopApp' href='' uk-icon='icon: close' title='Stop'></a></li><li><a id='" + app.name + "' class='delApp' href='' uk-icon='icon: trash' title='Remove'></a></li></ul></td></tr>");
    }
    $('.startApp').click(function() {
      var name = $(this).attr('id');
      socket.emit('startagain-app', name);
    });
    $('.restartApp').click(function() {
      var name = $(this).attr('id');
      socket.emit('restart-app', name);
    });
    $('.delApp').click(function() {
      var confdel = confirm("Etes-vous sûr de vouloir supprimer cette application ?");
      if (confdel) {
        var name = $(this).attr('id');
        socket.emit('del-app', name);
      }
    });
    $('.stopApp').click(function() {
      var name = $(this).attr('id');
      socket.emit('stop-app', name);
    });
  });
  $('#initapp').click(function() {
    var path = $('#newfilepath').val();
    var name = $('#newappname').val();
    if (path == "" || name == "") {
      UIkit.notification({
        message: "please fill out all the fields",
        status: 'primary',
        pos: 'top-center',
        timeout: 3000
      });
    } else {
      var obj = {
        'path': path,
        'name': name
      };
      socket.emit('start-app', obj);
      $('#startmodal').hide()
      $('body').removeClass('loaded');
    }
  })
});
