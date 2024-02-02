const request = require("supertest")
const {Place} = require('../../models/PlaceModel');
const { object } = require("joi");
const mongoose = require('mongoose');
const { verifyToken, verifyTokenAdmin} = require('../../middleware/verifyToken');


token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTJkMmVlMTA3ZjM0MWI2OTJiNDhhYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzI4Mjg2M30.VfabQpfS8yPD3jIpeAuQJlLR7yCPHEsdNlev-og6dmg"
faketoken="123456789"
let server
// Mock place data
const placetest={
    name: 'jnjjjjjjj',
    description: 'dfddgdgdgggggggggggggggggggggggggggggggg',
    categories: ['64537ea7c8622fc1cf5f8fd3'],
    activities: ['64537ebbc8622fc1cf5f9e63'],
    city: '64537ea0c8622fc1cf5f8b4f',
    pictures:[ {
        url: 'https://example.com/image1.jpg',
        publicId: 'This is image 1.',
      },],
      
    
}

const data ={
  id :"64537ed7c8622fc1cf5f9fbf",
  
}
const data1={
  id:"6447af2e2f58f1004773fa88"
}

describe.skip('place',()=>{
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


  
    //descibe get  all place 
     describe("get all places ",()=>{

         test("should return all the places ",async()=>{

           // Insert a test place into the database
          // await Place.create(placetest);

            const response= await  request(server)
                         .get(`/api/endroits`)
                         .set('Accept', 'application/json')
             expect(response.statusCode).toBe(201)
              expect(response.body).not.toBeNull();
          
     
         })

         test("should return 404 if  no place found ", async()=>{
          //jest.spyOn(Place, "find").mockResolvedValue([]);

           const response= await request(server)
                        .get(`/api/endroits`)
            expect(response.status).toBe(404)  
          
         
    
         })
     })

    // Test getSinglePlace
  describe('Get single olace', () => {
    test('should return a single place', async () => {
     
          // Insert a test place into the database
     // const { _id } = await Place.create(placetest);

      const res = await request(server).get(`/api/endroits/${data.id}`);
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body).toEqual('object');
   
    });
    test('should return 404 if place is not found', async () => {
        const res = await request(server).get(`/api/endroits/${data1.id}`);
        expect(res.statusCode).toBe(404);
       
      });
})
  
        
        //update place 
        describe('update place', () => {
          test('should update an existing place', async () => {
            // Insert a test place into the database
           
      
            const updatedPlace = { name: 'Updated Test Place' };
      
            const res = await request(server)
              .put(`/api/endroits/admin/${data.id}`)
              .set('Authorization', `Bearer ${token}`)
              .send(updatedPlace);
               expect(res.statusCode).toBe(200);
          
          });
      
          test('should return 400 if place is not found', async () => {
            const res = await request(server)
              .put(`/api/endroits/admin/${data1.id}`)
              .set('Authorization', `Bearer ${token}`)
              .send({ name: 'Updated Test Place' });
       
            expect(res.statusCode).toBe(400);
          });
          test('should return 400 if place data is invalid', async () => {
              // Insert a test place into the database
            
        
              const res = await request(server)
                .put(`/api/endroits/admin/${data.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ nom: 'Updated Test Place' });
        
              expect(res.statusCode).toBe(400);
            });
       })

       
       
       describe('delete place ', () => {
       let  place;
       
         beforeAll(async () => {
           // Connect to test database
           await mongoose.connect(process.env.MONGO_URI);
       
           // Create a test place
           place = await  Place.create({
             name: 'Test Place',
             description: 'Test description',
             categories: ['6447a5c096b7b6f67e2047b3'],
             activities: ['6447a5e796b7b6f67e205ec1'],
             city: '6447a5d096b7b6f67e205878',
             pictures: [
               {
                 url: 'https://example.com/image1.jpg',
                 publicId: 'This is image 1.'
               }
             ]
           });
       
         });
       
         afterAll(async () => {
           // Remove test place
           await Place.deleteOne({ _id: place._id });
       
           // Disconnect from test database
           await mongoose.disconnect();
         });
       
         it('should return a 400 status if the agency is not found', async () => {
          const response = await request(server)
            .delete(`/api/endroits/admin/${data1.id}`)
            .set('Authorization', `Bearer ${token}`)
          expect(response.status).toBe(400);
         
        });
      
        it('should return a 200 status and delete the place and its image', async () => {
          const response = await request(server)
            .delete(`/api/endroits/admin/${place._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();
      
          expect(response.status).toBe(200);
         
  
        });
      
        it('should return a 403 status if the user is not the admin', async () => {
          const response = await request(server)
            .delete(`/api/endroits/admin/${place._id}`)
            .set('Authorization', `Bearer ${faketoken}`)
             expect(response.status).toBe(403);
  
    });

       });




       describe('create place ', () => {
        
           test("should return a status 401 if it's not admin ",async()=>{
            const response= await  request(server)
                        .post(`/api/endroits/admin`).send(placetest)
                        .set('Authorization', `Bearer ${faketoken}`)
                         expect(response.status).toBe(401)        
       });
  
        it('should return 400 if invalid data provided', async () => {
          const res = await request(server)
            .post(`/api/endroits/admin`)
            .set('Authorization', `Bearer ${token}`)
            .send({})
            expect(res.status).toBe(400);
          
        });
      
        it('should return 400 if no image provided', async () => {
         
          const res = await request(server)
            .post(`/api/endroits/admin`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Place', description: 'Test description', categories: ['Test'], activities: ['Test'] });
          expect(res.status).toBe(400);
          
        });
      
        
      
        it('should create a new place and return it if valid data and image provided', async () => {
       
          const res = await request(test)
            .post(`/api/endroits/admin`)
            .set('Authorization', `Bearer ${token}`)
            .attach('images', './test/test-image.jpg')
            .field('name', 'TestPlace')
            .field('description', 'Test description1111111111')
            .field('categories', '64537ea7c8622fc1cf5f8fd3')
            .field('activities', '64537ebbc8622fc1cf5f9e63')
            .field('city','64537ea0c8622fc1cf5f8b4f')
          expect(res.status).toBe(201);
         
        });
      });
       
})

