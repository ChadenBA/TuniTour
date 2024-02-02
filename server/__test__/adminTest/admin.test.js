const request = require('supertest');
const { Admin } = require('../../models/adminModel');


const fs = require('fs');


let server 
token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTJkMmVlMTA3ZjM0MWI2OTJiNDhhYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzI4Mjg2M30.VfabQpfS8yPD3jIpeAuQJlLR7yCPHEsdNlev-og6dmg"
id="6452d2ee107f341b692b48ac"
idFake="ooioio"
describe.skip("get Admin ",()=>{

    beforeEach(()=>{
        server= require("../../server")
    })

    //fermer le server apres chaue test
    afterEach(()=>{
        server.close()
        
    })

    it("should return a status 200 if admin  ",async()=>{
        const response= await  request(server)
                        .get(`/api/admin/adminProfile`)  
                        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)  
        

    })
        it("should return a status 200 if admin and return admin ",async()=>{
            const response= await  request(server)
                            .get(`/api/admin/adminProfile/${id}`)  
                            .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  
         

        })

        it("should return a status 404 if not admin",async()=>{
            const response= await  request(server)
                            .get(`/api/admin/adminProfile/${idFake}`)  
                             expect(response.status).toBe(400)  
            
        });
        it("should return a status 400 if Joi validation kicks ",async()=>{
            const response= await  request(server)
                .put(`/api/admin/adminProfile/${id}`)  
                .send({adminname:12})
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(400)  

        })

        it("should return a status 200 and update admin profile  ",async()=>{
            const response= await  request(server)
                .put(`/api/admin/adminProfile/${id}`)  
                .send({adminname:"hdjhdhFJQ",lastname:"NDJENDJZNJN"})
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)  

        })
        describe('Admin Profile Pic Upload', () => {
            it('should upload a profile picture', async () => {
              // create a mock file
              const filePath = "../../images/facilité.png";
              const fileContent = fs.readFileSync(filePath);
              const file = {
                fieldname: 'profilePicture',
                originalname: 'mock_image.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                buffer: fileContent
              };
          
              // make a request to the server
              const res = await request(server)
                .post('/api/admin/adminProfile/profile-photo-upload')
                .set('Content-Type', 'multipart/form-data')
                .set('Authorization', `Bearer ${token}`)
                .attach('profilePicture', file.buffer, file.originalname);
          
              // assertions
              expect(res.status).toBe(200);
              expect(res.body.message).toBe('your profile photo uploaded successfully');
              expect(res.body.profilepicture).toHaveProperty('url');
              expect(res.body.profilepicture).toHaveProperty('publicId');
              expect(res.body.profilepicture.url).toContain('https://res.cloudinary.com/');
              expect(res.body.profilepicture.publicId).toMatch(/^admin\/\w{24}$/);
          
              // cleanup
              fs.unlinkSync(filePath);
            });
          
            it('should return an error if no file is provided', async () => {
              // make a request to the server
              const res = await request(server)
                .post('/api/admin/adminProfile/profile-photo-upload')
                .set('Content-Type', 'multipart/form-data')
                .set('Authorization', 'Bearer <your-admin-token>');
          
              // assertions
              expect(res.status).toBe(400);
              expect(res.body.message).toBe('no file provided');
            });
          });
          

});



