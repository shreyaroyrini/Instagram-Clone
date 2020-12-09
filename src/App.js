import React, {useEffect, useState} from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './firebase'
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import firebase from "firebase";
import InstagramEmbed from './InstagramEmbed';


function getModalStyle(){
  const top = 50 ;
  const left = 50 ;

  return{
    top : `${top}%`,
    left : `${left}%`,
    transform : `translate(-${top}% , -${left})`,
  };
}

const useStyles = makeStyles( (theme) =>( {
  paper: {
    position : 'absolute',
    width : 400,
    backgroundColor : theme.palette.background.paper,
    border : '2px solid #000',
    boxShadow : theme.shadows[5],
    padding : theme.spacing(2,4,3),

  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts , setPosts] = useState([ ]);
  const [open , setOpen] = useState(false);
  const [openSignIn , setOpenSignIn] = useState(false)
  const [username , setUsername] = useState('');
  const [email , setEmail ] = useState('');
  const [password , setPassword] = useState('');
  const [user , setUser] = useState(null);
useEffect( () => {
  const unsubscribe = auth.onAuthStateChanged((authUser) => {
    if(authUser){
      // user has logged in...
      console.log(authUser);
      setUser(authUser);
      if(authUser.displayName){
        // don't update username
      }else{
        return authUser.updateProfile({
          displayName : username,

        });
      }
    }else{
      // user has logged out...
      setUser(null);
    }
  })
  return () => {
    unsubscribe();
  }
}, [user, username]);


  useEffect( () => {
      db
        .collection('post')
        // .orderBy('timestamp' ,'desc')
        .onSnapshot( snapshot => {
        console.log(snapshot);
        setPosts(snapshot.docs.map(doc=>
          ({
            id : doc.id ,
            post : doc.data( )
          })
          
          ))
      })
  }, []);
   const signUp = (event) => {
      event.preventDefault();
      console.log(email);
      console.log(password);
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
      setOpen(false);
   }
  //  const handleLogin = (event) => {

  //  }
  const signIn = (event ) => {
    event.preventDefault();
    console.log(email);
    console.log(password);

    firebase.auth()
            .signInWithEmailAndPassword(email,password)
            .error( error => alert(error.message))
    setOpenSignIn(false);
  }
  
  return (
    <div className="app">
    
      <Modal
              open = {open} 
              onClose={() => { setOpen(false)}}>
                <div style = { modalStyle}
                    className = {classes.paper}>
                        <form className = " app__signup">
                                <center> 
                                    <img 
                                      className = " app__headerImage"
                                      src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2JK42TiBH9apltQsgx9B5-qDGkeB9JvZ1dg&usqp=CAU"
                                      alt = " "/> 
                                </center>

                  
                    
                            <Input
                              placeholder = "username"
                              type = " text "
                              value = {username}
                              onChange = { (e) => setUsername(e.target.value)}
                            />
                            <Input
                              placeholder = "email"
                              type = " text "
                              value = {email}
                              onChange = { (e) => setEmail(e.target.value)}
                            />

                            <Input
                              placeholder = "password"
                              type = " password "
                              value = {password}
                              onChange = { (e) => setPassword(e.target.value)}
                            />
                    {/* <Button onClick = {handleLogin}> Login </Button> */}
                    <Button type = "submit" onClick = {signUp}> Sign Up</Button> </form> </div></Modal>





      <Modal
            open = {openSignIn} 
            onClose={() => { setOpenSignIn(false)}}>
                  <div style = { modalStyle} className = {classes.paper}>
          <form className = " app__signup">
                <center> 
                    <img 
                      className = " app__headerImage"
                      src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2JK42TiBH9apltQsgx9B5-qDGkeB9JvZ1dg&usqp=CAU"
                      alt = " "/> 
                </center>
                    <Input
                      placeholder = "email"
                      type = " text "
                      value = {email}
                      onChange = { (e) => setEmail(e.target.value)}
                    />

                    <Input
                       placeholder = "password"
                      type = " password "
                      value = {password}
                      onChange = { (e) => setPassword(e.target.value)}
                    />
                    {/* <Button onClick = {handleLogin}> Login </Button> */}
                    <Button type = "submit" onClick = {signIn}> Sign In</Button> 
                    </form>
                    </div>
                    </Modal>
                    <div className = " app__header">
                          <img 
                            className = " app__headerImage"
                            src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2JK42TiBH9apltQsgx9B5-qDGkeB9JvZ1dg&usqp=CAU"
                          alt = " "/> 
                              {user ? (
                                          <Button onClick = { ( ) => auth.signOut ()}>Logout</Button>
                                        ):( <div className = "app__loginContainer">
                                        <Button onClick = { () => setOpenSignIn(true)}> Sign In</Button>
                                        <Button onClick = { () => setOpen(true)}> Sign Up</Button>

                                        </div>
                                        )}
                     </div>
                     <div className = "app__posts">
                     <div className = "app__postsLeft">
                     {
                          posts.map( ({ id , post }) => ( 
                          <Post  key = {id}
                            postId = {id}
                            user ={user}
                            username = {post.username}
                            caption = {post.caption}
                            imgUrl = {post.imgUrl}
                          /> ))
                          }

                     </div>
                     <div className = "app__postaRight">
                     <InstagramEmbed
                       url = "https://i0.wp.com/voxeuropae.com/wp-content/uploads/2019/02/SKq9yH-black-and-white-instagram-logo-png.png?ssl=1"
                       maxWidth = {320}
                       hideCaption = {false}
                       containerTagName = "div"
                       protocal = ' '
                       injectScript
                                  onLoading = { () =>  {}}
                                  onSuccess = { () => { }}
                                  onAfterRender = { () => { }}
                                  onFailure = { () => { }}
                     />
                     </div>
                     </div>
                    
                    
      {user?.displayName ? (
          <ImageUpload />
        ):(<h3>Sorry you need to Login to upload </h3>
    )} 
    </div>
    
  );
}

export default App;
