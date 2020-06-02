import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyDeckPage } from './my-deck.page';

describe('MyDeckPage', () => {
  let component: MyDeckPage;
  let fixture: ComponentFixture<MyDeckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDeckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
