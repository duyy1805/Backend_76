const sql = require("mssql");

const config = {
  server: "LUNA",
  database: "TAG_QTKD",
  user: "duy",
  password: "Bichphuong0",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};


module.exports = {
  connect: () => sql.connect(config),
  sql,
};
