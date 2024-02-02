const request = require("supertest")



let server
describe.skip('Utils ',()=>{
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
    it('midleware verify token and no  admin', () => {
        

    });
    
})
