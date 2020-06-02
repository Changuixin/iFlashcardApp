import { Component, OnInit } from '@angular/core'
import { HttpService } from '../service/http.service'

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
      id: 1,
      name: '软件需求分析',
    },
    {
      id: 2,
      name: '线性代数',
    },
    {
      id: 3,
      name: '近现代史',
    },
    {
      id: 4,
      name: '太极运动',
    },
    {
      id: 5,
      name: '高数',
    },
    {
      id: 6,
      name: '毛概',
    },
    {
      id: 7,
      name: '考研英语',
    },
  ]
  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getDeckList()
  }

  // 学习牌组
  learnDeck() {
    this.httpService.getCardList()
  }

  // 添加牌组
  addDeck() {
    this.httpService.addDeck()
    this.httpService.getDeckList()
  }
}
