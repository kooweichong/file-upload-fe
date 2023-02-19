import React, {useEffect, useState} from "react";
import axios from "axios";

function FileForm(){
    const [file, setFile] = useState('')


    function handleFile(e:any)
    {
        console.log(e.target.files)
        setFile(e.target.files[0])
    }

    function onSubmitFile()
    {
        const formData = new FormData()
        formData.append('file', file)
        
        let UploadURL:string = "http://localhost:8080/uploads"
        axios.post(UploadURL, formData).then(
            (res) => {console.log(res)}
        )
    }

    return(
        <form>
            <input type="file" name="file" onChange={handleFile} />
            <button onClick={onSubmitFile}>Submit</button>
        </form>
    );

}

export default FileForm