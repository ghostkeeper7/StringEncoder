import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public inputText: string;
  public outputText: string;

  public isInputDisabled: boolean = false;
  private url = 'https://localhost:8000/StringEncoder/';

  constructor(private http: HttpClient) { }

  async encodeText() {
    this.outputText = '';
    this.isInputDisabled = true;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    
    const body = JSON.stringify(this.inputText);

    const response = await fetch(this.url, {
      method: 'POST',
      headers: headers,
      body: body,
    });


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      this.outputText += new TextDecoder().decode(value);
      
    }
    this.outputText += '\nEncoding Complete!';
    this.isInputDisabled = false;
  }

  cancelProcess() {
    this.http.delete(this.url).subscribe(() => {
      this.isInputDisabled = false;
      this.outputText += '\nEncoding Cancelled';
    });
  }

  title = 'StringEncoderUI';
}


