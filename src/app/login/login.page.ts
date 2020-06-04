import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from '../service/message.service'
import { HttpService } from '../service/http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public username: string
  public password: string

  constructor(
    public router: Router,
    public msgService: MessageService,
    public httpService: HttpService
  ) {}

  login() {
    this.httpService.login(this.username, this.password).subscribe((res) => {
      this.msgService.presentToast(res['meta']['msg'])
      if (res['meta']['status'] == '200') {
        localStorage['username'] = res['data']['username']
        localStorage['userId'] = res['data']['userId']
        this.router.navigate(['/v1/folder/my-deck'])
      }
    })
  }
}
