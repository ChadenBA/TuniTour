const request = require("supertest")
const {User}= require("../../models/UserModel")
const {Account} = require("../../models/AccountModel")


let server
const userTest = {
    firstName:"flen ",
    lastName:"fouleni", 
    age:21,
    email:"bencharradanajeh@gmail.com",
    nationality:"Tunisian",
    password:"flenfouleni123*",
    phone:"24772370",
    adress:"Jemmal"
}

const adminTest = {
    firstName:"flen ",
    lastName:"fouleni", 
    age:21,
    email:"adminemail@gmail.com",
    nationality:"Tunisian",
    password:"flenfouleni123*",
    phone:"24772370",
    adress:"Jemmal"
}



describe.skipw('user',()=>{
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
    
    //describe for signup
    describe("Post /api/tunitour/auth/signup ",()=>{

        it("should return a status 400 if Joi validation kicks",async()=>{
            const response= await  request(server)
                            .post("/api/tunitour/auth/signup")  
                            .send({})
                            .set({Accept :"Application/json"})
     
            expect(response.status).toBe(400) 
            

        })

        it("should return a status 400 if user is exist",async()=>{
            
            const response = await request(server)
                .post('/api/tunitour/auth/signup')
                .send(userTest)
                .set({Accept :"Application/json"})
            expect(response.status).toBe(400) 
            expect(response.body).toMatchObject({message:"User Already Exist"})
            // Supprimer l'utilisateur nouvellement créé
            
        }) 

        it("should return a status 400 if user is admin",async()=>{
            const response= await  request(server)
                   .post("/api/tunitour/auth/signup")  
                   .send(adminTest)
                   .set({Accept :"Application/json"})
            
               expect(response.status).toBe(400) 
               expect(response.body).toMatchObject({message:"unable to create an account with this email"})
        })
      
        it("should create a user and return a status 201",async()=>{
            await User.deleteOne({ email: userTest.email });
            await Account.deleteOne({ email: userTest.email });
            const response= await  request(server)
                .post("/api/tunitour/auth/signup")  
                .send(userTest)
                .set({Accept :"Application/json"})
         
            expect(response.status).toBe(201) 
            expect(response.body).toMatchObject({message:"Success Sign Up , You Can Log In Now "})
        })
         
    })


})
