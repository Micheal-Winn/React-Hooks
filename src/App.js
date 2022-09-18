import React,{useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/context/auth-context';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);



  // useEffect(()=>{
  //   const UsersStoredData = localStorage.getItem('IsLogIn');
  //   if(UsersStoredData === '1')
  //   {
  //     setIsLoggedIn(true)
  //   }
  // },[]);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways

  //   localStorage.setItem('IsLogIn','1')

  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('IsLogIn')
  //   setIsLoggedIn(false);
  // };

  const ctx = useContext(AuthContext)

  return (
    <React.Fragment>
      {/* <AuthContext.Provider value={
          {isLoggedIn : isLoggedIn,
            onLogout : logoutHandler
          }
      }> */}

        <MainHeader/>
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home />}
        </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
