import { Component, OnInit } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Keyboard } from '@ionic-native/keyboard/ngx'
import { AppMinimize } from '@ionic-native/app-minimize/ngx'
import { HttpService } from './service/http.service'
import { Router } from '@angular/router'
import { MessageService } from './service/message.service'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0
  public appPages = [
    {
      title: '我的牌组',
      url: '/v1/folder/my-deck',
      icon: 'list',
    },
    {
      title: '牌组仓库',
      url: '/v1/folder/decks',
      icon: 'briefcase',
    },
    {
      title: '统计',
      url: '/v1/folder/statistics',
      icon: 'stats-chart',
    },
  ]
  public others = [
    {
      title: '帮助',
      url: 'v1/folder/help',
      icon: 'help',
    },
    {
      title: '反馈',
      url: 'v1/folder/feedback',
      icon: 'chatbubble',
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private keyboard: Keyboard,
    private appMinimize: AppMinimize,
    private httpService: HttpService,
    private router: Router,
    private msgService: MessageService,
    private socialSharing: SocialSharing,
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.statusBar.styleLightContent()
      this.splashScreen.hide()

      this.registerBackButtonAction()
    })
    this.autoLogin()
  }

  share() {
    this.socialSharing
      .share(
        'iFlashcard软件分享',
        null,
        null,
        'http://47.110.159.12/download/img/iFlashcard.apk'
      )
      .then(() => {
        // Success!
      })
      .catch(() => {
        // Error!
      })
  }

  logout(){
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    this.router.navigateByUrl('/v1/login', {
      replaceUrl: true,
    })
  }

  autoLogin() {
    if (localStorage['username'] == null || localStorage['password'] == null) {
      return this.router.navigateByUrl('/v1/login', {
        replaceUrl: true,
      })
    }

    this.httpService
      .login(localStorage['username'], localStorage['password'])
      .subscribe(
        (res) => {
          if (res['meta']['status'] == '200') {
            localStorage['userId'] = res['data']['userId']

            this.msgService.presentToast('自动登录成功')
            return this.router.navigate(['/v1/folder/my-deck'], {
              replaceUrl: true,
            })
          }
          return this.router.navigateByUrl('/v1/login', {
            replaceUrl: true,
          })
        },
        (err) => {
          return this.router.navigateByUrl('/v1/login', {
            replaceUrl: true,
          })
        }
      )
  }

  registerBackButtonAction() {
    this.platform.backButton.subscribe(() => {
      if (this.keyboard.isVisible) {
        return this.keyboard.hide()
      }

      if (/login/.test(this.platform.url())) {
        return this.appMinimize.minimize()
      }

      if (/folder/.test(this.platform.url())) {
        return this.appMinimize.minimize()
      }

      return history.back()
    })
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1]
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      )
    }
  }
}
