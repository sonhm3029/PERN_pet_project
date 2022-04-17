import clientUtils from "@src/utils/client-utils";

export default ({url})=> (
    {
        getAlls(param="") {
            return new Promise((resolve, reject)=> {
                const requestUrl = url + param;
                clientUtils
                    .sendRequest("get",requestUrl)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        },
        post(body) {
            console.log("body", body);
            return new Promise((resolve, reject)=> {
                const requestUrl = url;
                clientUtils
                    .sendRequest("post", requestUrl, body)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        
                        reject(err);
                    });
            })
        },
        delete(id) {
            return new Promise((resolve, reject)=> {
                const requestUrl = `${url}/${id}`;
                clientUtils
                    .sendRequest("delete", requestUrl)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        put({id,body}) {
            
            return new Promise((resolve, reject)=> {
                const requestUrl = url + `/${id}`;
                clientUtils
                    .sendRequest("put", requestUrl, body)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        
                        reject(err);
                    });
            })
        },
    }
)