const request = require('supertest');
const {VerficationToken} = require("../../models/AdminverificationTokenModel");
const { Admin } = require('../../models/adminModel');
let server 
let admin 
let verificationToken;

const adminemail = {
    email:"chedenbenammar@gmail.com"
}
const fakemail = {
    email:"flenfouleniFakemail@gmail.com",
}

describe.skip('reset password email sent ', () => {
    beforeEach(async()=>{
        server= require("../../server")
     
    })

    //fermer le server apres chaue test
    afterEach(async()=>{
        server.close()
        
    })


    it('should return a 400 status code if email is not provided', async () => {
        const res = await request(server)
        .post("api/admin/password/reset-password-link") 
          .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('"email" is required');
      });

      it('should return a 400 status code if data is invalid', async () => {
        const res = await request(server)
        .post(`api/admin/password/reset-password-link`) 
          .send({email:"chaden"});
          expect(res.status).toBe(400);
      });
   

  it('should send reset password link to email', async () => {
    const response = await request(server)
      .post('api/admin/password/reset-password-link')
      .send({ email:"chedenbenammar@gmail.com"})
      .expect(200);

    expect(response.body.message).toBe('Password reset link sent to your email, please check your email');
   
  });

  it('should return 400 if admin is not found', async () => {
    const response = await request(server)
      .post('api/admin/password/reset-password-link')
      .send({ email: 'nonexistingadmin@example.com' })
      .expect(400);

   
  });
});
