import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Channel from './components/Channel';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='channels' element={<Layout />}>
          <Route path=':channel' element={<Channel />} />
        </Route>
        <Route path='*' element={<Navigate to='/channels/public' />} />
      </Route>
    </Routes>
  );
}

export default App;
