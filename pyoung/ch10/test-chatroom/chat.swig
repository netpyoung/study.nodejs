<html>
  <head>
    <meta charset='utf8'>
    <script src='/socket.io/socket.io.js'></script>
	<script src='./jquery-1.10.1.min.js'></script>
    <script src='./jquery.cookie.min.js'></script>
    <script>
    function on_ready() {
      var socket = io.connect('http://localhost/chat');

      $('button').click(function () {
        var input_msg = $("#message");
        var obj = {
          username: $.cookie('username'),
          message: input_msg.val()
        };

        socket.emit('req-message', obj);
        input_msg.val('');
      });

      socket.on('res-message', function (obj) {
        var username = obj.username;
        var message = obj.message;
        var output = '<p><b>' + username + '</b> : ' + message + '</p>';
        $(output).prependTo('.container');
      });
    }

    $(document).ready(on_ready);
    </script>
  </head>
  <body>
    <h1>Hello {{ username|title }} </h1>
    <hr />
    <input id='message' />
    <button id='button'>Send</button>

    <div class='container'>
    </div>
  </body>
</html>
