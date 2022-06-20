
class CustromAPIError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


const createCustomError = (msg, code) =>{
    return new CustromAPIError(msg, code)
}

export  {
    CustromAPIError,
    createCustomError
}