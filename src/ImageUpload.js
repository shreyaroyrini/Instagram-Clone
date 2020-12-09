import React , {useState} from 'react'
import { Button } from '@material-ui/core'

import { db, storage } from './firebase';
import './ImageUpload.css'
import firebase from "firebase";

 
 function ImageUpload({username}){
    const [image , setImage] = useState ( null);
    const [progress , setProgress] = useState( 0 );
    const [caption ,setCaption] = useState( ' ');

            const handleChange = (e) => {
                        if(e.target.files[0]){
                            setImage(e.target.files[0]);
                        }
                    };

            const handleUpload = () => {
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on(
                        "state_changed",
                        (snapshot)=>{
                            // progress function...
                            const progress = Math.round(
                                (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                            );
                            setProgress(progress);
                        },
                        (error) => {
                                    // error function
                                    console.log(error);
                                    alert(error.message);
                                },
                                () => {
                                    storage
                                            .ref("image")
                                            .child(image.name)
                                            .getDownloadURL()
                                            .then(url => {
                                                db.collection('post').add({
                                                    timestamp: firebase.firestore.FieldValue.serverTimestamp( ),
                                                    caption : caption,
                                                    imageUrl : url,
                                                    username : username 
                                                });
                                                setProgress(0);
                                                setCaption(" ");
                                                setImage(null);

                                            });
                                }
                )



            }
     return (
         <div className = 'imageupload'>
             {/* <h1>ABC</h1> */}
              {/* I want to have... */}
              {/* Caption input */}
              {/* File picker */}
              {/* Post button */}
              <progress className = 'imageupload__progress'
              value = {progress}
                  max = "100"
              />
              <input type = "text" 
                placeholder = "Enter a caption......"
                onChange = { event => setCaption(event.target.value)}
                value ={caption} />
             <input type ="file" onChange = {handleChange}/>


               <Button onClick = {handleUpload}>
                   Upload
               </Button>
         </div>
     )
 }
 
 export default ImageUpload
 





// import { Button } from '@material-ui/core'
// import React , {useState} from 'react'
// import { db, storage } from './firebase';
// import firebase from "firebase"
// import firebase from "firebase"



// function ImageUpload( {username}) {
//     const [image , setImage] = useState ( null);
//     const [progress , setProgress] = useState( 0 );
//     const [caption, setCaption] = useState( ' ');

//     const handleChange = (e) => {
//         if(e.target.files[0]){
//             setImage(e.target.files[0]);
//         }
//     };
//     const handleUpload = () => {
        // const uploadTask = storage.ref(`images/${image.name}`).put(image);
        // uploadTask.on(
        //     "state_changed",
        //     (snapshot)=>{
        //         // progress function...
        //         const progress = Math.round(
        //             (snapshot.bytesTransferred/snapshot.totalBytes) * 100
        //         );
        //         setProgress(progress)
        //     },
        //     (error) => {
        //         // error function
        //         console.log(error);
        //         alert(error.message);
        //     },
        //     () => {
        //         // complete function
        //         storage
        //                 .ref("image")
        //                 .child(image.name)
        //                 .getDownloadURL()
        //                 .then(url => {
        //                     // insert img db
        //                     db.collection('post').add({
        //                         timestamp: firebase.firestore.FieldVlaue.serverTimestamp() ,
        //                         caption:caption,
        //                         imgUrl: url,
        //                         username : username 
        //                     });

        //                     setProgress(0);
        //                     setCaption(" ");
        //                     setImage(null);
        //                 })
        //     }
        // )
    // }

//     return (
//         <div>
//         <progress className = "imageupload__progress" 
//             value = {progress} max = "100"
//         />
//             <input type = "text"
//              placeholder = 'Enter a caption...' 
//              onChange = { event => setCaption(event.target.value)}
//                 value ={caption} />

            // <input type ="file" onChange = {handleChange}/>

//             <Button onClick = {handleUpload}> Upload </Button>
//         </div>
//     )
// }

// export default ImageUpload;
