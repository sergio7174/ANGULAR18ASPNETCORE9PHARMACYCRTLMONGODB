import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsertopmenuComponent } from './usertopmenu.component';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
// Http testing module and mocking controller
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UsertopmenuComponent', () => {
  let component: UsertopmenuComponent;
  let fixture: ComponentFixture<UsertopmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsertopmenuComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsertopmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
