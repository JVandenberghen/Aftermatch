import request from 'supertest';
import { startServer, stopServer, app } from '../server';
import connectDB from '../db'; // Import the database connection function

// Mock the connectDB function to avoid actual DB connection during tests
jest.mock('../db', () => jest.fn());

describe('server.js', () => {
  beforeAll(async () => {
    // Mock successful DB connection to prevent actual DB connection in tests
    connectDB.mockResolvedValueOnce();
    
    // Start the server on a separate port
    await startServer();
  });

  afterAll(async () => {
    await stopServer(); // Close the server after tests
  });

  it('should use cors middleware', async () => {
    const response = await request(app).options('/');
    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toBe('GET,HEAD,PUT,PATCH,POST,DELETE');
    expect(response.headers['access-control-allow-headers']).toBe('Content-Type,Authorization');
  });

  it('should return JSON response on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ Aftermatch: 'available' });
  });

  it('should return 404 Not Found on GET /unknown', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });

  it('should correctly handle a GET request to /api/football/competitions', async () => {
    const response = await request(app).get('/api/football/competitions');
    expect(response.status).toBe(200);
  });

  it('should handle errors when starting the server', async () => {
    const listenMock = jest.spyOn(app, 'listen').mockImplementationOnce(() => {
      throw new Error('Failed to start server');
    });

    await expect(startServer()).rejects.toThrow('Failed to start server');

    listenMock.mockRestore();
  });

});
