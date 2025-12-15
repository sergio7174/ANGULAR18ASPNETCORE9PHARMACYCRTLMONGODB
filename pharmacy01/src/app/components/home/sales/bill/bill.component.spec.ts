import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillComponent } from './bill.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastNoAnimationModule } from 'ngx-toastr';

describe('BillComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillComponent, ToastrModule.forRoot(), ToastNoAnimationModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title: Pharmacy Control', () => {
    const fixture = TestBed.createComponent(BillComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#pharmacyControl')?.textContent).toContain('Pharmacy Control');
  });


});
