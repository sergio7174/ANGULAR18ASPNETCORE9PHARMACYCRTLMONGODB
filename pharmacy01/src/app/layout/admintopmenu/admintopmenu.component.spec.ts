import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmintopmenuComponent } from './admintopmenu.component';
import { provideRouter } from '@angular/router';
// Http testing module and mocking controller
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('AdmintopmenuComponent', () => {
  let component: AdmintopmenuComponent;
  let fixture: ComponentFixture<AdmintopmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmintopmenuComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmintopmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
