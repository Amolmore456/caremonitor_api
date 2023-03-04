import asyncHandler from 'express-async-handler'
import groupDataBy15Min from '../utils/groupDataBy15Min.js'


const addHeartBeatData = asyncHandler(async (req, res) => {
    const {clinical_data} = req.body
      
    const data =  groupDataBy15Min(clinical_data.HEART_RATE.data)
    clinical_data.HEART_RATE.data = data

    return res.send({clinical_data})
})



export {addHeartBeatData}




