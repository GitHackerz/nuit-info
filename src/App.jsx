import { Route, Routes, useNavigate } from 'react-router-dom';
import Signin from './pages/auth/Signin.jsx';
import Signup from './pages/auth/Signup.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import MapContainer from './pages/MapContainer.jsx';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login } from './redux/features/user.js';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const token = Cookies.get('token') || null;
        const user = JSON.parse(Cookies.get('user') || null) ;
        if (!token || !user)
            return navigate('/signin');
        dispatch(login({ token, user }));
        const path = window.location.pathname;
        if (path === '/signin' || path === '/signup')
            navigate('/');
    }, [dispatch, navigate]);
    return (
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<MapContainer/>}/>
            </Route>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    );
}

export default App;
