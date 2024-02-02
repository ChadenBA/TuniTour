const request = require("supertest")
const { Category } = require("../../models/categoryModel")
const mongoose = require('mongoose');
token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTJkMmVlMTA3ZjM0MWI2OTJiNDhhYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzI4Mjg2M30.VfabQpfS8yPD3jIpeAuQJlLR7yCPHEsdNlev-og6dmg"
faketoken="123456789"
let server

const data ={
    id :"64537ea7c8622fc1cf5f8fd3",
    
  }
  const data1={
    id:"6447af2e2f58f1004773fa88"
  }
  const catid ={
    id:"6453f653a1db7860a620732c"
  }
describe.skip("category",()=>{
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
    describe("create category ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .post(`/api/categories/admin`)
              .set('Authorization', `Bearer ${token}`) 
              .send({})
              expect(res.status).toBe(400);
            
          });
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .post(`/api/categories/admin`)
              .set('Authorization', `Bearer ${token}`) 
              .send({title:"popo"})
              expect(res.status).toBe(201);
            
          });
    })
    describe("get all category ",()=>{

        it('should return 201 if category existes ', async () => {
            const res = await request(server)
              .get(`/api/categories`)
              expect(res.status).toBe(201);
            
          });
      
          it('should return 404 if  no category exist ', async () => {
            const res = await request(server)
              .get(`/api/categories`)
              expect(res.status).toBe(404);
            
          });
    })
    describe("update category ",()=>{

        it('should return 400 if invalid data provided', async () => {
            const res = await request(server)
              .put(`/api/categories/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({tile:1222})
              expect(res.status).toBe(400);
            
          });
          it('should return 400 if category do not exist ', async () => {
            const res = await request(server)
              .put(`/api/categories/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send()
              expect(res.status).toBe(400);
            
          });
      
          it('should return 201 if  data provided', async () => {
            const res = await request(server)
              .put(`/api/categories/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`) 
              .send({title:"jhjhjhjh"})
              expect(res.status).toBe(200);
            
          });
    })
   
    describe('delete category  ', () => {
      let  cat ;
      
        beforeAll(async () => {
          // Connect to test database
          await mongoose.connect(process.env.MONGO_URI);
      
          // Create a test place
          place = await  Category.create({
            title: 'test category '
          
          });
      
        });
      
        afterAll(async () => {
          // Remove test place
         // await Category.deleteOne({ _id: cat._id });
      
          // Disconnect from test database
          await mongoose.disconnect();
        });
      
        it('should return a 400 status if the cat is not found', async () => {
          const response = await request(server)
            .delete(`/api/categories/admin/${data1.id}`)
            .set('Authorization', `Bearer ${token}`)
          expect(response.status).toBe(400);
         
        });
      
        it('should return a 200 status and delete the cat ', async () => {
          const response = await request(server)
            .delete(`/api/categories/admin/${catid.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();
      
          expect(response.status).toBe(200);
        
        });
    
      });


    

})