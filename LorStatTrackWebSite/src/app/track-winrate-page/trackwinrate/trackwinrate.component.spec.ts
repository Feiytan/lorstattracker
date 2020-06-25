import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackwinrateComponent } from './trackwinrate.component';

describe('TrackwinrateComponent', () => {
  let component: TrackwinrateComponent;
  let fixture: ComponentFixture<TrackwinrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackwinrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackwinrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
