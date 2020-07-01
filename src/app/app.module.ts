import { NgModule } from '@angular/core'
import { BrowserModule, HammerModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { Keyboard } from '@ionic-native/keyboard/ngx'
import { AppMinimize } from '@ionic-native/app-minimize/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

import 'hammerjs'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    AppRoutingModule,
    HttpClientModule,
    HammerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    AppMinimize,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
