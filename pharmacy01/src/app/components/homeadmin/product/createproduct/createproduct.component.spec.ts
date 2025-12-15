import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateproductComponent } from './createproduct.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('CreateproductComponent', () => {
  let component: CreateproductComponent;
  let fixture: ComponentFixture<CreateproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateproductComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
