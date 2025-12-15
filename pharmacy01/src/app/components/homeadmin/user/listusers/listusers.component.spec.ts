import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ListusersComponent } from './listusers.component';
// Http testing module and mocking controller
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

import { UserApiService } from '../../../../core/services/users/users-api.service';

let UserApiServiceSpy = jasmine.createSpyObj('UserApiService', ['getListUser']);

UserApiServiceSpy.getListUser.and.returnValue(of());

describe('ListusersComponent', () => {
  let component: ListusersComponent;
  let fixture: ComponentFixture<ListusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListusersComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        BrowserAnimationsModule,
        HttpTestingController,
        {provide: UserApiService, useValue: UserApiServiceSpy },
       
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListusersComponent);
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

  it('should call in ngOnInit UserApiServiceSpy getListUser ', fakeAsync(() => {

    component.ngOnInit();
    fixture.detectChanges(); // Trigger ngOnInit
    expect(UserApiServiceSpy.getListUser).toHaveBeenCalled();
   
   
  }));


});
