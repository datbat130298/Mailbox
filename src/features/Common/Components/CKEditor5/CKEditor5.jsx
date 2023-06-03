import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import _ from 'lodash';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import './CKEditor.scss';
import { UploadAdaptor } from './UploadAdaptor';

const editorConfiguration = {
  toolbar: {
    items: [
      'undo',
      'redo',
      'heading',
      'fontsize',
      'fontfamily',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'alignment:justify',
      '|',
      // 'bulletedList',
      // 'numberedList',
      'outdent',
      'indent',
      '|',
      'link',
      'imageUpload',
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
  },
  toolbarLocation: 'bottom',
};

const CKEditor5 = ({
  config = editorConfiguration,
  data = '',
  onChange,
  onBlur,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isLoading,
  isDisabled,
  isRadiousToolbar = false,
}) => {
  const editWriter = (editor) => {
    if (editor) {
      editor?.editing?.view.focus();
      editor?.ui
        ?.getEditableElement()
        ?.parentElement?.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
      /* eslint no-param-reassign: "error" */
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new UploadAdaptor(loader);
      const toolbarElement = editor.ui.view.toolbar.element;
      toolbarElement.style.height = '40px';
      toolbarElement.style.width = 'fit-content';
      toolbarElement.style.borderLeft = 'none';
      toolbarElement.style.borderRight = 'none';
      toolbarElement.style.borderTop = 'none';
      toolbarElement.style.borderTopLeftRadius = isRadiousToolbar && '6px';
      toolbarElement.style.borderTopRightRadius = isRadiousToolbar && '6px';
    }
  };

  const render = useMemo(() => {
    return (
      <div className={twMerge('relative h-full w-full')}>
        <CKEditor
          editor={DecoupledEditor}
          data={data}
          config={config}
          disabled={isDisabled}
          onReady={(editor) => editWriter(editor)}
          onChange={_.debounce((_event, editor) => {
            onChange?.(editor.getData());
          }, 500)}
          onBlur={(event, editor) => {
            onBlur?.(editor.getData());
          }}
        />
      </div>
    );
  }, [isRadiousToolbar, data, onChange, onBlur]);

  return render;
};
export default CKEditor5;
