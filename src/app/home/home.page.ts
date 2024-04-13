import { Component } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  segment = 'generate';
  qrText = 'https://debugploy.com/';

  constructor() {}

  captureScreen() {

    const qrContainer = document.getElementById("qrScreenshot") as HTMLElement;

    html2canvas(qrContainer).then((canvas: HTMLCanvasElement) => {
      this.downloadImage(canvas);
    });
    
  }

  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }
}
