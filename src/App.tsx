import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import CommonRoutes from './app/Routes/CommonRoutes';
import Loading from './features/Common/Components/Loading/Loading';
import DefaultLayout from './features/Common/Layout/DefaultLayout';

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DefaultLayout>
        <CommonRoutes />
        <ToastContainer />
        <Tooltip id="my-tooltip" style={{ zIndex: 1000 }} delayShow={300} className="shadow" />
      </DefaultLayout>
    </Suspense>
  );
};

export default App;
