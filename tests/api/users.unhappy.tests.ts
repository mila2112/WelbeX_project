import * as faker from "faker";
import chaiHttp from 'chai-http';
import chai from 'chai';
import spies from 'chai-spies';
import { app }  from '../../src/server';
import {models} from "../../src/db";

const { expect } = chai;

describe('API unhappy tests /users', () => {
    const email = faker.internet.email().toLowerCase();
    const firstName = faker.name.firstName().toLowerCase();
    const lastName = faker.name.lastName().toLowerCase();
    let user;
    before(async() => {
        user = await models.Users.create({
            firstName,
            lastName,
            email,
            password:"1234"
        });
        chai.use(chaiHttp);
        chai.use(spies);
    });

    describe('POST /sign-up', () => {
        it('should return 422 Validation error in case of password is missing', async () => {
            const res = await chai.request(app).post('/users/sign-up').set('Content-type', 'application/json').send(
                {
                    firstName,
                    lastName,
                    email,
                },
            );
            expect(res.status).to.be.equal(422);
        });
    });

    describe('POST /sign-in', () => {
        it('Should return 400 status when user not exists', async () => {
            const res = await chai.request(app).post('/users/sign-in').set('Content-type', 'application/json').send(
                {
                    email: "example@mail.ru",
                    password: "1234",
                },
            );
            console.log(res);
            expect(res.status).to.be.equal(400);
        });

        it('Should return 400 status when invalid password ', async () => {
            const res = await chai.request(app).post('/users/sign-in').set('Content-type', 'application/json').send(
                {
                    email: user.email,
                    password: "wrongPassword"
                },
            );
            console.log(res);
            expect(res.status).to.be.equal(400);
        });
    });
});
