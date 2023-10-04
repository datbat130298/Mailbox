/* eslint-disable react/jsx-no-constructed-context-values */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { DraftsProvider } from './app/Context/DraftContext';
import CommonRoutes from './app/Routes/CommonRoutes';
import Loading from './features/Common/Components/Loading/Loading';
import DefaultLayout from './features/Common/Layout/DefaultLayout';

const App = () => {
  dayjs.extend(utc);
  return (
    <Suspense fallback={<Loading />}>
      <DraftsProvider>
        <DefaultLayout>
          <CommonRoutes />
          <ToastContainer />
          <Tooltip id="my-tooltip" style={{ zIndex: 1000 }} delayShow={300} className="shadow" />
        </DefaultLayout>
      </DraftsProvider>
    </Suspense>
  );
};

export default App;
