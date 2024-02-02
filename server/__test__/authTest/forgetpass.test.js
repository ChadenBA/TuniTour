const request = require("supertest")


let server
const userTest = {
    email:"bencharradanajeh@gmail.com",
}
const fakemail = {
    email:"flenfouleniFakemail@gmail.com",
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
    describe("Post /api/tunitour/auth/forgetpassword",()=>{
        it("should return a status 400 if Joi validation kicks",async()=>{
            const response= await  request(server)
                            .post("/api/tunitour/auth/forgetpassword")  
                            .send({})
                            .set({Accept :"Application/json"})
     
            expect(response.status).toBe(400)  
        })

        it("should return a status 404 if user not is exist",async()=>{

            const response = await request(server)
                        .post('/api/tunitour/auth/forgetpassword')
                        .send(fakemail)
                        .set({Accept :"Application/json"})
                expect(response.status).toBe(400) 
                expect(response.body).toMatchObject({message:"Invalid Email"})
        }) 

        it("should send the code to email and return a status 201 ",async()=>{
            const response= await  request(server)
                        .post("/api/tunitour/auth/forgetpassword")  
                        .send(userTest)
                        .set({Accept :"Application/json"})
     
            expect(response.status).toBe(201)  
            expect(response.body).toMatchObject({message:"Password Reset Link Has Been Sent To Your Email "})
        })
        
    })
})