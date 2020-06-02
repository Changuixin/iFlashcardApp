import { Component, OnInit } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

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
      url: '/folder/myDeck',
      icon: 'list',
    },
    {
      title: '牌组仓库',
      url: '/folder/deck',
      icon: 'briefcase',
    },
    {
      title: '统计',
      url: '/folder/statistics',
      icon: 'stats-chart',
    },
  ]
  public others = [
    {
      title: '分享',
      url: '/folder/share',
      icon: 'share-social',
    },
    {
      title: '帮助',
      url: '/folder/help',
      icon: 'help',
    },
    {
      title: '反馈',
      url: '/folder/feedback',
      icon: 'chatbubble',
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
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
