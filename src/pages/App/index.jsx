import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Dashboard from '../Dashboard';
import ForgotPassword from '../ForgotPassword';
import { AuthProvider } from '../../contexts/AuthContext';
// import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path='/' element={<ProtectedRoute />}>
                        <Route exact path='/' element={<Dashboard />} />
                    </Route>
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
