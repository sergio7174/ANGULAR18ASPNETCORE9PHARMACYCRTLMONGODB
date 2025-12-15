import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeadminComponent } from './homeadmin.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('HomeadminComponent', () => {
  let component: HomeadminComponent;
  let fixture: ComponentFixture<HomeadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeadminComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
