import axios from "axios"


export default {
    sendRequest(method="get",url, body ) {

        const config = {
            method, 
            url,
        }

        if(method !=="GET"||method.toLocaleUpperCase()!=="get") {
            config.data = body;
        }

        return axios(config)
    }    
}