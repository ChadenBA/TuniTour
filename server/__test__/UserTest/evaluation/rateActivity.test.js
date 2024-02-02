const request = require("supertest")
const {User}= require("../../../models/UserModel")
const {Account} = require("../../../models/AccountModel")


let server
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2NjI2NH0.KWEyj7tYUWqxfDxeSY2QqQNXugDcyMDD1C_X6PPLOfE"
var tokenFake = "oiuhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2NjI2NH0.KWEyj7tYUWqxfDxeSY2QqQNXugDcyMDD1C_X6PPLOfE"

var data ={
    "placeId":"6446b9bc3a51a228abed5ad9",
    "activityId":"6446ed72fc8c86f463c9b47b",
    "notice":4
}
var dataDelete ={
    "placeId":"6446b9bc3a51a228abed5ad9",
    "activityId":"6446ed72fc8c86f463c9b47b",
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
    describe("Rate",()=>{
        describe("Add Rate Activity",()=>{
            it("should return a status 400 if Joi validation kicks",async()=>{
                const response= await  request(server)
                                .post("/api/rate/place/mangement-rate-activity")  
                                .send({})
                                .set('Authorization', `Bearer ${token}`)
                                
         
                expect(response.status).toBe(400)  
            })

            it("should return a status 400 if Joi validation kicks",async()=>{
                const response= await  request(server)
                                .post("/api/rate/place/mangement-rate-activity")  
                                .send(data)
                                .set('Authorization', `Bearer ${token}`)
                                
         
                expect(response.status).toBe(201)  
                expect(response.body).toMatchObject(data)

            })

            it("delete rate activity",async()=>{
                const response= await  request(server)
                                .post("/api/rate/place/mangement-rate-activity")  
                                .send(dataDelete)
                                .set('Authorization', `Bearer ${token}`)
                                
         
                expect(response.status).toBe(200)  
                expect(response.body).toMatchObject({message:"Deleted"})

            })

            it("Update rate activity",async()=>{
                const response= await  request(server)
                                .post("/api/rate/place/mangement-rate-activity")  
                                .send(dataUpdate)
                                .set('Authorization', `Bearer ${token}`)
                                
         
                expect(response.status).toBe(201)  

            })

            it("access denied , not allowed",async()=>{
                const response= await  request(server)
                                .post("/api/rate/place/mangement-rate-activity")  
                                .send(dataUpdate)
                                .set('Authorization', `Bearer ${tokenFake}`)
                                
         
                expect(response.status).toBe(401)  

            })

            describe("get rates activities",()=>{
                it("return 201 and all rates ",async()=>{
                    const response= await  request(server)
                    .get("/api/rate/place/")  
                    expect(response.status).toBe(201)
                })
            })

            describe("get rates activities",()=>{
                it("return 201 and all rates ",async()=>{
                    placeId="6446b9bc3a51a228abed5ad9"
                    activityId="6446ed72fc8c86f463c9b47b"
                    const response= await  request(server)
                    .get(`/api/rate/place/${placeId}/${activityId}`)  
                    expect(response.status).toBe(201)
                })
            })

            describe("get rates activities",()=>{
                it("return 201 and all rates ",async()=>{
                    activityId="6446ed72fc8c86f463c9b47b"
                    const response= await  request(server)
                    .get(`/api/rate/${activityId}`)  
                    expect(response.status).toBe(201)
                })
            })
        })
        
    })
    
})
