import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

interface ApiResponse {
  message?: string;
  data?: any;
  timestamp?: string;
  error?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CICD-ABCD Demo';
  apiResponse: string = '';
  loading: boolean = false;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async testHelloEndpoint() {
    this.loading = true;
    this.apiResponse = '';
    
    try {
      const response = await this.http.get<ApiResponse>(`${this.apiUrl}/api/hello`).toPromise();
      this.apiResponse = JSON.stringify(response, null, 2);
    } catch (error: any) {
      this.apiResponse = `Error: ${error.message || 'Failed to fetch'}`;
    } finally {
      this.loading = false;
    }
  }

  async testUserEndpoint() {
    this.loading = true;
    this.apiResponse = '';
    
    try {
      const response = await this.http.get<ApiResponse>(`${this.apiUrl}/api/getUser?id=123`).toPromise();
      this.apiResponse = JSON.stringify(response, null, 2);
    } catch (error: any) {
      this.apiResponse = `Error: ${error.message || 'Failed to fetch'}`;
    } finally {
      this.loading = false;
    }
  }

  async testDataEndpoint() {
    this.loading = true;
    this.apiResponse = '';
    
    try {
      const response = await this.http.get<ApiResponse>(`${this.apiUrl}/api/getData`).toPromise();
      this.apiResponse = JSON.stringify(response, null, 2);
    } catch (error: any) {
      this.apiResponse = `Error: ${error.message || 'Failed to fetch'}`;
    } finally {
      this.loading = false;
    }
  }

  async testPostEndpoint() {
    this.loading = true;
    this.apiResponse = '';
    
    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Testing the POST endpoint!'
    };
    
    try {
      const response = await this.http.post<ApiResponse>(`${this.apiUrl}/api/submitData`, testData).toPromise();
      this.apiResponse = JSON.stringify(response, null, 2);
    } catch (error: any) {
      this.apiResponse = `Error: ${error.message || 'Failed to post data'}`;
    } finally {
      this.loading = false;
    }
  }
}

