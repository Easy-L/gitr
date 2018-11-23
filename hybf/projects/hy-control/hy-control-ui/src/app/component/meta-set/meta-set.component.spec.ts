import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaSetComponent } from './meta-set.component';

describe('MetaSetComponent', () => {
  let component: MetaSetComponent;
  let fixture: ComponentFixture<MetaSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
