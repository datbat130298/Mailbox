/* eslint-disable react/jsx-no-constructed-context-values */
import { Suspense, useCallback, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import ContextDraft from './app/Context/Context';
import { ComposeViewTypeEnum } from './app/Enums/commonEnums';
import CommonRoutes from './app/Routes/CommonRoutes';
import { ComposeType } from './app/Types/commonTypes';
import Loading from './features/Common/Components/Loading/Loading';
import DefaultLayout from './features/Common/Layout/DefaultLayout';

const App = () => {
  const [composeDraftList, setComposeDraftList] = useState<ComposeType[]>([]);

  const handleAddComposeDraft = (viewType: ComposeViewTypeEnum) => {
    setComposeDraftList((prev) => prev.concat({ isShow: true, uuid: composeDraftList.length, viewType }));
  };

  const handleChangeViewType = useCallback(
    async (id: number, data: ComposeViewTypeEnum) => {
      const array = composeDraftList;
      await array.forEach((item) => {
        if (item.uuid === id) {
          return Object.assign(item, { viewType: data });
        }
        return item;
      });
      setComposeDraftList(array);
    },
    [composeDraftList],
  );

  const handleClickCloseComposeItem = useCallback(
    async (id: number) => {
      const array = await composeDraftList.filter((item) => item.uuid !== id);
      setComposeDraftList(array);
    },
    [composeDraftList],
  );

  const handleShowCompose = useCallback(
    async (id: number, data: boolean) => {
      const array = composeDraftList;
      await array.forEach((item) => {
        if (item.uuid === id) {
          return Object.assign(item, { isShow: data });
        }
        return item;
      });
      setComposeDraftList(array);
    },
    [composeDraftList],
  );

  return (
    <Suspense fallback={<Loading />}>
      <ContextDraft.Provider
        value={{
          composeDraftList,
          setComposeDraftList,
          handleClickCloseComposeItem,
          handleShowCompose,
          handleAddComposeDraft,
          handleChangeViewType,
        }}
      >
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
