const request = require("supertest")
const validateObjectid =require("../../middleware/validateObjectid")
const mongoose = require('mongoose');
const pino = require('pino');
const fs = require('fs');
const logFileStream = fs.createWriteStream('/var/log/nginx/access.log', { flags: 'a' });


var message = {"level":30,"time":1682431202886,"action":"bencharrada najeh scrolled the home page ","idUser":"643d2866f9561899e5d07221","userFullName":"bencharrada najeh"}

let server
const logger = pino({
    level: 'info',
    base: null,
    prettyPrint: false
},logFileStream)
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
    describe("rest ",()=>{
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

        it("should return a status 200 and add place to bucket list user ",async()=>{
            const response= await  request(server)
            .post(`/api/log`)
            .send(message)
        })

        
    })
    
})
