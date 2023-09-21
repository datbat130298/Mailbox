import React, { useMemo } from 'react';
import CKEditor5 from '../../CKEditor5/CKEditor5';

const editorConfiguration = {
  toolbar: {
    items: [
      'undo',
      'redo',
      // 'heading',
      // 'fontsize',
      // 'fontfamily',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      // 'fontColor',
      // 'fontBackgroundColor',
      '|',
      'alignment:left',
      // 'alignment:right',
      // 'alignment:center',
      // 'alignment:justify',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
      '|',
      // 'link',
      // 'imageUpload',
      // 'mediaEmbed',
      // 'blockQuote',
      'insertTable',
    ],
    shouldNotGroupWhenFull: false,
  },
  mediaEmbed: {
    extraProviders: [
      {
        name: 'mp4',
        url: /(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp4)/,
        html: (match) => `
            <figure class="media">
              <video height="100%" width="100%" controls>
                <source src="${String(match[0])}" type="video/mp4">
              </video>
            </figure>
          `,
      },
      {
        name: 'mp3',
        url: /(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp3)/,
        html: (match) => `
            <audio controls>
              <source src="${String(match[0])}" type="audio/mpeg">
            </audio>
          `,
      },
    ],
    previewsInData: true,
    forceVisible: false,
  },
};

const WriterCompose = ({
  data,
  handleChangeEditor,
  handleChangeBlur,
  isLoading,
  isDisabled,
  id,
  isShowToolbar,
}) => {
  const render = useMemo(() => {
    return (
      <div className="h-full w-full text-sm" id={id}>
        <CKEditor5
          isShowToolbar={isShowToolbar}
          config={editorConfiguration}
          data={data}
          onChange={handleChangeEditor}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onBlur={handleChangeBlur}
        />
      </div>
    );
  }, [data]);
  return render;
};
export default React.memo(WriterCompose);
