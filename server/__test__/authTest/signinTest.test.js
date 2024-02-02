const request = require("supertest")
const {User}= require("../../models/UserModel")
const {Account} = require("../../models/AccountModel")


let server
const userTest = {
    firstName:"flen ",
    lastName:"fouleni", 
    age:21,
    email:"flenfouleniSingin@gmail.com",
    nationality:"Tunisian",
    password:"flenfouleni123*",
    phone:"24772370",
    adress:"Jemmal"
}


const userSigninFake = {
    email:"fakecompte@gmail.com",
    password:"flenfouleni123*",
}

const userTestSinginFakePass = {
    email:"flenfouleno@gmail.com",
    password:"fakePassword",
}
const userTestSingin = {
    email:"flenfouleno@gmail.com",
    password:"flenfouleni123*",
}

describe.skip('user',()=>{
    //preparer notre test avant chaque test
    //ouvrire le server 
    beforeEach(()=>{
        server= require("../../server")
    })

    //fermer le server apres chaue test
    afterEach(()=>{
        server.close()
        //User.collection.deleteMany()
        //Account.collection.deleteMany()
    })
    
    //describe for signin
    describe("Post /api/tunitour/auth/signin",()=>{

        it("should return a status 400 if Joi validation kicks",async()=>{
            const response= await  request(server)
                            .post("/api/tunitour/auth/signin")  
                            .send({})
                            .set({Accept :"Application/json"})
     
            expect(response.status).toBe(400)  
        })

        it("should return a status 404 if user not is exist",async()=>{

            const response = await request(server)
                        .post('/api/tunitour/auth/signin')
                        .send(userSigninFake)
                        .set({Accept :"Application/json"})
                expect(response.status).toBe(400) 
                expect(response.body).toMatchObject({message:"Invalid Email Or Password"})
        }) 

        it("should return a status 400 if user is exist and password invalid",async()=>{

            const response = await request(server)
                        .post('/api/tunitour/auth/signin')
                        .send(userTestSinginFakePass)
                        .set({Accept :"Application/json"})
                expect(response.status).toBe(400) 
                expect(response.body).toMatchObject({message:"Invalid Password"})
        }) 


        it("should return a status 201 if user is exist and password valid , create new token and send to user",async()=>{
            
            const response = await request(server)
                        .post('/api/tunitour/auth/signin')
                        .send(userTestSingin)
                        .set({Accept :"Application/json"})
                expect(response.status).toBe(201) 
            }) 
    })
})
