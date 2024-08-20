const express = require('express');
const helmet = require('helmet');
const connectDB = require('../config/database');
const employeeRoutes = require('../routes/employeeRoutes');

const app = express();

connectDB();

app.use(helmet());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the HRMS Service!');
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HRMS service running on http://localhost:${PORT}`);
});
