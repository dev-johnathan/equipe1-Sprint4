const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const chuckNorrisApiResponse = await axios.get('https://api.chucknorris.io/jokes/random');
    
    const formattedResponse = {
      data_atualizacao: formatDate(chuckNorrisApiResponse.data.updated_at),
      data_criacao: formatDate(chuckNorrisApiResponse.data.created_at),
      icone: chuckNorrisApiResponse.data.icon_url,
      id: uuidv4(),
      piada: chuckNorrisApiResponse.data.value.replace(/Chuck Norris/g, 'CHUCK NORRIS'),
      referencia: chuckNorrisApiResponse.data.url
    };

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

module.exports = router;
