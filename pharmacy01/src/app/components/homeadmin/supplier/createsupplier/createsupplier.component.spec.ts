import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatesupplierComponent } from './createsupplier.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('CreatesupplierComponent', () => {
  let component: CreatesupplierComponent;
  let fixture: ComponentFixture<CreatesupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatesupplierComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatesupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
