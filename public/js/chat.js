/**
 * Created by tom on 10/4/14.
 */
(function () {
  var room = 'lobby';
  var listRooms = function(trm){
    $.ajax({
      method: 'GET',
      url: '/rooms',
      success: function(data){
        var rooms = JSON.parse(data);
        var tbl = new AsciiTable('Active Rooms');
        tbl.setHeading('','Room');
        for (var r = 0; r < rooms.length; r++){
          tbl.addRow(r+1, rooms[r]);
        }
        trm.echo(tbl.toString());
      },
      error: function(xhr, status, err){
        trm.echo('[[;red;]Unable to fetch rooms - ' + xhr.status + ': ' + err +']');
      }
    })

  };
  var listUsers = function(trm){
    $.ajax({
      method: 'GET',
      url: '/users',
      success: function(data){
        var users = JSON.parse(data);
        var tbl = new AsciiTable('Active Users');
        tbl.setHeading('', 'User', 'Room');
        trm.echo('----- Active Users -----');
        var padNum = Array(users.length.toString().length).join(' ');
        for (var user in users){
          trm.echo(' ')
        }
      }

    })
  };
  $(function () {
    $('#term').terminal({
          '/room': function(a){
            room = a;
          },
          '/clear': function(){

          },
          '/quit': function(){

          },
          '/help': function(){

          },
          '/list': function(a){
            switch(a.toLowerCase()){
              case 'rooms': listRooms(this); break;
              case 'users': listUsers(this); break;
              default: this.echo('[[;red;]Unrecognized list option: ' + a + ']');
            }
          }



        }




        ,{
      greetings: 'Logged in as ' + local_user.displayName,
      name     : 'chatterbox',
      height   : 450,
      width    : 800,
      prompt   : '> ',
      exit     : false,
      noEcho   : true});
  });
})();

