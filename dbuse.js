var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var express = require('express');
var bodyParser = require('body-parser');
/* router별로 분리하기 위해 express의 라우터 기능 사용 */
var router = express.Router();

/* post를 적용하기 위한 설정 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

/* 오라클 오토커밋 설정 */
oracledb.autoCommit = true;

/* select */
// router.get('/db', function(request, response) {
  oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    },
    function(err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('■■■■■■■■■■■■■■ usr_global select start ■■■■■■■■■■■■■■');

      var query = 
        'SELECT * FROM USR_GLOBAL WHERE ROWNUM <= 2';

      connection.execute(query, function(err, result) {
        if (err) {
          console.error(err.message);

          doRelease(connection);
          return;
        }
        doRelease(connection, result.rows);
      });

    }
  );
  function doRelease(connection, userlist) {
    connection.close(function(err) {
      if (err) {
        console.error(err.message);
      }
      
      console.log('list size: ' + userlist.length);

      for(var i=0; i<userlist.length; i++) {
        console.log('name: ' + userlist[i][1]);
      }
      //response.send(userlist);
    });
  };
//});
