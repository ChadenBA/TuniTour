const request = require('supertest');
const { Admin, validateLoginAdmin } = require('../../models/adminModel');
const { VerficationToken } = require('../../models/AdminverificationTokenModel');
const crypto = require('crypto');


let server 
// Create a new admin user for testing
const admin = new Admin({
  adminname: 'testadmin',
  email: 'chedenbenammar@gmail.com',
  password: 'chadenbenammar',
  isAdmin: true,
});


const data ={
    id :"643c8e482a5e32253391cd60",
    
  }
 

 
describe('admin login ',()=>{
    //preparer notre test avant chaque test
    //ouvrire le server 
    // Before each test, clear the Place collection in the databa
    beforeEach(async()=>{
        server= require("../../server")
       // await Place.deleteMany();
    })

    //fermer le server apres chaue test
    afterEach(()=>{
        server.close()
      
    })
    it("should return a status 400 if Joi validation kicks",async()=>{
        const response= await  request(server)
                        .post("/api/admin/auth/adminLogin")  
                        .send({})
                        .set({Accept :"Application/json"})
 
        expect(response.status).toBe(400)  
    })
    it('should return 400 if email is invalid', async () => {
      const res = await request(server)
        .post('/api/admin/auth/adminLogin')
        .send({ email: 'invalidemail@gmail.com', password: 'chadenbenammar' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('invalide email');
    });

    it('should return 400 if password is invalid', async () => {
      const res = await request(server)
        .post('/api/admin/auth/adminLogin')
        .send({ email: 'chedenbenammar@gmail.com', password: 'invalidpassword' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('invalide password');
    });

    it('should return 200 and a token if credentials are valid', async () => {
      const res = await request(server)
        .post('/api/admin/auth/adminLogin')
        .send({ email: 'chedenbenammar@gmail.com', password: 'chadenbenammar' });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeTruthy();
    });
  });

