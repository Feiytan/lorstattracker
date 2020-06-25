import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWinratePageComponent } from './track-winrate-page.component';

describe('TrackWinratePageComponent', () => {
  let component: TrackWinratePageComponent;
  let fixture: ComponentFixture<TrackWinratePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWinratePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWinratePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
