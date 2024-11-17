// tests/backend/user.test.js
const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary
const User = require('../models/User');

describe('User  API', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('User  registered successfully');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com'
            });

        const res =```javascript
        await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Login successful');
    });

    it('should not login with incorrect password', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'testuser@example.com'
            });

        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe('Invalid credentials');
    });
});
