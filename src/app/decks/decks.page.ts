import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {
  public COL_NUM: number = 3
  public SCREEN_WIDTH: number = screen.width
  public deckList: any = [
    {
      id: 11,
      name: '四六级词汇',
    },
    {
      id: 12,
      name: '近现代史',
    },
  ]
  constructor() {}

  ngOnInit() {}

  // 翻转，如果用户已经收藏，则取消收藏；未收藏，则收藏牌组
  flip(){

  }

  // 判断用户是否收藏
  isCollection(){
    return false
  }
}
