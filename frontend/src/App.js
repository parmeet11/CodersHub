import './App.css';

import { BrowserRouter, Routes , Route, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/authenticate/Authenticate';
import Activate from './pages/activate/Activate';
import Rooms from './pages/rooms/Rooms';

const isAuth = false;

const user = {
  activated: false,
}


function App() {
  return (
    <BrowserRouter>

      <Navigation />
        <Routes>
          <Route path="/" exact element={(<GuestRoute><Home /></GuestRoute>)} />
          
          <Route path="/authenticate" element={(<GuestRoute>
            <Authenticate/>
          </GuestRoute>)}/>

          <Route path="/activate" element={(<SemiProtectedRoute>
            <Activate/>
          </SemiProtectedRoute>)}/>

          <Route path="/rooms" element={(<ProtectedRoute>
            <Rooms/>
          </ProtectedRoute>)}/>


          {/*<Route path="/register" element={<Register />} />
          <Route path="/login"  element={<Login />} />
  */}
             
          
        </Routes>
      
    </BrowserRouter>
  );
}

const GuestRoute = ({children, ...rest}) => {
  return (
    isAuth ? 
          (<Navigate {...rest} to='/rooms' replace  />
          ):(
            children
          )
  );
};

const SemiProtectedRoute = ({children, ...rest}) => {
  return (
    !isAuth ? 
          (<Navigate {...rest} to='/' replace  />
          ):( /*user login but not upload profile pic and add username */ 
            isAuth && !user.activated ? 
            (children): (<Navigate to='/rooms' replace  />)
          )
  );
};

const ProtectedRoute = ({children, ...rest}) => {
  return (
    !isAuth ? 
          (<Navigate {...rest} to='/' replace  />
          ):isAuth && !user.activated ?( 
          <Navigate to='/rooms\' replace  />):
           (children)
          
  );
};









export default App;
