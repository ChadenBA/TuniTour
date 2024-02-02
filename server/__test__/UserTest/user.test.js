const request = require("supertest")
const path = require('path');


let server
var id="643856d376ccae0ff6e3c957"
var idFake="643856d376ccae0ff6e3c941"

var userData={
    "_id": "643856d376ccae0ff6e3c957",
    "firstName": "flen",
    "lastName": "fouleni",
    "age": 21,
    "email": "flenfouleno@gmail.com",
    "nationality": "Tunisian",
    "adress": "Jemmal",
    "phone": "24772370",
    "photoProfile": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
        "publicId": null
    },
    "visitedList": [],
    "bucketList": [],
    "createdAt": "2023-04-13T19:24:03.206Z",
    "updatedAt": "2023-04-13T19:24:03.206Z",
    "__v": 0
}
var  lastName="ben charrada"
var firstName ="najeh"
   



var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2NjI2NH0.KWEyj7tYUWqxfDxeSY2QqQNXugDcyMDD1C_X6PPLOfE"
var fakeToken = "abchbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2NjI2NH0.KWEyj7tYUWqxfDxeSY2QqQNXugDcyMDD1C_X6PPLOfE"


var placeId="4446b9bc3a51a228abed5ad9"


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
    describe("User Profile ",()=>{
        it("should return a status 200 if user exist and return user ",async()=>{
            const response= await  request(server)
                            .get(`/api/tunitour/users/profile/${id}`)  
                            .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
            // expect(response.body).toMatchObject(userData)

        })

        it("should return a status 404 if user does not exist",async()=>{
            const response= await  request(server)
                            .get(`/api/tunitour/users/profile/${idFake}`)  
                            .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)  
            expect(response.body).toMatchObject({message:"User Not Found"})

        })
        it("should return all user with status 200",async()=>{
            const response= await  request(server)
                            .get(`/api/tunitour/users/`)  
                            

            expect(response.status).toBe(200)  

        })
        it.skip("should return  status 404 if no user in data base ",async()=>{
            const response= await  request(server)
                            .get(`/api/tunitour/users/`)  
                            

            expect(response.status).toBe(404)  

        })

        it("should return a status 400 if Joi validation kicks ",async()=>{
            const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}`)  
                .send({age:"hello"})
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(400)  

        })

        it("should return a status 200 and update user ",async()=>{
            const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}`)  
                .send({firstName,lastName})
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  

        })


        it("should return a status 200 and return bucket list of user ",async()=>{
            const response= await  request(server)
                .get(`/api/tunitour/users/profile/${id}/bucket-list`)  
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  

        })
        it("should return a status 404 if user not found  ",async()=>{
            const response= await  request(server)
                .get(`/api/tunitour/users/profile/${idFake}/bucket-list`)  
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)  
            expect(response.body).toMatchObject({message:"User Not Found"})


        })
        it("should return a status 404  ",async()=>{
                const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}/bucket-list/add`)  
                .send({id:"4446b9bc3a51a228abed5ad9"}) 
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)  
        })
        it("should return a status 200 and add place to bucket list user ",async()=>{
                const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}/bucket-list/add`)  
                .send({id:"6446f596fc8c86f463c9b47f"}) 
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
        })
        it("should return a status 200 and add place to bucket list user ",async()=>{
                const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}/bucket-list/add`)  
                .send({id:"6446b9bc3a51a228abed5ad9"}) 
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
        })
        it("should return a status 200 and add place to bucket list user ",async()=>{
                const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}/bucket-list/delete`)  
                .send({id:"6446f596fc8c86f463c9b47f"}) 
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
        })

        it("should return a status 200 and add place to visited-list user ",async()=>{
                const response= await  request(server)
                .get(`/api/tunitour/users/profile/${id}/visited-list`)  
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
        })
        it("should return a status 200 and add place to visited-list user ",async()=>{
                const response= await  request(server)
                .get(`/api/tunitour/users/profile/${idFake}/visited-list`)  
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)  
        })

        it("should return a status 404  ",async()=>{
                const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}/visited-list/add`)  
                .send({id:"4446b9bc3a51a228abed5ad9"}) 
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)  
        })
        it("should return a status 200 and add place to bucket list user ",async()=>{
                const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}/visited-list/add`)  
                .send({id:"6446f596fc8c86f463c9b47f"}) 
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
        })
        it("should return a status 200 and add place to bucket list user ",async()=>{
                const response= await  request(server)
                .put(`/api/tunitour/users/profile/${id}/visited-list/delete`)  
                .send({id:"6446f596fc8c86f463c9b47f"}) 
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
        })



        it.skip("should return a status 200 and update user ",async()=>{
            const response= await  request(server)
                .post(`/api/tunitour/users /profile/profile-photo`)  
                .set('Authorization', `Bearer ${token}`)

                expect(response.status).toBe(400);
                expect(response.body.message).toBe('No File Provided');

        })

    })
})



