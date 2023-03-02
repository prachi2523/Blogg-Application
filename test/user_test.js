const server = require('../index')
var chai = require('chai')
const chaiHttp = require('chai-http')
const util = require('../models/userModelSchema')
const routes = require('../routers/userRoutes')
const { it } = require('mocha')
var randomEmail = require('random-email');

chai.should()
chai.use(chaiHttp)
describe('User signUp API', () => {
    describe('/POST/api/user', () => {
        it('it should return SIGNUP user detail', (done) => {
            let email=randomEmail({ domain: 'gmail.com' })
            const data = {
                FullName: "prachi",
                email: email,
                phone: 8399559689,
                address: "indore",
                password: "Prachi@22"
            }
            chai
                .request(server)
                .post('/user/signUp')
                .set("Content-Type", "application/x-www-form-urlencoded")
                .field(data)
                .attach("profilePic", "/Users/91939/Downloads/holkarlogo.png",
                    "holkarlogo.png")
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('User created successfully')
                    done();
                })
        })
        it('it should return already register detail', (done) => {
            const data = {
                FullName: "prachi",
                email: "test6@gmail.com",
                phone: 8399559689,
                address: "indore",
                password: "Prachi@22"
            }
            chai
                .request(server)
                .post('/user/signUp')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409)
                    res.body.should.have.property('success').eq('failure')
                    res.body.should.have.property('message').eq('User with this email is already exist')
                    done();
                })
        })
    })
})

describe('User login API', () => {
    describe('/POST/api/user', () => {
        it("it should return LOGIN user detail", (done) => {
            const data = {
                email: "monstercookkie2@gmail.com",
                password: "Cookkie@1"
            };
            chai
                .request(server)
                .post('/user/signin')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a('object')
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('login Successful')
                    res.body.should.have.property('token')
                    done();
                })
        })
        it('IT Should Return email or password Error Message:', (done) => {
            const data = {
                email: "pr@gmail.com",
                password: "Soo@11"
            };
            chai
                .request(server)
                .post("/user/signin")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property('success').eq('failure')
                    res.body.should.have.property('message').eq('Password does not Match')
                })
            done();
        })
    })
})

describe('User Email_for_resetpassword API', () => {
    describe('POST/api/user', () => {
        it('it should return email sent detail', (done) => {
            const data = {
                email: "monstercookkie2@gmail.com"
            }
            chai
                .request(server)
                .post("/user/emailforpasswordreset")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('email sent successfulyy')
                })
            done();
        })
        it('it should return email does not exit error detail', (done) => {
            const data = {
                email: "zrachiverma2521@gmail.com"
            }
            chai
                .request(server)
                .post("/user/emailforpasswordreset")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.have.property('success').eq('failure')
                    res.body.should.have.property('message').eq('this email user is not found')
                })
            done();
        })
    })
})

describe('User reset password API', () => {
    describe('POST/api/user', () => {
        it('It should return reset password detail', (done) => {
            const data = {
                newpassword: "Cookkie@1",
                confirmPass: "Cookkie@1"
            }
            chai
                .request(server)
                .post('/user/resetUserpassword/640072de640b0cc4a1bfc7e4/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDAwNzJkZTY0MGIwY2M0YTFiZmM3ZTQiLCJpYXQiOjE2Nzc3NTEwNjEsImV4cCI6MTY3ODUyODY2MX0.U34hKHoJD07oC_-0i9ZmK5gVtitdPVc5amVsz3vgitU')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('Password reset successfully')
                })
            done();
        })
    })
})
