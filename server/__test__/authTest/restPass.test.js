const request = require("supertest")


let server
const data = {
    id :"64389faf8cf6bacb93432378",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbmNoYXJyYWRhbmFqZWhAZ21haWwuY29tIiwiaWQiOiI2NDM4OWZhZjhjZjZiYWNiOTM0MzIzNzgiLCJpYXQiOjE2ODE0MzI1ODAsImV4cCI6MTY4MTQzNTI4MH0.BmvND-w5hK021aQ7OHzGxw371yZf3JJBbZWGD4CJbko"
}
const newPass = "passwordnew"
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
    describe("Post /api/tunitour/auth/resetpassword",()=>{

        it("should return a status 400 if Joi validation kicks",async()=>{
            const response= await  request(server)
                        .put(`/api/tunitour/auth/resetpassword/${data.id}/${data.token}`)  
                        .send({})
                        .set({Accept :"Application/json"})
     
            expect(response.status).toBe(400)  
        })


        it("should return a status 400 if Joi validation kicks",async()=>{
            const response= await  request(server)
                        .put(`/api/tunitour/auth/resetpassword/${data.id}/${data.token}`)  
                        .send({newPass})
                        .set({Accept :"Application/json"})
     
            expect(response.status).toBe(400)  
        })
  
    })
})
