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
      .share('iFlashcard分享测试')
      .then(() => {
        // Success!
      })
      .catch(() => {
        // Error!
      })
  }
}
