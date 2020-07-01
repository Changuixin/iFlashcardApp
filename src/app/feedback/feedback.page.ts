import { Component, OnInit } from '@angular/core'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  public subject: string
  public body: string

  constructor(private socialSharing: SocialSharing) {}

  ngOnInit() {}

  sendEmail() {
    console.log(this.body);
    
    this.socialSharing
      .shareViaEmail(this.body, this.subject, ['591764955@qq.com'])
      .then(() => {
        // Success!
      })
      .catch(() => {
        // Error!
      })
  }
}
