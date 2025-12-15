import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { provideRouter } from '@angular/router';
// Http testing module and mocking controller
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
     
        
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



it('should trigger the click event, when you press on the cart image -like a button', (() => {

spyOn(component, 'onGoCart').and.callFake(() => null);
 const button = fixture.debugElement.query(
  (val) => val.attributes['id'] === 'cart'
);
 
 button.triggerEventHandler('click', {}); // Call triggerEventHandler on DebugElement
  fixture.detectChanges(); // Trigger change detection

 expect(button).toBeTruthy();
 expect(component.onGoCart).toHaveBeenCalled();
}));




});
