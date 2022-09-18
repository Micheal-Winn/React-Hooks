import React,{useState,useEffect} from "react";

 const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout : ()=>{},
    onLogin : (email,password)=>{}
})

export const AuthContextProvider = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const UsersStoredData = localStorage.getItem('IsLogIn');
        if(UsersStoredData === '1')
        {
          setIsLoggedIn(true)
        }
      },[]);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
    
        localStorage.setItem('IsLogIn','1')
    
        setIsLoggedIn(true);
      };

    const logoutHandler = () => {
        localStorage.removeItem('IsLogIn')
        setIsLoggedIn(false);
      };

    return (
        <AuthContext.Provider value={
           { isLoggedIn : isLoggedIn,
            onLogin : loginHandler,
            onLogout : logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext