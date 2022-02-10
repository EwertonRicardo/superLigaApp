import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(
    private fileOpener: FileOpener,
    private http: HttpClient,
  ) { }


  async downloadFile(fileUrl: string): Promise<void> {
    try {

      const fileResponse = await this.http.get(fileUrl, { responseType: 'blob' }).toPromise();

      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
      const base64 = await this.convertBlobToBase64(fileResponse) as string;

      const foo = await Filesystem.writeFile({
        path: 'application.pdf',
        data: base64,
        directory: Directory.Documents,
      });

      const mimeType = this.getMimeType(fileName);

      this.fileOpener.open(foo.uri, mimeType)
        .then(() => console.log('File is opened'))
        .catch(error => console.log('Error opening file', error));

    } catch (error) {
      throw error;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);

    reader.readAsDataURL(blob);
  });

  private getMimeType = (name: string): string => {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf';
    }

    if (name.indexOf('png') >= 0) {
      return 'image/png';
    }
  }
}
