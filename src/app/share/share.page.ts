import { Component, OnInit } from '@angular/core'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
  constructor(private socialSharing: SocialSharing) {}

  ngOnInit() {}

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
}
