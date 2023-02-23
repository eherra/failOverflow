db.createUser({
  user: "username",
  pwd: "password",
  roles: [
    {
      role: "dbOwner",
      db: "failure_db",
    },
  ],
});

db.createCollection("failures");
db.createCollection("comments");
db.createCollection("starratings");
db.createCollection("users");
db.createCollection("votes");
