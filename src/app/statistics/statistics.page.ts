import { Component, OnInit } from '@angular/core'
import { HttpService } from '../service/http.service'
import { MessageService } from '../service/message.service'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  public totalCardNumber: Number = 0
  public deckList: any = []

  constructor(
    private httpService: HttpService,
    private msgService: MessageService
  ) {}

  async ngOnInit() {
    this.getDeckList()
  }

  // 获取牌组列表
  getDeckList() {
    this.httpService.getDeckList(localStorage['userId']).subscribe((res) => {
      console.log(res)

      if (res['meta']['status'] == '200') {
        this.deckList = res['data']
        
        this.getTotalCardNumber()
      } else {
        this.msgService.presentToast('获取牌组信息失败', 2000, 'danger')
      }
    })
  }

  getTotalCardNumber() {
    setTimeout(() => {
      this.totalCardNumber = 0
      for (let index = 0; index < this.deckList.length; index++) {
        const cardNumber = this.deckList[index].cardTotal

        this.totalCardNumber += cardNumber
      }
    }, 0)
  }
}
