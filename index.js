const express = require('express');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();
// const { connect } = require("./db.js");
// Khởi tạo ứng dụng Express
const app = express();
app.use(cors()); // Cho phép ReactJS giao tiếp với backend

// Cấu hình kết nối với SQL Server
const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    trustedConnection: process.env.DB_TRUSTED_CONNECTION === 'true',
    enableArithAbort: process.env.DB_ENABLE_ARITHABORT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
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

app.get('/api/khoBTP', async (req, res) => {
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
      .execute('BaoCao_Ton_Layoutkho_BTP__'); // Tên stored procedure của bạn

    // Trả về dữ liệu JSON cho frontend
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi kết nối với cơ sở dữ liệu.');
  }
});

app.get('/api/khoBTP/search', async (req, res) => {
  const So_LenhXuatBTP = req.query.So_LenhXuatBTP;
  const Itemcode = req.query.Itemcode;
  try {
    let pool = await sql.connect(config);

    // Gọi stored procedure với 3 tham số
    let result = await pool.request()
      .input('So_LenhXuatBTP', sql.VarChar, So_LenhXuatBTP)
      .input('Itemcode', sql.VarChar, Itemcode)
      .execute('BaoCao_ViTriVatTu_BTP_FindbyLenhXuatBTP__'); // Tên stored procedure của bạn
    //LXBTP-2023-10-1879
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
      .input('Mavitrikho', sql.VarChar, "A111")
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
