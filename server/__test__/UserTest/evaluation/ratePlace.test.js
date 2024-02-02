const request = require("supertest")
const {User}= require("../../../models/UserModel")
const {Account} = require("../../../models/AccountModel")
const {Rate} = require("../../../models/RatePlaceModel")

let server
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2NjI2NH0.KWEyj7tYUWqxfDxeSY2QqQNXugDcyMDD1C_X6PPLOfE"
var tokenFake = "oiuhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2NjI2NH0.KWEyj7tYUWqxfDxeSY2QqQNXugDcyMDD1C_X6PPLOfE"
var user="643856d376ccae0ff6e3c957"
var data ={
    "placeId":"6446b9bc3a51a228abed5ad9",
    "notice":4
}
var dataDelete ={
    "placeId":"6446b9bc3a51a228abed5ad9",
    "notice":0
}
var dataUpdate ={
    "placeId":"6446f596fc8c86f463c9b47f",
    "activityId":"6446ed72fc8c86f463c9b47b",
    "notice":5
}
describe.skip('Evaluation',()=>{
    //preparer notre test avant chaque test
    //ouvrire le server 
    beforeEach(()=>{
        server= require("../../../server")
    })

    //fermer le server apres chaue test
    afterEach(()=>{
        server.close()
        //User.collection.deleteMany()
        //Account.collection.deleteMany()
    })
    describe.skip("Rate",()=>{
            it("should return a status 400 if Joi validation kicks",async()=>{
                const response= await  request(server)
                    .post("/api/rate/rate-managment")  
                    .send({})
                    .set('Authorization', `Bearer ${token}`)
                                
         
                expect(response.status).toBe(400)  
            })

            it.skip("create new rate ",async()=>{
               var rate= await Rate.findOne({user:user,placeId:data.placeId})
               await Rate.deleteOne({ _id: rate._id })
                const response= await  request(server)
                    .post("/api/rate/rate-managment")  
                    .send(data)
                    .set('Authorization', `Bearer ${token}`)
                                
         
                expect(response.status).toBe(201)  
                
            })

            it.skip("delete rate place",async()=>{
                const response= await  request(server)
                        .post("/api/rate/rate-managment")  
                        .send(dataDelete)
                        .set('Authorization', `Bearer ${token}`)
                                
         
                expect(response.status).toBe(201)  
                expect(response.body).toMatchObject({message:"Rate Has Been Deleted"})

            })

           
        
        
    })
    
})
