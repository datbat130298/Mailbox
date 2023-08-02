import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { setMailItemStyle } from '../../../../../app/Slices/layoutSlice';
import { MailType } from '../../../../../app/Types/commonTypes';
import useDispatch from '../../../../Hooks/useDispatch';
import useSelector from '../../../../Hooks/useSelector';
import EmptyData from '../../EmptyData/EmptyData';
import HeaderMailTable from '../HeaderMailTable';
import MailTable from '../MailTable';
import ViewMailMobile from '../ViewMailMobile';
import ViewMailSpace from './ViewMailSpace/ViewMailSpace';

interface MailTableContainerProp {
  mailData: Array<MailType>;
  isLoading: boolean;
}

const MailTableContainer = ({ mailData, isLoading }: MailTableContainerProp) => {
  const [isShowViewMailSpace, setIsShowViewMailSpace] = useState(false);
  const [isShowViewMailMobile, setIsShowViewMailMobile] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);
  const [selectedMail, setSelectedMail] = useState<MailType | null>(null);
  const [isShowShadow, setIsShowShadow] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerTableRef = useRef<HTMLDivElement>(null);
  const viewMailRef = useRef<HTMLDivElement>(null);
  const dragBarSide = useRef<HTMLDivElement>(null);
  const isClicked = useRef(false);

  const isShowFullSideBar = useSelector((state) => state.layout.isShowFullSidebar);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isChecked = useMemo(() => {
    if (!_.isEmpty(selectRows)) return true;
    return false;
  }, [selectRows]);

  const handleSelectMail = (mail: MailType) => {
    setSelectedMail(mail);
    if (window.screen.width < 620) {
      setIsShowViewMailMobile(true);
      return;
    }
    setIsShowViewMailSpace(true);
    if (tableRef.current !== null) {
      tableRef.current.style.width = '50%';
    }
  };

  const handleClose = () => {
    setSelectedMail(null);
    setIsShowViewMailSpace(false);
    if (tableRef.current !== null) {
      tableRef.current.style.width = '100%';
    }
  };

  const handleSelectRows = (idRows: number, checked: boolean) => {
    if (checked) {
      return setSelectRows((prev) => _.uniq([...prev, idRows]));
    }
    return setSelectRows((prev) => prev.filter((item) => item !== idRows));
  };

  const handleSelectAll = (checked: boolean) => {
    const selectAll = mailData.map((item) => item?.uuid);
    if (checked) {
      return setSelectRows(selectAll);
    }
    return setSelectRows([]);
  };

  const onMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    isClicked.current = true;
  }, []);

  const onMouseUp = useCallback(() => {
    isClicked.current = false;
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isClicked.current) return;
      if (event.clientX <= (isShowFullSideBar ? 750 : 570) || event.clientX >= 1400) {
        return;
      }

      if (dragBarSide.current !== null) {
        dragBarSide.current.style.left = `${
          event.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0)
        }px`;
      }

      if (tableRef.current !== null && !isShowFullSideBar) {
        tableRef.current.style.width = `${event.clientX - 95}px`;
      }
      if (tableRef.current !== null && isShowFullSideBar) {
        tableRef.current.style.width = `${event.clientX - 283}px`;
      }

      if (headerTableRef.current && !isShowFullSideBar) {
        headerTableRef.current.style.width = `${event.clientX - 95}px`;
      }
      if (headerTableRef.current && isShowFullSideBar) {
        headerTableRef.current.style.width = `${event.clientX - 283}px`;
      }
    },
    [isShowFullSideBar],
  );

  useEffect(() => {
    if (isShowViewMailSpace && headerTableRef.current !== null) {
      headerTableRef.current.style.width = '50%';
    }
    if (!isShowViewMailSpace && headerTableRef.current !== null) {
      headerTableRef.current.style.width = '100%';
    }
    if (
      isShowViewMailSpace &&
      dragBarSide.current &&
      containerRef.current &&
      tableRef.current &&
      viewMailRef.current &&
      headerTableRef.current !== null
    ) {
      dragBarSide.current.style.left = `${window.innerWidth / 2 - 45}px`;
      dragBarSide.current.addEventListener('mousedown', onMouseDown);
      dragBarSide.current.addEventListener('mouseup', onMouseUp);
      if (containerRef.current !== null) {
        containerRef.current.addEventListener('mousemove', onMouseMove);
        containerRef.current.addEventListener('mouseup', onMouseUp);
      }

      return () => {
        if (dragBarSide.current && containerRef) {
          dragBarSide.current.removeEventListener('mousedown', onMouseDown);
          dragBarSide.current.removeEventListener('mouseup', onMouseUp);
          containerRef.current?.removeEventListener('mousemove', onMouseMove);
          containerRef.current?.removeEventListener('mouseup', onMouseUp);
        }
      };
    }
    return undefined;
  }, [isShowViewMailSpace, isShowFullSideBar]);

  useEffect(() => {
    if (headerTableRef === null) return;
    if (
      headerTableRef.current?.getBoundingClientRect().width &&
      headerTableRef.current?.getBoundingClientRect().width < 640
    ) {
      dispatch(setMailItemStyle('classic'));
    }
  }, [headerTableRef]);

  return (
    <div
      className={twMerge('h-full w-full text-center', isShowViewMailSpace && 'flex overflow-hidden')}
      ref={containerRef}
    >
      <div className={twMerge('h-full w-full pt-14', isShowViewMailSpace && 'w-1/2')} ref={tableRef}>
        <div className={twMerge('', tableRef.current && `w-${tableRef.current.style.width}`)}>
          <HeaderMailTable
            // isShowViewMailSpace={isShowViewMailMobile}
            ref={headerTableRef}
            actionArray={['datetime']}
            isShowShadow={isShowShadow}
            isShowCheckboxHeader={isShowViewMailSpace}
            isChecked={isChecked}
            onClickSelectAll={handleSelectAll}
            onCloseViewMailSpace={() => {
              setIsShowViewMailSpace(false);
              setSelectedMail({} as MailType);
            }}
          />
        </div>
        <MailTable
          isLoading={isLoading}
          data={mailData}
          onChangeShowShadow={setIsShowShadow}
          onChangeSelectRows={handleSelectRows}
          onClickShowMail={handleSelectMail}
          selectRows={selectRows}
          selectedMail={selectedMail && selectedMail}
          emptyComponent={
            <EmptyData message={t('drafts_empty_message')} description={t('drafts_empty_description')} />
          }
        />
      </div>
      {isShowViewMailSpace && (
        <div className="h-full w-full flex-1 bg-white" ref={viewMailRef}>
          <ViewMailSpace handleClose={handleClose} mailData={selectedMail} ref={dragBarSide} />
        </div>
      )}
      <ViewMailMobile
        mailData={selectedMail}
        isOpen={isShowViewMailMobile}
        onClose={() => setIsShowViewMailMobile(false)}
      />
    </div>
  );
};

export default MailTableContainer;
