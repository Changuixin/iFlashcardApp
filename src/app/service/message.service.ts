import { Injectable } from '@angular/core'
import { ToastController, AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private toastCtrl: ToastController,
    private alertController: AlertController
  ) {}

  /**
   * 显示消息提示框，默认底部
   *
   * @param {string} msg 提示的消息
   * @param {number} duration 消息显示时长，默认2000ms，即两秒
   * @param {string} color 颜色样式，默认success
   */
  async presentToast(
    msg: string,
    duration: number = 2000,
    color: string = 'success'
  ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      color: color,
      duration: duration,
    })
    toast.present()
  }
}
