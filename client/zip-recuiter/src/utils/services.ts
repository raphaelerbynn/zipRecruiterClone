import { api } from "./api";


const uploadFile = async (data: FormData) => {
    try {
        
        await api.post('/jobs/645e6d1c644012eb1b0ab367/apply', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        });
        console.log("success")
      } catch (error) {
        console.log(error)
      }
}


export {
    uploadFile
}