import { uploadImage } from '../../../../app/Services/UploadService';

class UploadAdaptor {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    return this.loader.file.then(async (file) => {
      return uploadImage(file, 'mailbox').then((data) => {
        return { default: data.absolute_slug };
      });
    });
  }
}

export { UploadAdaptor };
