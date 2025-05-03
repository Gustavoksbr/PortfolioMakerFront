// image.service.ts
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private baseUrl = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) {}

  upload(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, form, { responseType: 'text' });
  }

  getAllImages() {
    return this.http.get<{id: string, name: string}[]>(`${this.baseUrl}/all`);
  }

  download(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'blob' });
  }
}
