import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListcategoryComponent } from './listcategory.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('ListcategoryComponent', () => {
  let component: ListcategoryComponent;
  let fixture: ComponentFixture<ListcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListcategoryComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and initialize correctly: ', fakeAsync(() => {

    // Spy on ngOnInit before detectChanges
    spyOn(component, 'ngOnInit').and.callThrough(); 
    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component.ngOnInit).toHaveBeenCalled();

}));


});
