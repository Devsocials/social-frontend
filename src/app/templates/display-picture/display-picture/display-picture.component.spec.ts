import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPictureComponent } from './display-picture.component';

describe('DisplayPictureComponent', () => {
  let component: DisplayPictureComponent;
  let fixture: ComponentFixture<DisplayPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayPictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
