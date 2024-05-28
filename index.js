const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const dataFilePath = path.join(__dirname, 'data', 'offices.json');

app.get('/api/offices', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read data file' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
