import { Component, OnInit } from '@angular/core'
import { HttpService } from '../service/http.service'
import { MessageService } from '../service/message.service'

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {
  public COL_NUM: number = 3
  public SCREEN_WIDTH: number = screen.width
  public commonDeckList: any = []
  public deckList: any = []
  constructor(
    public httpService: HttpService,
    public msgService: MessageService
  ) {}

  ngOnInit() {
    this.getCommonDeckList()
    this.getDeckList()
  }

  // 翻转，如果用户已经收藏，则取消收藏；未收藏，则收藏牌组
  flip(deckId: number) {
    this.httpService.collectDeck(deckId, localStorage['userId']).subscribe(
      (res) => {
        if (res['meta']['status'] == '200') {
          this.getDeckList()
          if (this.isCollection(deckId) == true) {
            return this.msgService.presentToast('取消收藏')
          }
          return this.msgService.presentToast('收藏成功')
        }
      },
      (err) => {
        this.msgService.presentToast('操作失败', 2000, 'danger')
      }
    )
  }

  // 判断用户是否收藏
  isCollection(deckId: number) {
    for (let i = 0; i < this.deckList.length; i++) {
      if (deckId == this.deckList[i].deckId) {
        return true
      }
    }
    return false
  }

  // 获取牌组列表
  getDeckList() {
    this.httpService.getDeckList(localStorage['userId']).subscribe((res) => {
      if (res['meta']['status'] == '200') {
        return (this.deckList = res['data'])
      }
      return (this.deckList = [])
    })
  }

  // 获取牌组列表
  getCommonDeckList() {
    // 1号用户为common牌组持有者
    this.httpService.getDeckList(1).subscribe((res) => {
      if (res['meta']['status'] == '200') {
        return (this.commonDeckList = res['data'])
      }
      return (this.commonDeckList = [])
    })
  }
}
