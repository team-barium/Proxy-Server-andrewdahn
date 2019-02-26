const express = require('express');
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
const axios = require('axios');
let id = null;

const app = express();
const port = 3000;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.post('/randomid', (req, res) => {
  id = req.body.randomId;
});

app.get('/search/:keyword', (req, res) => {
  let keyword = req.params.keyword;
  axios
    .get(`http://localhost:3001/search/${keyword}`)
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => console.log(err));
});

app.get('/abibas/product', (req, res) => {
  axios
    .get('http://3.86.105.203:3002/abibas/product', { params: { id } })
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

app.get('/abibas/color', (req, res) => {
  let { id } = req.query;
  axios
    .get('http://3.86.105.203:3002/abibas/product', { params: { id } })
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

app.get('/reviews', (req, res) => {
  axios
    .get('http://18.191.191.154:3003/reviews', { params: { id } })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(err));
});

app.get('/reviews/stats', (req, res) => {
  axios
    .get('http://18.191.191.154:3003/reviews/stats', { params: { id } })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(err));
});

app.get('/suggestions', (req, res) => {
  axios
    .get('http://18.216.95.88:3004/suggestions', { params: { id } })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(JSON.stringify(err)));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
