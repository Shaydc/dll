const axios = require('axios')
const fs = require('fs')

const makeGetRequest = async (i_Path, i_Params = "", i_Headers="") => {
    
  if(i_Params != ""){       
      i_Path = i_Path + "?" + i_Params
    }
    
    try {
        response = await axios.get(i_Path, {headers: i_Headers})
        return response.data
      }
      catch (err){
        console.error(response)
        console.error("[!] ERROR: Function makeGetRequest return error")
        console.error(`ERROR: ${err}`)
      }
    return response.data
}

makeGetRequest("https://api.github.com/repos/shaydc/repo2", "", "OAuth = ")
module.exports = {makeGetRequest}
