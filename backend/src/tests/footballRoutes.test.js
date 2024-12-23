import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import footballRoutes from '../routes/footballRoutes.js';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use('/api', footballRoutes);

jest.mock('axios');
jest.mock('@sentry/node');

describe('Football Routes', () => {
    let initialMockData = { response: { status: 200 }, data: [] };
    const mockError = { response: { status: 404, error: 'Not Found' } };
    let reqHeaders = {
        'x-api-key': process.env.FRONTEND_API_KEY,
        'Content-Type': 'application/json',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    it('GET /api/competitions - should fetch competitions if api key is valid', async () => {
        const mockData = {...initialMockData, data: [{ id: 1, name: 'Premier League' }] };
        axios.get.mockResolvedValue(mockData);
        const response = await request(app).get('/api/competitions').set(reqHeaders);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData.data);
        expect(response.status).not.toBe(403);
    });

    it('GET /api/competitions - should return 403 if api key is invalid or absent', async () => {
        const noKeyResp = await request(app).get('/api/competitions');
        expect(noKeyResp.status).toBe(403);
        expect(noKeyResp.body.error).toBe('Forbidden: Invalid API key');
        const invalidKeyResp = await request(app).get('/api/competitions').set({...reqHeaders, 'x-api-key': 'invalid'});
        expect(invalidKeyResp.status).toBe(403);
        expect(invalidKeyResp.body.error).toBe('Forbidden: Invalid API key');
    });

    it('Should should handle errors', async () => {
        axios.get.mockRejectedValue(mockError);
        const response = await request(app).get('/api/competitions/1').set(reqHeaders);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found');
    });
});