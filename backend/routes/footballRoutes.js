import express from 'express';
import axios from 'axios';

const router = express.Router();

const API_URL = 'https://api.football-data.org/v4/';
const API_KEY = process.env.API_KEY;

const apiHeaders = {
  headers: { 'X-Auth-Token': API_KEY },
};

router.get('/competitions', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}competitions`, apiHeaders);
    res.json(response.data);
  } catch (error) {
    handleError(res, error, 'Error fetching competitions');
  }
});

router.get('/competitions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${API_URL}competitions/${id}`,
      apiHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleError(res, error, `Error fetching competition ${id}`);
  }
});

router.get('/competitions/:id/matches', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${API_URL}competitions/${id}/matches`,
      apiHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleError(res, error, `Error fetching matches for competition ${id}`);
  }
});

router.get('/matches', async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  try {
    const response = await axios.get(`${API_URL}matches`, {
      ...apiHeaders,
      params: { dateFrom, dateTo },
    });
    res.json(response.data);
  } catch (error) {
    handleError(res, error, 'Error fetching matches for the date range');
  }
});

router.get('/teams/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_URL}teams/${id}`, apiHeaders);
    res.json(response.data);
  } catch (error) {
    handleError(res, error, `Error fetching team ${id}`);
  }
});

router.get('/teams/:id/players', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_URL}teams/${id}`, apiHeaders);
    res.json(response.data.squad);
  } catch (error) {
    handleError(res, error, `Error fetching players for team ${id}`);
  }
});

router.get('/competitions/:id/standings', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${API_URL}competitions/${id}/standings`,
      apiHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleError(res, error, `Error fetching standings for competition ${id}`);
  }
});

router.get('/competitions/:id/scorers', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${API_URL}competitions/${id}/scorers`,
      apiHeaders
    );
    res.json(response.data);
  } catch (error) {
    handleError(res, error, `Error fetching scorers for competition ${id}`);
  }
});

router.get('/matches/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_URL}matches/${id}`, apiHeaders);
    res.json(response.data);
  } catch (error) {
    handleError(res, error, `Error fetching match ${id}`);
  }
});

function handleError(res, error, message) {
  console.error(message, error.message);
  res.status(error.response?.status || 500).json({
    message: error.response?.data?.message || message,
  });
}

export default router;
