class ApiResponse {

    constructor(statusCode , message , data ){
        this.message = message,
        this.data = data ,
        this.statusCode = statusCode,
        this.success
    }
}

export {ApiResponse}