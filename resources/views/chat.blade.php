<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Chat</title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <style>
        .list-group{
            overflow-y: scroll;
            height: 300px;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="div" id="app">
            <div class="offset-sm-1 col-sm-10">
                <li class="list-group-item active" aria-current="true">

                    Chat Room
                <span class="badge badge-pill badge-warning float-right mr-3">@{{usersCount}}</span>
                </li>
                <ul class="list-group" v-chat-scroll>
                    <message
                    v-for="value,index in chat.messages"
                    :key=value.index
                    :user=chat.users[index]
                    :color=chat.colors[index]
                    :position=chat.floatPositions[index]
                    :time=chat.times[index]
                    >
                    @{{value}}
                    </message>

                </ul>
                 <div class="badge badge-pill badge-primary">@{{isTyping}}</div>

                <input v-model="message" @keyup.enter='send' type="text" name="message" id="message" class="form-control" placeholder="type your message here..">

            </div>

        </div>
    </div>

    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>
