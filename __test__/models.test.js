const db = require('../data/dbConfig');
const User = require('../models/user-model');

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
const mock_user2 = {
    "username": "MirraBot002",
    "email": "mirraSupporter02@gmail.com",
    "password": "CxMirra1245x2",

}
const mock_user3 = {
    "username": "MirraBot003",
    "email": "mirraSupporter03@gmail.com",
    "password": "CxMirra1245x3",
}


describe('create', () => {
    it('can create a user', async () => {
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        const [id] = await User.create(user_with_token)
        expect(id).toBe(1);
    })
})
describe('read', () => {
    it('can find all users', async () => {
        // create 3 users...
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        const user_with_token2 = { ...mock_user2, "access-token": generateAccessToken(mock_user2) }
        const user_with_token3 = { ...mock_user3, "access-token": generateAccessToken(mock_user3) }

        const user = await User.create(user_with_token)
        const user2 = await User.create(user_with_token2)
        const user3 = await User.create(user_with_token3)

        // Try to read the users
        //Find
        const users = await User.find();
        expect(users.length).toBe(3);
    })
    it('can find a user', async () => {
        // create 3 users...

        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        const user_with_token2 = { ...mock_user2, "access-token": generateAccessToken(mock_user2) }
        const user_with_token3 = { ...mock_user3, "access-token": generateAccessToken(mock_user3) }

        const user = await User.create(user_with_token)
        const user2 = await User.create(user_with_token2)
        const user3 = await User.create(user_with_token3)
        // try to find a user by their username
        // FindByUsername

        const r_user = await User.findByUsername(mock_user.username)
        // expect the user's username that we are give to match the username we it
        expect(r_user.username).toBe(mock_user.username)
    })
})
describe('update', () => {
    it('can update a user', async () => {
        // create a user to the database
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        const [id] = await User.create(user_with_token)

        const _changes = {
            ...mock_user,
            id,
            username: 'panda'
        }

        await User.update(_changes.id, _changes)
        const users = await User.find();
        // expect the rows affected to only be 1
        expect(users.length).toBe(1)

        const panda = await User.findByUsername(_changes.username)
        expect(panda.username).toBe('panda');
    })
})
describe('delete', () => {
    it('can delete a user', async () => {
        // create 3 users...
        const user_with_token = { ...mock_user, "access-token": generateAccessToken(mock_user) }
        const user_with_token2 = { ...mock_user2, "access-token": generateAccessToken(mock_user2) }
        const user_with_token3 = { ...mock_user3, "access-token": generateAccessToken(mock_user3) }
        const user = await User.create(user_with_token)
        const user2 = await User.create(user_with_token2)
        const user3 = await User.create(user_with_token3)
        // try to delete by id
        await User.remove(2);
        // now check the list... should be length of 2
        const users = await User.find()
        expect(users.length).toBe(2)
    })
})