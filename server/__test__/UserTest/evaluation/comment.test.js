const request = require("supertest")
const {User}= require("../../../models/UserModel")
const {Account} = require("../../../models/AccountModel")


let server
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2MjQ3MX0.VyuLRJkbObR7wBc_Sos4lSrsSOVpERxAXB_5A_--UfY"
var fakeToken ="ertftGcvviJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2MjQ3MX0.VyuLRJkbObR7wBc_Sos4lSrsSOVpERxAXB_5A_--UfY"
let text = "comment test"
let placeId= "6446b9bc3a51a228abed5ad9"
let fakeCommentId ="6446ca44981bdaab2d66e8da"
let commentId="6446bd437aa78441a03b4cd0"
let  commentUpdated ="6446cad0de4a95ed38c19d00"
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
    describe("Comments",()=>{
        describe("Add Comments",()=>{
            it("should return a status 400 if Joi validation kicks",async()=>{
                const response= await  request(server)
                                .post("/api/comment/add-comment")  
                                .send({})
                                .set('Authorization', `Bearer ${token}`)
         
                expect(response.status).toBe(400)  
            })
            it("should return a status 201",async()=>{
                const response= await  request(server)
                                .post("/api/comment/add-comment")  
                                .send({text,placeId})
                                .set('Authorization', `Bearer ${token}`)
         
                expect(response.status).toBe(201) 
                
            })
        })
        describe("get Comments",()=>{
            it("return 201 ",async()=>{
                const response= await  request(server)
                .get("/api/comment/")  
                expect(response.status).toBe(201)
            })
        })
        describe("Delete comment",()=>{
            it("should return a status 404 if comment doesn't exist",async()=>{
                const response= await  request(server)
                    .delete(`/api/comment/${fakeCommentId}`)  
                    .set('Authorization', `Bearer ${token}`)
         
                expect(response.status).toBe(404)  
   
            })
            it("should return a status 201 if user a le droit de delete or not",async()=>{
                const response= await  request(server)
                    .delete(`/api/comment/${commentId}`)  
                    .set('Authorization', `Bearer ${fakeToken}`)

                    expect(response.status).toBe(401) 
                    expect(response.body).toMatchObject({message:"invalidToken"})
            }) 
        })

        describe("Update comment",()=>{
            it("should return a status 400 if Joi validation kicks",async()=>{
                const response= await  request(server)
                                .put(`/api/comment/${commentId}`)  
                                .send({})
                                .set('Authorization', `Bearer ${token}`)
         
                expect(response.status).toBe(400)  
            }) 
            it("should return a status 404 if comment doesn't exist",async()=>{
                const response= await  request(server)
                    .put(`/api/comment/${fakeCommentId}`)
                    .send({text:"helloo"}) 
                    .set('Authorization', `Bearer ${token}`)
         
                expect(response.status).toBe(404)  
                expect(response.body).toMatchObject({message:"Comment Not Found"})
            })
            
            it("should return a status 404 if user want to change a comment de another persone doesn't exist",async()=>{
                const response= await  request(server)
                    .put(`/api/comment/${commentId}`)
                    .send({text:"helloo"}) 
                    .set('Authorization', `Bearer ${fakeToken}`)
         
                expect(response.status).toBe(401) 
                expect(response.body).toMatchObject({message:"invalidToken"})
 
            })
            it("should return a status 201 and update comment",async()=>{
                const response= await  request(server)
                    .put(`/api/comment/${commentUpdated}`)
                    .send({text:"helloo"}) 
                    .set('Authorization', `Bearer ${token}`)
         
                expect(response.status).toBe(201)  

            })
        })
        
    })
    
})
