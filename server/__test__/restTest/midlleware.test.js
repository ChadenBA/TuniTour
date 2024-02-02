const request = require("supertest")
const validateObjectid =require("../../middleware/validateObjectid")
const mongoose = require('mongoose');
const{ verifyToken ,verifyTokenAdmin}=require("../../middleware/verifyToken")


var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzg1NmQzNzZjY2FlMGZmNmUzYzk1NyIsImlhdCI6MTY4MjM2MjQ3MX0.VyuLRJkbObR7wBc_Sos4lSrsSOVpERxAXB_5A_--UfY"
var admintoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzgwMjg0Y2I2MmE3ODA5OTIxMTkzNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjUwNTcxOX0.DhPeWiK4zg2Jlfpojak0r5H731ZdijWvJJCHdx7Oq1s"
let server
describe.skip('Rest ',()=>{
    //preparer notre test avant chaque test
    //ouvrire le server 
    beforeEach(()=>{
        server= require("../../../server")
    })

    //fermer le server apres chaue test
    afterEach(()=>{
        server.close()
        //User.collection.deleteMany()
        //Account.collection.deleteMany()
    })
    describe("validate Object id  ",()=>{
        it('should call next if the id is valid', () => {
            const req = { params: { id: mongoose.Types.ObjectId() } };
            const res = {};
            const next = jest.fn();
        
            validateObjectid(req, res, next);
        
            expect(next).toHaveBeenCalled();
        });
        it('should return an error if the id is invalid', () => {
            const req = { params: { id: 'invalid_id' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();
        
            validateObjectid(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'invalid id' });
            expect(next).not.toHaveBeenCalled();
        });
        
    })
    describe("verify token ",()=>{
        it('verify token with valid token ', () => {
            const req = { params: { id: mongoose.Types.ObjectId() } ,headers:{authorization:token}};
            const res = {status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();
        
            validateObjectid(req, res, next);
            expect(next).toHaveBeenCalled();
            verifyToken(req,res,next)

        });

        it('verify token with no token ', () => {
            const req = { params: { id: mongoose.Types.ObjectId() } ,headers:{authorization:null} };
            const res = {status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            verifyToken(req,res,next)
        
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'no token provided' });
            expect(next).not.toHaveBeenCalled();
        });
    })
    describe("verify token admin ",()=>{

        it.skip('midleware verify token and admin', () => {
            const req = { headers:{authorization:admintoken} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn()};
            const next = jest.fn();
                verifyTokenAdmin(req,res,next)
                expect(next).toHaveBeenCalled();

        });



        it('midleware verify token and no  admin', () => {
            const req = { params: { id: mongoose.Types.ObjectId() } ,headers:{authorization:token} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn()};
            const next = jest.fn();
                verifyTokenAdmin(req,res,next)
                expect(next).not.toHaveBeenCalled();
                expect(res.status).toHaveBeenCalledWith(401);
               //expect(res.json).toHaveBeenCalledWith({ message: 'only admin' });

        });


    });

})