import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadStatus: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      this.uploadStatus = 'Please select a file first.';
      return;
    }

    const formData = new FormData();
    formData.append('media', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:3000/media/upload', formData)
      .subscribe(
        (response) => {
          console.log(response);
          this.uploadStatus = 'File uploaded successfully!';
        },
        (error) => {
          console.error(error);
          this.uploadStatus = 'Error uploading file.';
        }
      );
  }
}
