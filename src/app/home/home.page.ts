import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  segment = 'scan';
  qrText = 'https://debugploy.com/';

  constructor(
    private loadingController: LoadingController,
    private platfom: Platform
  ) {}

  captureScreen() {

    const qrContainer = document.getElementById("qrScreenshot") as HTMLElement;

    html2canvas(qrContainer).then((canvas: HTMLCanvasElement) => {
      if (this.platfom.is('capacitor')) this.shareImageMobile(canvas);
      else this.downloadImage(canvas);
    });
    
  }

  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  async shareImageMobile(canvas: HTMLCanvasElement){
    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {

      let uri = res.uri;
      await Share.share({
        url: uri,
      });
      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache,
      });
    }).finally(() => {
      loading.dismiss();
    });
  }
}
