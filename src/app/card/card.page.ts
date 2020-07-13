import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from '../service/message.service'
import { HttpService } from '../service/http.service'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  public SCREEN_HEIGHT: number = screen.height
  public cardList: any = [
    {
      problem: '',
      answer: '',
    },
  ]
  public deckId: number
  public position: number = 0
  public isShowAnswer: boolean = false
  constructor(
    public activatedRoute: ActivatedRoute,
    public msgService: MessageService,
    public httpService: HttpService,
    public alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.deckId = param.deckId
    })
    this.getCardList()
  }

  getField(field: string) {
    if (this.cardList == null) {
      return
    }

    try {
      return this.cardList[this.position][field]
    } catch (err) {
      return ''
    }
  }

  getCardList() {
    this.httpService.getCardList(this.deckId).subscribe((res) => {
      console.log(res)

      if (res['meta']['status'] == '200') {
        let resCardList = res['data']['cardList']

        // 检索出需要复习的卡片
        let cardList = []
        for (let i = 0; i < resCardList.length; i++) {
          if (resCardList[i].lastReview == null || resCardList[i].flag == false) {
            cardList.push(resCardList[i])
          } else {
            let reviewDay = new Date(resCardList[i].lastReview)
            reviewDay.setUTCDate(
              reviewDay.getUTCDate() + resCardList[i].reviewInterval
            )
            let today = new Date()
            if (today >= reviewDay) {
              cardList.push(resCardList[i])
            }
          }
        }
        this.cardList = cardList
        this.position = 0
        console.log(this.cardList)

        if(resCardList.length == null || resCardList == []){
          return this.msgService.presentToast('当前牌组没有待学习的卡片')
        }
        
        if (
          this.cardList == null ||
          this.cardList.length == 0 ||
          this.cardList == []
        ) {
          return this.msgService.presentToast('已学习完所有卡片！')
        }
      }
    })
  }

  async addCard() {
    const alert = await this.alertController.create({
      header: '添加卡片',
      inputs: [
        {
          name: 'problem',
          type: 'textarea',
          placeholder: '请输入问题',
        },
        {
          name: 'answer',
          type: 'textarea',
          placeholder: '请输入答案',
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: '确定',
          handler: (params) => {
            if (!params['problem'] || !params['answer']) {
              return this.msgService.presentToast(
                '添加失败，字段不能为空',
                2000,
                'danger'
              )
            }
            this.httpService
              .addCard(params['problem'], params['answer'], this.deckId)
              .subscribe(
                (res) => {
                  if (res['meta']['status'] == '200') {
                    this.msgService.presentToast('添加成功')
                    return this.getCardList()
                  }
                  return this.msgService.presentToast(
                    '添加失败',
                    2000,
                    'danger'
                  )
                },
                (err) => {
                  return this.msgService.presentToast(
                    '添加失败',
                    2000,
                    'danger'
                  )
                }
              )
          },
        },
      ],
    })
    alert.present()
  }

  async editCard() {
    let cardId = this.getField('cardId')
    if(cardId == null){
      return this.msgService.presentToast('当前卡牌为空')
    }

    let originProblem = this.getField('problem')
    let originAnswer = this.getField('answer')
    const alert = await this.alertController.create({
      header: '编辑卡片',
      inputs: [
        {
          name: 'problem',
          type: 'textarea',
          placeholder: '请输入问题',
          value: originProblem,
        },
        {
          name: 'answer',
          type: 'textarea',
          placeholder: '请输入答案',
          value: originAnswer,
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: '确定',
          handler: (params) => {
            if (!params['problem'] && !params['answer']) {
              return this.msgService.presentToast(
                '添加失败，字段不能为空',
                2000,
                'danger'
              )
            }

            this.httpService
              .modifyCard(cardId, params['problem'], params['answer'])
              .subscribe(
                (res) => {
                  if (res['meta']['status'] == '200') {
                    this.msgService.presentToast('编辑成功')
                    return this.getCardList()
                  }
                  return this.msgService.presentToast(
                    '编辑失败',
                    2000,
                    'danger'
                  )
                },
                (err) => {
                  return this.msgService.presentToast('编辑失败')
                }
              )
          },
        },
      ],
    })
    alert.present()
  }

  deleteCard() {
    let cardId = this.getField('cardId')
    if(cardId == null){
      return this.msgService.presentToast('当前卡牌为空')
    }
    this.httpService.deleteCard(cardId).subscribe(
      (res) => {
        if (res['meta'].status == '200') {
          this.getCardList()
          return this.msgService.presentToast('删除成功')
        }
      },
      (err) => {
        return this.msgService.presentToast('删除失败', 2000, 'danger')
      }
    )
  }

  submitCardStatus(flag: boolean) {
    this.isShowAnswer = false
    let cardId = this.getField('cardId')
    this.httpService.submitCardStatus(cardId, flag).subscribe((res) => {
      if (res['meta']['status'] == 200) {
        this.position += 1
        if (this.position == this.cardList.length) {
          this.getCardList()
          if (this.position == this.cardList) {
            this.router.navigateByUrl('/v1/folder/my-deck')
          }
        }
        // this.getCardList()
      }
    })
  }
}
