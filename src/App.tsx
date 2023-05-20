import { Suspense } from 'react';
import CommonRoutes from './app/Routes/CommonRoutes';
import DefaultLayout from './features/Common/Layout/DefaultLayout';

const App = () => {
  return (
    <Suspense fallback="loading">
      <DefaultLayout>
        <CommonRoutes />
      </DefaultLayout>
    </Suspense>
  );
};

export default App;
