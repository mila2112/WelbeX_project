import * as faker from "faker";
import chaiHttp from 'chai-http';
import chai from 'chai';
import spies from 'chai-spies';
import bcrypt from 'bcrypt';
import { app }  from '../../src/server';
import { models } from "../../src/db";
const { expect } = chai;

describe('API unhappy tests /blogs', () => {
    const email = faker.internet.email().toLowerCase();
    const firstName = faker.name.firstName().toLowerCase();
    const lastName = faker.name.lastName().toLowerCase();
    const text = faker.lorem.words();
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
         blog = await models.Blogs.create({
             userId:user.id,
             text:"message"
         })
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


    describe('POST blogs/create', () => {
        it('Should return 401 status when invalid token ', async () => {
            const res = await chai.request(app).post('/blogs/create').set('Content-type', 'application/json')
                .set('Authorization', `Bearer "wrongToken"`)
                .send(
                {
                    text
                },
            );
            expect(res.status).to.be.equal(401);
        });
    });

    describe('POST blogs/update', () => {
        it('Should return 401 status when invalid token ', async () => {
            const res = await chai.request(app).put('/blogs/update').set('Content-type', 'application/json')
                .set('Authorization', `Bearer wrongToken`)
                .send(
                    {
                        text:''
                    },
                );
            expect(res.status).to.be.equal(401);
        });

        it('Should return 422 validation error text is empty', async () => {
            const res = await chai.request(app).put('/blogs/update').set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    {
                        text:''
                    },
                );
            expect(res.status).to.be.equal(422);
        });
    });

    describe('DELETE blogs/', () => {
        it('Should return status 400 when this user does not have such a blog', async () => {
            const res = await chai.request(app).delete('/blogs/').set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    {
                        blogId:7
                    },
                );
            expect(res.status).to.be.equal(400);
        });
    });
});
