import pino from 'pino';
import axios from 'axios';

pino({ level: 'info', });


const loggerComponent = async (message) => {
    //logger.info(message)
    await axios.post("http://localhost:3002/api/log", message)
        .then((res) => { })
        .catch(error => { console.log(error) })

}
export default loggerComponent