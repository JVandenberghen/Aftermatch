import axios from 'axios';
import express from 'express';
import * as Sentry from '@sentry/node';
import apiKeyCheck from '../middleware/apiKeyCheck.js';

const router = express.Router();
const API_URL = 'https://api.football-data.org/v4/';
const API_KEY = process.env.FOOTBALL_API_KEY;

const apiHeaders = {
  headers: { 'X-Auth-Token': API_KEY },
};

// Middleware
router.use(apiKeyCheck);

//TODO: consider rate limiting middleware?
// Maybe overkill since I only accept requests from the frontend unless theres an infinite loop in the frontend,... ? Reflect on this later.

/**
 * Fetches and returns a list of football competitions.
 * 
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with competition data.
 **/
router.get('/competitions', async (req, res) => {
  try {
    const { data } = await axios.get(`${API_URL}competitions`, apiHeaders);
    res.json(data);
  } catch (error) {
    handleError(res, error, 'Error fetching competitions');
  }
});

/**
 * Fetches and returns details of a specific football competition.
 * 
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.id - The ID of the competition to fetch.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the competition details.
 **/
router.get('/competitions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${API_URL}competitions/${id}`,
      apiHeaders,
    );
    res.json(data);
  } catch (error) {
    handleError(res, error, `Error fetching competition ${id}`);
  }
});

/**
 * Fetches match data for a specific competition.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.id - The ID of the competition.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the match data.
 * @throws {Error} If the request fails.
 */
router.get('/competitions/:id/matches', async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${API_URL}competitions/${id}/matches`,
      apiHeaders,
    );
    res.json(data);
  } catch (error) {
    handleError(res, error, `Error fetching matches for competition ${id}`);
  }
});

/**
 * Fetches football matches data from the API within the specified date range.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.query.dateFrom - The start date for the matches to be fetched (in YYYY-MM-DD format).
 * @param {string} req.query.dateTo - The end date for the matches to be fetched (in YYYY-MM-DD format).
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the match data.
 * @throws {Error} - Throws an error if the API request fails.
 */
router.get('/matches', async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  try {
    const { data } = await axios.get(`${API_URL}matches`, {
      ...apiHeaders,
      params: { dateFrom, dateTo },
    });
    res.json(data);
  } catch (error) {
    handleError(res, error, 'Error fetching matches for the date range');
  }
});

/**
 * Fetches data for a specific football team by its ID.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.id - The ID of the football team to fetch.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the team data.
 * @throws {Error} If the request fails.
 */
router.get('/teams/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(`${API_URL}teams/${id}`, apiHeaders);
    res.json(data);
  } catch (error) {
    handleError(res, error, `Error fetching team ${id}`);
  }
});

/**
 * Fetches and returns a list of players for a specific football team.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.id - The ID of the team to fetch players for.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the players data.
 * @throws {Error} If the request fails.
 */
router.get('/teams/:id/players', async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(`${API_URL}teams/${id}`, apiHeaders);
    res.json(data.squad);
  } catch (error) {
    handleError(res, error, `Error fetching players for team ${id}`);
  }
});

/**
 * Fetches and returns the standings for a specific football competition.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.id - The ID of the competition to fetch standings for.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the standings data.
 * @throws {Error} If the request fails.
 */
router.get('/competitions/:id/standings', async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${API_URL}competitions/${id}/standings`,
      apiHeaders,
    );
    res.json(data);
  } catch (error) {
    handleError(res, error, `Error fetching standings for competition ${id}`);
  }
});

/**
 * Fetches and returns the top scorers for a specific football competition.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.id - The ID of the competition to fetch scorers for.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the scorers data.
 * @throws {Error} If the request fails.
 */
router.get('/competitions/:id/scorers', async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${API_URL}competitions/${id}/scorers`,
      apiHeaders,
    );
    res.json(data);
  } catch (error) {
    handleError(res, error, `Error fetching scorers for competition ${id}`);
  }
});

/**
 * Fetches and returns details of a specific football match.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.id - The ID of the match to fetch.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the match details.
 * @throws {Error} If the request fails.
 */
router.get('/matches/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(`${API_URL}matches/${id}`, apiHeaders);
    res.json(data);
  } catch (error) {
    handleError(res, error, `Error fetching match ${id}`);
  }
});

/**
 * Handles errors by logging them and sending an appropriate response.
 *
 * @param {express.Response} res - Express response object.
 * @param {Error} error - The error object.
 * @param {string} message - The error message to log and send in the response.
 */
const handleError = (res, error, message) => {
  Sentry.captureException(error);
  res.status(error.response?.status || 500).json({
    message: error.response?.data?.message || message,
  });
};

export default router;