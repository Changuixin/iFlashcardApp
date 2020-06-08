import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public baseUrl: string = 'http://39.97.117.164:8889'

  constructor(private httpClient: HttpClient) {}

  /**
   * 根据用户名和密码进行登录，未注册则自动注册登录
   *
   * @param {string} username
   * @param {string} password
   */
  login(username: string, password: string) {
    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    return this.httpClient.request('post', this.baseUrl + '/login', {
      body: formData,
    })
  }

  /**
   * 获取牌组列表
   *
   * @param userId
   */
  getDeckList(userId: number) {
    return this.httpClient.request('get', this.baseUrl + `/deck/list/${userId}`)
  }

  /**
   * 添加牌组
   *
   * @param deckName 牌组名称
   */
  addDeck(deckName: string) {
    let formData = new FormData()
    formData.append('deckName', deckName)

    return this.httpClient.request(
      'post',
      this.baseUrl + '/deck/' + localStorage['userId'],
      {
        body: formData,
      }
    )
  }

  /**
   * 删除牌组
   *
   * @param deckId 牌组id
   * @param userId 用户id
   */
  deleteDeck(deckId: number, userId: number) {
    let formData = new FormData()
    formData.append('userId', userId.toString())
    return this.httpClient.request('delete', this.baseUrl + `/deck/${deckId}`, {
      body: formData,
    })
  }

  /**
   * 修改牌组：修改某一个牌组的名称
   *
   * @param deckId 牌组id：需要修改的牌组
   * @param deckName 新的牌组名称
   */
  modifyDeck(deckId: number, deckName: string) {
    let formData = new FormData()
    formData.append('deckName', deckName)

    return this.httpClient.request('put', this.baseUrl + `/deck/${deckId}`, {
      body: formData,
    })
  }

  /**
   * 收藏牌组
   *
   * @param deckId 牌组id：被用户收藏的牌组
   * @param userId 用户id：标记收藏的用户
   */
  collectDeck(deckId: number, userId: number) {
    let formData = new FormData()
    formData.append('userId', userId.toString())
    return this.httpClient.request(
      'post',
      this.baseUrl + `/deck/collect/${deckId}`,
      { body: formData }
    )
  }

  /**
   * 获取卡片列表
   *
   * @param deckId 卡片所属的牌组
   */
  getCardList(deckId: number) {
    return this.httpClient.request('get', this.baseUrl + `/card/list/${deckId}`)
  }

  /**
   * 添加卡片
   *
   * @param problem 卡片问题：正面字段
   * @param answer 卡片答案：背面字段
   * @param deckId 牌组id：标记存放卡片的牌组
   */
  addCard(problem: string, answer: string, deckId: number) {
    let formData = new FormData()
    formData.append('problem', problem)
    formData.append('answer', answer)
    formData.append('deckId', deckId.toString())
    return this.httpClient.request('post', this.baseUrl + `/card`, {
      body: formData,
    })
  }

  /**
   * 修改卡片：修改问题或者答案字段
   *
   * @param cardId 卡片id
   * @param problem 卡片问题：正面
   * @param answer 卡片答案：背面
   */
  modifyCard(cardId: number, problem: string, answer: string) {
    let formData = new FormData()
    formData.append('problem', problem)
    formData.append('answer', answer)

    return this.httpClient.request('put', this.baseUrl + `/card/${cardId}`, {
      body: formData,
    })
  }

  /**
   * 删除卡片：删除数据库中的卡片，也删除卡片和牌组的关联
   *
   * @param cardId 卡片id
   */
  deleteCard(cardId: number) {
    return this.httpClient.request('delete', this.baseUrl + `/card/${cardId}`)
  }

  /**
   * 根据flag类型上传卡片状态，true为记住卡片，false为忘记卡片
   *
   * @param cardId 卡片id
   * @param flag 卡片状态标志
   */
  public submitCardStatus(cardId: number, flag: boolean) {
    let formData = new FormData()
    formData.append('flag', flag.toString())

    return this.httpClient.request('post', this.baseUrl + `/card/flag/${cardId}`, {
      body: formData,
    })
  }
}
