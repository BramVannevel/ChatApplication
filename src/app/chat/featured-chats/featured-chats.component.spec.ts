import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedChatsComponent } from './featured-chats.component';

describe('FeaturedChatsComponent', () => {
  let component: FeaturedChatsComponent;
  let fixture: ComponentFixture<FeaturedChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
