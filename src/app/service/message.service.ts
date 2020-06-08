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
      animated: false,
    })
    toast.present()
  }

  /**
   * 一个带输入框的alert
   *
   * @param header 标题
   * @param placeholder 输入框的提示文字
   * @param confirmCallback 确认按钮的回调函数
   * @param cancelCallback 取消按钮的回调函数
   */
  async presentAlertPrompt(
    header: string,
    placeholder: string = '',
    confirmCallback: any = () => {},
    cancelCallback: any = () => {},
    defaultValue: string = null
  ) {
    const alert = await this.alertController.create({
      header: header,
      inputs: [
        {
          name: 'data',
          type: 'text',
          placeholder: placeholder,
          value: defaultValue,
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: cancelCallback(),
        },
        {
          text: '确定',
          handler: (res) => confirmCallback(res),
        },
      ],
    })

    await alert.present()
  }
}
