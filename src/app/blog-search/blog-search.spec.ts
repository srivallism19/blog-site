import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSearch } from './blog-search';

describe('BlogSearch', () => {
  let component: BlogSearch;
  let fixture: ComponentFixture<BlogSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
