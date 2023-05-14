import * as faker from "faker";
import chaiHttp from 'chai-http';
import chai from 'chai';
import spies from 'chai-spies';
import bcrypt from 'bcrypt';
import { app }  from '../../src/server';
import { models } from "../../src/db";
const { expect } = chai;

describe('API tests /blogs', () => {
    const firstName = faker.name.firstName().toLowerCase();
    const lastName = faker.name.lastName().toLowerCase();
    const email = faker.internet.email().toLowerCase();
    const text = faker.lorem.words();
    const updatedText = faker.lorem.words();
    let token = '';
    let user;
    let blog;
    before(async() => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("1234", salt);
         user = await models.Users.create({
             firstName,
             lastName,
             email,
             password:hashedPassword
        });
        chai.use(chaiHttp);
        chai.use(spies);
    });

    describe('POST users/sign-in', () => {
        it('Should return 200 status', async () => {
            const res = await chai.request(app).post('/users/sign-in').set('Content-type', 'application/json')
                .send({
                    email:user.email,
                    password:"1234",
                });
            expect(res.status).to.be.equal(200);
            token = res.body.accessToken;
        });
    });


    describe('POST blogs/list', () => {
        it('Should return 200 status', async () => {
            const res = await chai.request(app).get('/blogs/list').set('Content-type', 'application/json');
            expect(res.status).to.be.equal(200);
            expect(res).to.be.an('object');
            expect(res.body).to.have.property('rows').that.is.an('array');
        });
    });

    describe('POST blogs/create', () => {
        it('Should return 200 status ', async () => {
            const res = await chai.request(app).post('/blogs/create').set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                {
                    text
                },
            );
            console.log(res);
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.property('blog').that.is.an('object');
            blog = res.body.blog;
        });
    });

    describe('POST blogs/update', () => {
        it('Should return 200 status ', async () => {
            const res = await chai.request(app).put('/blogs/update').set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    {
                        text:updatedText
                    },
                );
            expect(res.status).to.be.equal(200);
        });
    });

    describe('DELETE blogs/', () => {
        it('Should return 200 status ', async () => {
            const res = await chai.request(app).delete('/blogs/').set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    {
                        blogId:blog.id
                    },
                );
            expect(res.status).to.be.equal(200);
        });
    });
});
