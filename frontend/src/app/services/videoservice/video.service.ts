import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { VideoInfo } from 'src/app/models/types/user.types';



interface GetUploadResponse {
  videos: VideoInfo[];
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getUploads(): Observable<GetUploadResponse> {
    const cache = localStorage.getItem('uploadsCache');
    const token = localStorage.getItem('token'); // Assuming you might have a general auth token
  

    console.log('Cached uploads:', cache);

    if (cache) {
      console.log('Returning uploads data from localStorage');
      return of(JSON.parse(cache));
    } else {
      console.log('Uploads data not found in localStorage, fetching from API');
      const url = `http://localhost:3000/Videos/${token}`; // Adjust the endpoint if needed
      const headers = token ? new HttpHeaders({
        'Authorization': `Bearer ${token}` // Use the general auth token if available
      }) : undefined;

      return this.http.get<any>(url, { headers }).pipe(
        map(response => {
          // Assuming your backend response has a 'videos' array directly
          const videos: VideoInfo[] = response.videos;
          return { videos };
        }),
        tap(response => {
          localStorage.setItem('uploadsCache', JSON.stringify(response.videos));
        })
      );
    }
  }

  getAVideo(){

  }
}