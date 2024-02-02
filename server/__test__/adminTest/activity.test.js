const request = require("supertest")
const { Activity } = require("../../models/activityModel")
const mongoose = require('mongoose');
token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTJkMmVlMTA3ZjM0MWI2OTJiNDhhYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzI4Mjg2M30.VfabQpfS8yPD3jIpeAuQJlLR7yCPHEsdNlev-og6dmg"
faketoken="123456789"
let server

const data ={
    id :"64537ebbc8622fc1cf5f9e63",
    
  }
  const data1={
    id:"6452d2ee107f341b692b48ac"
  }
  const catid ={
    id:"6453f653a1db7860a620732c"
  }
describe.skip("Activity",()=>{
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
    describe("create activity ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .post(`/api/activities/admin`)
              .set('Authorization', `Bearer ${token}`) 
              .send({})
              expect(res.status).toBe(400);
            
          });
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .post(`/api/activities/admin`)
              .set('Authorization', `Bearer ${token}`) 
              .send({ name: 'testttttttt activity ',
              description:"aaaaaaabbbbbbbbbbbaaaaaaa",
              picture:{
                  url:"https://res.cloudinary.com/dxzlm2qqz/image/upload/v1683193530/bfvvturae0xq0iv4qugs.png",
                  publicId:"bfvvturae0xq0iv4qugs"
              }})
              expect(res.status).toBe(201);
            
          });
    })
    describe("get all activities ",()=>{

        it('should return 201 if category existes ', async () => {
            const res = await request(server)
              .get(`/api/activities`)
              expect(res.status).toBe(201);
            
          });
      
          it('should return 404 if  no category exist ', async () => {
            const res = await request(server)
              .get(`/api/activities`)
              expect(res.status).toBe(404);
            
          });
    })
    describe("get single ",()=>{

        it('should return 201 if aactivity existes ', async () => {
            const res = await request(server)
              .get(`/api/activities/${data.id}`)
              expect(res.status).toBe(200);
            
          });
      
          it('should return 404 if  activity dosent  exist ', async () => {
            const res = await request(server)
              .get(`/api/activities/${data1.id}`)
               expect(res.status).toBe(400);
            
          });
    })
    describe("update activity ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .put(`/api/activities/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({name:1222})
              expect(res.status).toBe(400);
            
          });
          it('should return 400 if category do not exist ', async () => {
            const res = await request(server)
              .put(`/api/activities/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send()
              expect(res.status).toBe(400);
            
          });
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .put(`/api/activities/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({name:"jhjhjhjh"})
              expect(res.status).toBe(200);
            
          });
    })
   
    describe('delete activity  ', () => {
      let  cat ;
      
        beforeAll(async () => {
          // Connect to test database
          await mongoose.connect(process.env.MONGO_URI);
      
          // Create a test place
          activity = await  Activity.create({
            name: 'test1111 activity ',
            description:"aaaaaaaaaaaaaa",
            picture:{
                url:"https://res.cloudinary.com/dxzlm2qqz/image/upload/v1683193530/bfvvturae0xq0iv4qugs.png",
                publicId:"bfvvturae0xq0iv4qugs"
            }
          
          });
      
        });
      
        afterAll(async () => {
          // Remove test place
         // await Category.deleteOne({ _id: cat._id });
      
          // Disconnect from test database
          await mongoose.disconnect();
        });
      
        it('should return a 400 status if the agency is not found', async () => {
            const response = await request(server)
              .delete(`/api/activities/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(400);
           
          });
        
          it('should return a 200 status and delete the place and its image', async () => {
            const response = await request(server)
              .delete(`/api/activities/admin/${activity._id}`)
              .set('Authorization', `Bearer ${token}`)
              .send();
        
            expect(response.status).toBe(200);
           
    
          });
        
          it('should return a 403 status if the user is not the admin', async () => {
            const response = await request(server)
              .delete(`/api/activities/admin/${activity._id}`)
              .set('Authorization', `Bearer ${faketoken}`)
               expect(response.status).toBe(403);
    
      });

      
       
      });

      describe("update activity picture ",()=>{
        it('should return 400 if the data is invalid ', async () => {
            const res = await request(server)
              .put(`/api/activities/admin/update-image/${data.id}`)
              .set('Authorization', `Bearer ${token}`)
            .send({})
              .expect(400);

        })
        it('should return 400 if activity do not exist ', async () => {
            const res = await request(server)
              .put(`/api/activities/admin/update-image/${data1.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send()
              expect(res.status).toBe(400);
            
          });
        })
    

})