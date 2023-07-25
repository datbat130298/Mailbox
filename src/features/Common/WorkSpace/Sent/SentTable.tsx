/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getSents } from '../../../../app/Services/Sent/SentService';
import { MailType } from '../../../../app/Types/commonTypes';
import { triggerClickNext, triggerClickPrev } from '../../../utils/helpers';
import EmptyData from '../../Components/EmptyData/EmptyData';
import HeaderMailTable from '../../Components/Mail/HeaderMailTable';
import MailTable from '../../Components/Mail/MailTable';
import ViewMailSpace from './ViewMailSpace/ViewMailSpace';

const SentTable = () => {
  const [isShowViewMailSpace, setIsShowViewMailSpace] = useState(false);
  const [sentMailData, setSendMailData] = useState<Array<MailType>>([]);
  const [selectedMail, setSelectedMail] = useState<MailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);
  const [isShowShadow, setIsShowShadow] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const tableSpaceRef = useRef<any>(null);
  const viewMailRef = useRef<any>(null);
  const dragBarSide = useRef<any>(null);
  const headerTableRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);

  const isChecked = useMemo(() => {
    if (!_.isEmpty(selectRows)) return true;
    return false;
  }, [selectRows]);

  const handleSelectMail = (mail: MailType) => {
    setSelectedMail(mail);
    setIsShowViewMailSpace(true);
  };

  const handleClose = () => {
    setSelectedMail(null);
    setIsShowViewMailSpace(false);
  };

  const handleSelectRows = (idRows: number, checked: boolean) => {
    if (checked) {
      return setSelectRows((prev) => _.uniq([...prev, idRows]));
    }
    return setSelectRows((prev) => prev.filter((item) => item !== idRows));
  };

  const handleClickNextButton = () => {
    const nextItem = triggerClickNext(sentMailData, selectedMail);
    if (nextItem) {
      setSelectedMail(nextItem);
      return navigate(`/drafts/${nextItem.uuid}`);
    }
    return false;
  };

  const handleClickPrevButton = () => {
    const prevItem = triggerClickPrev(sentMailData, selectedMail);
    if (prevItem) {
      setSelectedMail(prevItem);
      return navigate(`/drafts/${prevItem.uuid}`);
    }
    return false;
  };

  const handleSelectAll = (checked: boolean) => {
    const selectAll = sentMailData.map((item) => item?.uuid);
    if (checked) {
      return setSelectRows(selectAll);
    }
    return setSelectRows([]);
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getSents()
      .then((data: Array<MailType>) => {
        setSendMailData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    isClicked.current = true;
  }, []);

  const onMouseUp = useCallback(() => {
    isClicked.current = false;
  }, []);

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!isClicked.current) return;
    dragBarSide.current.style.left = `${
      event.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0)
    }px`;
    tableSpaceRef.current.style.width = `${event.clientX - 90}px`;
    if (headerTableRef.current) {
      headerTableRef.current.style.width = `${event.clientX - 90}px`;
    }
    // if (tableSpaceRef.current.style.width <= '480px' || tableSpaceRef.current.style.width >= '810px') {
    //   onMouseUp();
    // }
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      isShowViewMailSpace &&
      dragBarSide.current &&
      containerRef.current &&
      tableSpaceRef.current &&
      viewMailRef.current &&
      headerTableRef.current !== null
    ) {
      dragBarSide.current.style.left = `${window.innerWidth / 2 - 45}px`;
      dragBarSide.current.addEventListener('mousedown', onMouseDown);
      dragBarSide.current.addEventListener('mouseup', onMouseUp);
      if (containerRef.current !== null) {
        containerRef.current.addEventListener('mousemove', onMouseMove);
      }

      // return () => {
      //   dragBarSide.current.removeEventListener('mousedown', onMouseDown);
      //   dragBarSide.current.removeEventListener('mouseup', onMouseUp);
      //   // @ts-ignore
      //   containerRef.current?.removeEventListener('mousemove', onMouseMove);
      // };
    }
  }, [isShowViewMailSpace]);

  const widthTableMail = useMemo(() => {
    if (tableSpaceRef.current) {
      return tableSpaceRef.current.style.width;
    }
    return 'w/1/2';
  }, [tableSpaceRef.current]);

  return (
    <div
      className={twMerge('h-full w-full text-center', isShowViewMailSpace && 'relative flex overflow-hidden')}
      ref={containerRef}
    >
      <div className={twMerge('h-full w-full pt-14', isShowViewMailSpace && 'w-1/2')} ref={tableSpaceRef}>
        <div className={twMerge('', tableSpaceRef.current && `w-${tableSpaceRef.current.style.width}`)}>
          <HeaderMailTable
            isShowViewMailSpace={isShowViewMailSpace}
            ref={headerTableRef}
            widthHeader={widthTableMail}
            actionArray={['datetime']}
            isShowShadow={isShowShadow}
            isShowCheckboxHeader={isShowViewMailSpace}
            isChecked={isChecked}
            onClickSelectAll={handleSelectAll}
            onClickNextButton={handleClickNextButton}
            onClickPrevButton={handleClickPrevButton}
            onCloseViewMailSpace={() => {
              setIsShowViewMailSpace(false);
              setSelectedMail({} as MailType);
            }}
          />
        </div>
        <MailTable
          isLoading={isLoading}
          data={sentMailData}
          onChangeShowShadow={setIsShowShadow}
          onChangeSelectRows={handleSelectRows}
          onClickShowMail={handleSelectMail}
          selectRows={selectRows}
          emptyComponent={
            <EmptyData message={t('drafts_empty_message')} desription={t('drafts_empty_description')} />
          }
        />
      </div>
      {isShowViewMailSpace && (
        <>
          <div className="absolute h-full w-1 cursor-col-resize shadow-shadowLeft" ref={dragBarSide}>
            {' '}
          </div>
          <div className="flex-1 bg-white" ref={viewMailRef}>
            <ViewMailSpace handleClose={handleClose} mailData={selectedMail} />
          </div>
        </>
      )}
    </div>
  );
};
export default SentTable;
