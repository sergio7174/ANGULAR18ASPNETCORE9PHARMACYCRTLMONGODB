import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeadminfrontpComponent } from './homeadminfrontp.component';

describe('HomeadminfrontpComponent', () => {
  let component: HomeadminfrontpComponent;
  let fixture: ComponentFixture<HomeadminfrontpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeadminfrontpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeadminfrontpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
