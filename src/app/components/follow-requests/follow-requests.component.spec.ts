import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowRequestsComponent } from './follow-requests.component';

describe('FollowRequestsComponent', () => {
  let component: FollowRequestsComponent;
  let fixture: ComponentFixture<FollowRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
