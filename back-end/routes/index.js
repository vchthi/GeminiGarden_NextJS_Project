var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;

let currentPage = 1;
let totalPage = 0;

const next = () => {
  if (currentPage < totalPage) {
    currentPage++;
    getAllPage(currentPage);
  }
};

const prev = () => {
  if (currentPage > 1) {
    currentPage--;
    getAllPage(currentPage);
  }
};

const getAllPage = async (page = currentPage, limit = 10) => {
  try {
    const response = await fetch(`http://localhost:3000/product?page=${page}&limit=${limit}`);
    const data = await response.json();
    console.log(data);
    totalPage = data.countPage;
    let kq = "";
    let stt = 1;
    data.result.forEach((i) => {
      kq += `
       `;
      stt++;
    });
    // Assuming there's an element with id 'results' to display the data
    document.getElementById('results').innerHTML = kq;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
