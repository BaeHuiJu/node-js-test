var socket = io();

// 접속 되었을 때 실행
socket.on('connect', function() {

    // 이름입력
    var name = prompt('반갑습니다. 닉네임을 입력해주세요.','');

    if(!name) {
        name = '익명';
    }

    // 서버에 새로운 유저가 왔다고 알림
    socket.emit('newUser', name);
})

socket.on('update', function(data) {
    var chat = document.getElementById('chat');

    var message = document.createElement('div');
    var node = document.createTextNode(`${data.name}: ${data.message}`);
    var className = '';

    switch(data.type) {
        case 'message' :
        className = 'other';
        break;

        case 'connect' :
        className = 'connect';
        break;

        case 'disconnect' :
        className = 'disconnect';
        break;
    }

    message.classList.add(className);
    message.appendChild(node);
    chat.appendChild(message);
})


// 메세지 전송 함수
function send() {
    // 입력되어있는 데이터 가져오기
    var message = document.getElementById('test').value;
    // 가져왔으니 데이터 빈칸으로 변경
    document.getElementById('test').value = '';

    // 내가 전송할 메세지 클라이언트에게 표시
    var chat = document.getElementById('chat');
    var msg = document.createElement('div');
    var node = document.createTextNode(message);

    msg.classList.add('me');
    msg.appendChild(node);
    chat.appendChild(msg);

    // 서버로 send 이벤트 전달 + 데이터와 함께, on: 수신, emit: 전송
    socket.emit('message', {type: 'message', message: message});
}