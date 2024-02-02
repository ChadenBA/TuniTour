const request = require("supertest")
const { Agency } = require("../../models/agencyModel")
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { Admin } = require("../../models/adminModel");

usertoken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTRkNWMxZWQ3MGYxYmU4MDM2ZTBjZiIsImlhdCI6MTY4MzI4MTg0MX0.y3XWifwRfymEPS70atXal_XtBT6paj2eCpby66HYp_c"
token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTJkMmVlMTA3ZjM0MWI2OTJiNDhhYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzI4Mjg2M30.VfabQpfS8yPD3jIpeAuQJlLR7yCPHEsdNlev-og6dmg"
faketoken="123456789"
let server

fakeadmintoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTRkOTk5N2JkMTMyMzQ5Y2JiNzMzNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODMyODI1MjB9.uJ8cbOU56-bb9bNJiVHVGTPb22wuERWy1jG0SBh2St8"
const data ={
    id :"64542046b92cc40ad8e1edc0",
    
  }
  const data1={
    id:"6447af2e2f58f1004773fa88"
  }
  const catid ={
    id:"6453f653a1db7860a620732c"
  }
describe.skip("Agency",()=>{
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
    describe.skip("create agency ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .post(`/api/agencies/admin`)
              .send({ name:12222,
            })
              .set('Authorization', `Bearer ${token}`) 
             
              expect(res.status).toBe(400);
            
          });

          
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .post(`/api/agencies/admin`)
              .set('Authorization', `Bearer ${token}`) 
              .send({ name: 'testttttttt agency ',
              url:"aaaaaaabbbbbbbbbbbaaaaaaa",
              }).attach('test-image.png')
              expect(res.status).toBe(201);
            
          });
    })
    describe("get all activities ",()=>{

        it('should return 201 if category existes ', async () => {
            const res = await request(server)
              .get(`/api/agencies`)
           
              expect(res.status).toBe(201);
            
          });
      
          it('should return 404 if  no category exist ', async () => {
            const res = await request(server)
              .get(`/api/agencies`)
              expect(res.status).toBe(404);
            
          });
    })
   
    describe("update activity ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .put(`/api/agencies/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({name:1222})
              expect(res.status).toBe(400);
            
          });
          it('should return 400 if agency do not exist ', async () => {
            const res = await request(server)
              .put(`/api/agencies/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send()
              expect(res.status).toBe(400);
            
          });
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .put(`/api/agencies/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({name:"jhjhjhjh"})
              expect(res.status).toBe(200);
            
          });
    })
   
    describe('delete agency ', () => {
        let  agency;
        
          beforeAll(async () => {
            // Connect to test database
            await mongoose.connect(process.env.MONGO_URI);
        
            // Create a test place
            agency = await  Agency.create({
              name: 'Test Place',
              url: 'Test description',
              pictures: 
                {
                  url: 'https://example.com/image1.jpg',
                  publicId: 'This is image 1.'
                }
              
            })
          
          });
        
          afterAll(async () => {
            // Remove test place
            await Agency.deleteOne({ _id: agency._id });
        
            // Disconnect from test database
            await mongoose.disconnect();
          });
        
          it('should return a 400 status if the agency is not found', async () => {
            const response = await request(server)
              .delete(`/api/agencies/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(400);
           
          });
        
          it('should return a 200 status and delete the place and its image', async () => {
            const response = await request(server)
              .delete(`/api/agencies/admin/${agency._id}`)
              .set('Authorization', `Bearer ${token}`)
              .send();
        
            expect(response.status).toBe(200);
           
    
          });
        
          it('should return a 403 status if the user is not the admin', async () => {
            const response = await request(server)
              .delete(`/api/agencies/admin/${agency._id}`)
              .set('Authorization', `Bearer ${fakeadmintoken}`)
               expect(response.status).toBe(403);
           
          });
        
         
        
          
        });
 

      describe("update agency picture ",()=>{
        it('should return 400 if its not the admin ', async () => {
            const res = await request(server)
              .put(`/api/agencies/admin/update-image/${data.id}`)
              .set('Authorization', `Bearer ${token}`)
               .send({})
              .expect(400);

        })
        it('should return 400 if agency do not exist ', async () => {
            const res = await request(server)
              .put(`/api/agencies/admin/update-image/${data1.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send()
              expect(res.status).toBe(400);
            
          });




        it('should update the agency image', async () => {
            const imagePath = `${__dirname}/test-image.png`;
            const imageBuffer = fs.readFileSync(imagePath);
            const imageUuid = uuidv4();
            const imageName = `${imageUuid}.png`;
        
            // Save the image to the server
            fs.writeFileSync(`./images/${imageName}`, imageBuffer);
        
            const res = await request(server)
              .put(`/api/agencies/admin/update-image/${data.id}`)
              .set('Authorization', `Bearer ${token}`)
              .attach('image', `./images/${imageName}`)
              .expect(200);
        
            // Check that the agency object returned has the updated picture field
            expect(res.body.picture.url).toBeDefined();
            expect(res.body.picture.publicId).toBeDefined();
        
            // Check that the image has been uploaded to Cloudinary and has a public URL
            expect(res.body.picture.url.startsWith('https://res.cloudinary.com/')).toBe(true);
        
            // Check that the old image has been deleted from Cloudinary
            if (res.body.picture.publicId) {
              const publicId = res.body.picture.publicId;
              const deletedRes = await request(server)
                .delete(`/api/agencies/admin/update-image/${publicId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
              expect(deletedRes.body.result).toEqual('ok');
            }
        })
        })

})