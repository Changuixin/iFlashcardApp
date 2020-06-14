import { Component, OnInit } from '@angular/core'
import { HttpService } from '../service/http.service'
import { MessageService } from '../service/message.service'
import { ActionSheetController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-my-deck',
  templateUrl: './my-deck.page.html',
  styleUrls: ['./my-deck.page.scss'],
})
export class MyDeckPage implements OnInit {
  public COL_NUM: number = 3
  public SCREEN_WIDTH: number = screen.width
  public deckList: any = [
    {
      deckId: 1,
      deckName: '软件需求分析',
    },
    {
      deckId: 2,
      deckName: '线性代数',
    },
    {
      deckId: 3,
      deckName: '近现代史',
    },
  ]
  constructor(
    public httpService: HttpService,
    public msgService: MessageService,
    public actionSheetController: ActionSheetController,
    public router: Router
  ) {}

  ngOnInit() {
    this.getDeckList()
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getDeckList()
      event.target.complete()
    }, 1000)
  }

  // 获取牌组列表
  getDeckList() {
    this.httpService.getDeckList(localStorage['userId']).subscribe((res) => {
      console.log(res)

      if (res['meta']['status'] == '200') {
        return (this.deckList = res['data'])
      }
      return this.msgService.presentToast('获取牌组信息失败', 2000, 'danger')
    })
  }

  async deckMenu(deckId: number, deckName: string) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '删除牌组',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.deleteDeck(deckId),
        },
        {
          text: '修改牌组',
          icon: 'pencil',
          handler: () => {
            this.msgService.presentAlertPrompt(
              '修改牌组',
              '请输入牌组名称',
              (res) => {
                let newDeckName = res.data
                this.modifyDeck(deckId, newDeckName)
              },
              () => {},
              deckName
            )
          },
        },
      ],
    })
    await actionSheet.present()
  }

  // 学习牌组
  learnDeck(deckId: number) {
    this.msgService.presentToast('开始学习卡片', 1000)
    this.router.navigateByUrl(`/v1/card/${deckId}`)
  }

  // 添加牌组
  addDeck() {
    this.msgService.presentAlertPrompt('添加牌组', '请输入牌组名称', (res) => {
      let deckName = res.data

      this.httpService.addDeck(deckName).subscribe(
        (res) => {
          if (res['meta']['status'] == '200') {
            this.msgService.presentToast('添加成功', 2000, 'success')
            return this.getDeckList()
          }
          this.msgService.presentToast('添加失败', 2000, 'danger')
        },
        () => {
          this.msgService.presentToast('添加失败', 2000, 'danger')
        }
      )
    })
  }

  // 删除牌组
  deleteDeck(deckId: number) {
    this.httpService.deleteDeck(deckId, localStorage['userId']).subscribe(
      (res) => {
        if (res['meta']['status'] == '200') {
          this.msgService.presentToast('删除成功', 2000, 'success')
          return this.getDeckList()
        }
        this.msgService.presentToast('删除失败', 2000, 'danger')
      },
      () => {
        this.msgService.presentToast('删除失败', 2000, 'danger')
      }
    )
  }

  // 修改牌组名称
  modifyDeck(deckId: number, deckName: string) {
    this.httpService.modifyDeck(deckId, deckName).subscribe(
      (res) => {
        if (res['meta']['status'] == '200') {
          this.msgService.presentToast('修改成功', 2000, 'success')
          return this.getDeckList()
        }
        this.msgService.presentToast('修改失败', 2000, 'danger')
      },
      () => {
        this.msgService.presentToast('修改失败', 2000, 'danger')
      }
    )
  }
}
