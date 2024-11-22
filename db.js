const sql = require("mssql");

module.exports = {
  connect: () => sql.connect(config),
  sql,
};
