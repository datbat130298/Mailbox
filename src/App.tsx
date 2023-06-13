/* eslint-disable react/jsx-no-constructed-context-values */
import { Suspense, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import ContextDraft from './app/Context/Context';
import CommonRoutes from './app/Routes/CommonRoutes';
import { ComposeType } from './app/Types/commonTypes';
import Loading from './features/Common/Components/Loading/Loading';
import DefaultLayout from './features/Common/Layout/DefaultLayout';

const App = () => {
  const [draft, setDraft] = useState<ComposeType[]>([]);

  const updateDraft = (id: number, data: ComposeType) => {
    const newDraft = Object.assign(draft[id], data);
    draft?.splice(id, 1, newDraft);
    setDraft(draft);
  };

  useEffect(() => {
    if (draft.length >= 3) {
      draft.map((item, id) => {
        if (id === draft.length - 1 || id === draft.length - 2) {
          return updateDraft(id, { isShow: true, uuid: 1 });
        }
        return updateDraft(id, { isShow: false, uuid: 1 });
      });
    }
  }, [draft]);

  const removeItem = (id: number) => {
    draft?.splice(id, 1);
    // setDraft(draft);
  };

  const setIsShowDraft = (id: number, data: boolean) => {
    draft[id].isShow = data;
  };

  return (
    <Suspense fallback={<Loading />}>
      <ContextDraft.Provider value={{ draft, setDraft, removeItem, updateDraft, setIsShowDraft }}>
        <DefaultLayout>
          <CommonRoutes />
          <ToastContainer />
          <Tooltip id="my-tooltip" style={{ zIndex: 1000 }} delayShow={300} className="shadow" />
        </DefaultLayout>
      </ContextDraft.Provider>
    </Suspense>
  );
};

export default App;
