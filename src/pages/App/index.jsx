// import SignUp from '../SignUp';
// import SignIn from '../SignIn';
// import Navbar from '../Navbar';
// import ForgotPassword from '../ForgotPassword';
// import { AuthProvider } from '../../contexts/AuthContext';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Outlet,
// } from 'react-router-dom';
// import ProtectedRoute from '../../components/ProtectedRoute';

// function App() {
//     return (
//         <Router>
//             <AuthProvider>
//                 <Routes>
//                     <Route element={<ProtectedRoute />}>
//                         <Route exact path='/*' element={<Navbar />} />
//                     </Route>
//                     <Route path='/signup' element={<SignUp />} />
//                     <Route path='/signin' element={<SignIn />} />
//                     <Route
//                         path='/forgot-password'
//                         element={<ForgotPassword />}
//                     />
//                 </Routes>
//                 <Outlet />
//             </AuthProvider>
//         </Router>
//     );
// }

// export default App;
