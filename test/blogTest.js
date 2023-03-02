const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const route = require('../routers/blogRoutes')
const Schema = require('../models/blogSchema')
const { request } = require('chai')

chai.should()
chai.use(chaiHttp)

describe('Blog Like API', () => {
    describe('/POST/api/blog', () => {
        it('It should return blog like details', (done) => {
            const like = {
                blogLike: true
            }
            chai
                .request(server)
                .post('/blog/like/63f73ebc3841d6a6d77775ac')
                .send(like)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('you just like this blog')
                    res.body.should.have.property('data')
                    done();
                })
        })

        it('It should return blog dislike details', (done) => {
            const like = {
                blogLike: false
            }
            chai
                .request(server)
                .post('/blog/like/63f73ebc3841d6a6d77775ac')
                .send(like)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('you just dislike this blog')
                    res.body.should.have.property('data')
                    done();
                })
        })
    })
})

describe("List All Blog API", () => {
    describe("GET/api/blogs", () => {
        it("It should return all blogs list:", (done) => {
            chai
                .request(server)
                .get("/blog/list")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a("object")
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("data")
                    done()
                })
        });
    });
});

describe('Edit blog Api', () => {
    describe("PATCH/api/blogs", () => {
        it('it should return edited blog', (done) => {
            const data = {
                title: "javascript",
                description: "it run on V8 engine"
            }
            const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc2OTQ0NzYsImV4cCI6MTY3ODM4NTY3Nn0.5yOd6vt8Eu15fjUeb5O3FctsO8I2R_AVpci0O5_6cm0"
            chai
                .request(server)
                .patch('/blog/update/63f889d1033c192757f111ee')
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("message").eq("blog updated successfully")
                    done();
                })
        })
    })
})

describe('delete blog API', () => {
    describe('DELETE/api/blogs', () => {
        it('it should return delete blog', (done) => {
            const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc2OTQ0NzYsImV4cCI6MTY3ODM4NTY3Nn0.5yOd6vt8Eu15fjUeb5O3FctsO8I2R_AVpci0O5_6cm0"
            chai
                .request(server)
                .delete('/blog/delete/63f897ecda5275b463312f1c')
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("message").eq("blog deleted successfully")
                    done();
                })
        })
    })
})

describe('add blog API', () => {
    describe('POST/api/blogs', () => {
        it('it should return add blog', (done) => {
            const blog = {
                title: "manchuriam",
                description: "dine into my kitchen"
            }
            const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc2OTQ0NzYsImV4cCI6MTY3ODM4NTY3Nn0.5yOd6vt8Eu15fjUeb5O3FctsO8I2R_AVpci0O5_6cm0"
            chai
                .request(server)
                .post('/blog/add/63ecd9ba857d572afee59e0c')
                .set('Content-Type', "appliaction/x-www-form-urlencoded")
                .set("Authorization", `Bearer ${token}`)
                .field(blog)
                .attach("uploadImage", "/Users/91939/Downloads/holkarlogo.png",
                    "holkarlogo.png"
                )
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("message").eq("blog added successfully")
                    done();
                })
        })
    })
})

describe('search blog API', () => {
    describe('POST/api/blogs', () => {
        it('it should return search blog details', (done) => {
            const data = {
                title: "java"
            }
            chai
                .request(server)
                .post('/blog/search')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('data')
                    done();
                })
        })
    })
})

describe('User blogg API', () => {
    describe('POST/api/blogs', () => {
        it('it should return blog of user detail', (done) => {
            const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc2OTQ0NzYsImV4cCI6MTY3ODM4NTY3Nn0.5yOd6vt8Eu15fjUeb5O3FctsO8I2R_AVpci0O5_6cm0"
            chai
                .request(server)
                .post('/blog/myblog/63ecd9ba857d572afee59e0c')
                .set("Authorization", `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('data')
                    done();
                })
        })
    })
})

describe('detail blog API', () => {
    describe('POST/api/blogs', () => {
        it('it should return detailed blog', (done) => {
            chai
                .request(server)
                .get('/blog/details/63fedb492d48f4e4464c58ee')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('blog').property('userId').property('FullName')
                    done();
                })
        })
    })
})
