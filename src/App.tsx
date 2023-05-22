import { Suspense } from 'react';
import CommonRoutes from './app/Routes/CommonRoutes';
import Loading from './features/Common/Components/Loading/Loading';
import DefaultLayout from './features/Common/Layout/DefaultLayout';

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DefaultLayout>
        <CommonRoutes />
      </DefaultLayout>
    </Suspense>
  );
};

export default App;
