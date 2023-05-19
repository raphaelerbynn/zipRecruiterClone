import { useState, useEffect } from "react";
import { api } from "../utils/api";



const Applications = () => {
    const [files, setFiles] = useState<any>({});

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await api.get('jobs/645e6d1c644012eb1b0ab367/apply');
        console.log(response)
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (file: any) => {
    try {
      const response = await api.get(`jobs/645e6d1c644012eb1b0ab367/apply`, {
        responseType: 'blob', // Set the response type to 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {
        files.resume
        
    }
    <button onClick={() => handleDownload(files.resume)}>Download</button>
    </div>
  );
}

export default Applications