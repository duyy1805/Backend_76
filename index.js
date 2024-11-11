const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { connect } = require("./db.js");
// Khởi tạo ứng dụng Express
const app = express();
app.use(cors()); // Cho phép ReactJS giao tiếp với backend

// Cấu hình kết nối với SQL Server
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

// API để lấy dữ liệu từ SQL Server

app.get('/api/kho', async (req, res) => {
  const TenNha = req.query.TenNha;
  const ID_Kho = parseInt(req.query.ID_Kho);
  const MaVung = req.query.MaVung;
  try {
    let pool = await sql.connect(config);

    // Gọi stored procedure với 3 tham số
    let result = await pool.request()
      .input('TenNha', sql.VarChar, TenNha)
      .input('Id_kho', sql.Int, ID_Kho)
      .input('MaVung', sql.VarChar, MaVung)
      .execute('BaoCao_Ton_LayoutKHo'); // Tên stored procedure của bạn

    // Trả về dữ liệu JSON cho frontend
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi kết nối với cơ sở dữ liệu.');
  }
});

app.get('/api/kho2', async (req, res) => {
  // const iD_Kho = parseInt(req.query.iD_Kho);
  // const tenNha = req.query.tenNha;
  // const Mavitrikho = req.query.Mavitrikho;
  // const MaVung = req.query.MaVung;
  try {
    let pool = await sql.connect(config);

    // Gọi stored procedure với 3 tham số
    let result = await pool.request()
      .input('iD_Kho', sql.Int, 1)
      .input('tenNha', sql.VarChar, "Kho N1")
      .input('Mavitrikho', sql.VarChar, "A311")
      .input('MaVung', sql.VarChar, 'A')
      .execute('BaoCao_TonViTri'); // Tên stored procedure của bạn

    // Trả về dữ liệu JSON cho frontend
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi kết nối với cơ sở dữ liệu.');
  }
});
app.get('', async (req, res) => {
  return res.json("hello")
});
// Cấu hình server lắng nghe cổng
app.listen(5000, () => {
  console.log('Server đang chạy trên cổng 5000');
});
