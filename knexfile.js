
module.exports = {

  development: {
    client: 'pg',
    connection:{
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
      // url: "postgres://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_NAME
    },
    pool: {
      afterCreate: function (conn, done) {
        conn.query('SET timezone="UTC +8";', function (err) {
          if (err) {
            done(err, conn);
          } else {
            done(err, conn);
          }
        });
      }
    },
    acquireConnectionTimeout: 1000 * 60 * 60 * 25
  },
};
