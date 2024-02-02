const request = require("supertest")
const { Cities } = require("../../models/cityModel")
const mongoose = require('mongoose');
token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTJkMmVlMTA3ZjM0MWI2OTJiNDhhYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzI4Mjg2M30.VfabQpfS8yPD3jIpeAuQJlLR7yCPHEsdNlev-og6dmg"
faketoken="123456789"
let server

const data ={
    id :"64537ea0c8622fc1cf5f8b4f",
    
  }
  const data1={
    id:"6452d2ee107f341b692b48ac"
  }
  const catid ={
    id:"6453f653a1db7860a620732c"
  }
describe.skip("city",()=>{
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
    describe("create cities ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .post(`/api/cities/admin`)
              .set('Authorization', `Bearer ${token}`) 
              .send({name:12})
              expect(res.status).toBe(400);
            
          });
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .post(`/api/cities/admin`)
              .set('Authorization', `Bearer ${token}`) 
              .send({ name: 'testttttttt activity ',
              description:"aaaaaaabbbbbbbbbbbaaaaaaa",
              }).attach('test-image.png')
              expect(res.status).toBe(201);
            
          });
    })
    describe("get all cities ",()=>{

        it('should return 200 if category existes ', async () => {
            const res = await request(server)
              .get(`/api/cities`)
              expect(res.status).toBe(200);
            
          });
      
          it('should return 404 if  no category exist ', async () => {
            const res = await request(server)
              .get(`/api/cities`)
              expect(res.status).toBe(404);
            
          });
    })
    describe("get single city ",()=>{

        it('should return 200 if cities existes ', async () => {
            const res = await request(server)
              .get(`/api/cities/${data.id}`)
              expect(res.status).toBe(200);
            
          });
      
          it('should return 404 if  cities dosent  exist ', async () => {
            const res = await request(server)
              .get(`/api/cities/${data1.id}`)
               expect(res.status).toBe(400);
            
          });
    })
    describe("update city ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .put(`/api/cities/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({name:1222})
              expect(res.status).toBe(400);
            
          });
          it('should return 400 if ciy do not exist ', async () => {
            const res = await request(server)
              .put(`/api/cities/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send()
              expect(res.status).toBe(400);
            
          });
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .put(`/api/cities/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({name:"helolo"})
              expect(res.status).toBe(200);
            
          });
    })
   
    describe('delete city  ', () => {
      let  cat ;
      
        beforeAll(async () => {
          // Connect to test database
          await mongoose.connect(process.env.MONGO_URI);
      
          // Create a test place
            city = await  Cities.create({
            name: 'test1111 ciyu ',
            description:"aaaaaaaaaaaaaa",
            picture:{
                url:"https://res.cloudinary.com/dxzlm2qqz/image/upload/v1683193530/bfvvturae0xq0iv4qugs.png",
                publicId:"bfvvturae0xq0iv4qugs"
            }
          
          });
      
        });
      
        afterAll(async () => {
    
      
          // Disconnect from test database
          await mongoose.disconnect();
        });
      
        it('should return a 400 status if the city is not found', async () => {
            const response = await request(server)
              .delete(`/api/cities/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(400);
           
          });
        
          it('should return a 200 status and delete the city and its image', async () => {
            const response = await request(server)
              .delete(`/api/cities/admin/${city._id}`)
              .set('Authorization', `Bearer ${token}`)
              .send();
        
            expect(response.status).toBe(200);
           
    
          });
        
          it('should return a 403 status if the user is not the admin', async () => {
            const response = await request(server)
              .delete(`/api/cities/admin/${city._id}`)
              .set('Authorization', `Bearer ${faketoken}`)
               expect(response.status).toBe(403);
    
      });

      
       
      });

      describe("update cities picture ",()=>{
        publicid="zflml5b5oq40xzvsroxx"
        it('should return 400 if the data is invalid ', async () => {
            const res = await request(server)
              .put(`/api/cities/admin/update-image/${data.id}/${publicid}`)
              .set('Authorization', `Bearer ${token}`)
            .send({})
              .expect(400);

        })
        it('should return 400 if activity do not exist ', async () => {
            const res = await request(server)
              .put(`/api/cities/admin/update-image/${data1.id}/${publicid}`)
              .set('Authorization', `Bearer ${token}`) 
              .attach('test-image.png')
              expect(res.status).toBe(400);
            
          });
        })
    
        describe("delete city picture ",()=>{
            publicid="zflml5b5oq40xzvsroxx"
            it('should return 400 if this is not the admin', async () => {
                const res = await request(server)
                  .delete(`/api/cities/admin/update-image/${data.id}/${publicid}`)
                  .set('Authorization', `Bearer ${faketoken}`)
                  .expect(401);
    
            })
            it('should return 400 if city do not exist ', async () => {
                const res = await request(server)
                  .delete(`/api/cities/admin/update-image/${data1.id}/${publicid}`)
                  .set('Authorization', `Bearer ${token}`) 
                  expect(res.status).toBe(400);
                
              });
            })
        

})