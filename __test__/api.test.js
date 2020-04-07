const req = require('supertest');
const db = require('../data/dbConfig');
const server = require('../server.js');

const generateAccessToken = require('../util/generateAccessToken')

beforeEach(async () => {
    await db('user').truncate();
})

jest.setTimeout(1000 * 8);

const mock_user = {
    "username": "MirraBot001",
    "email": "mirraSupporter01@gmail.com",
    "password": "CxMirra1245x1",
}

const mock_user_creds = {
    "username": "MirraBot001",
    "password": "CxMirra1245x1",
}

describe('auth/register', () => {
    it('can register a user -- returns 201 -- ', async () => {
        // simulate the api adding a access token to the user on register
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        let res = await req(server).post('/auth/register').send(user_with_token)
        // expect to have a good request
        expect(res.status).toEqual(201);
    })
    it('can register a user -- returns a thank you message -- ', async () => {
        // simulate the api adding a access token to the user on register
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        let res = await req(server).post('/auth/register').send(user_with_token)
        expect(res.body.message).toEqual('thank you for registering please log in now');
    })
})
describe('auth/login', () => {
    it('can login a user -- returns 200 -- ', async () => {
        // simulate the api adding a access token to the user on register
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        let res = await req(server).post('/auth/register').send(user_with_token)
        // expect to have a good request
        expect(res.status).toEqual(201);
        // user is registered.. now they should be able to login 
        const login = await req(server).post('/auth/login').send(mock_user_creds)

        expect(login.status).toBe(200)

    })

    it('can login a user -- returns a token  -- ', async () => {
        // simulate the api adding a access token to the user on register
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) };
        let res = await req(server).post('/auth/register').send(user_with_token);
        // expect to have a good request
        expect(res.status).toEqual(201);
        const login_res = await req(server).post('/auth/login').send(mock_user_creds);
        const { tokens } = login_res.body;
        const { refreshToken, timeoutToken } = tokens;
        expect(refreshToken.length).toBeGreaterThan(12);
        expect(timeoutToken.length).toBeGreaterThan(12);
    })
})


