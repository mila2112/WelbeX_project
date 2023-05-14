import * as faker from "faker";
import chaiHttp from 'chai-http';
import chai from 'chai';
import spies from 'chai-spies';
import { app }  from '../../src/server';

const { expect } = chai;

describe('API tests /users', () => {
    const password = faker.internet.password();
    const email = faker.internet.email().toLowerCase();
    const firstName = faker.name.firstName().toLowerCase();
    const lastName = faker.name.lastName().toLowerCase();
    let token = '';

    before(() => {
        chai.use(chaiHttp);
        chai.use(spies);
    });

    describe('POST /sign-up', () => {
        it('Should return 200 status', async () => {
            const res = await chai.request(app).post('/users/sign-up').set('Content-type', 'application/json')
                .send({
                    firstName,
                    lastName,
                    email,
                    password,
                });
            expect(res.status).to.be.equal(200);
        });

    });

    describe('POST /sign-in', () => {
        it('Should return 200 status ', async () => {
            const res = await chai.request(app).post('/users/sign-in').set('Content-type', 'application/json').send(
                {
                    email,
                    password,
                },
            );
            expect(res.status).to.be.equal(200);
            token = res.body.accessToken;
        });
    });
});
