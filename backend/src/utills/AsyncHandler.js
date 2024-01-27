const asyncHandler = (handledFunction) => {

    return(req,res,next)=>{
        Promise.resolve(handledFunction(req,res,next))
        .catch((err)=>{next(err)})
    }
    
}

export default asyncHandler;