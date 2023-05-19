import { api } from "./api";


const uploadFile = async (data: FormData, job_id: string) => {
    try {
        
        const response = await api.post(`/jobs/${job_id}/apply`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        });
        console.log("success")
        return response.data
      } catch (error) {
        console.log(error)
        return error
      }
}

const downloadFile = async (filename: string, job_id: string) => {
  try {

    const response = await api.get(`/jobs/${job_id}/apply/download/${filename}`, {
      responseType: "blob"
    });

    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

  } catch (error) {
    console.log(error)
  }
}

const manageApplication = async (job_id: string, application_id: string, data: any) => {
  try {
    
    const response = await api.put(`/jobs/${job_id}/apply/${application_id}`, data);
    // console.log(response);
    return response.data;

  } catch (error) {
    console.log(error);
  }
}

export {
    uploadFile,
    downloadFile,
    manageApplication
}