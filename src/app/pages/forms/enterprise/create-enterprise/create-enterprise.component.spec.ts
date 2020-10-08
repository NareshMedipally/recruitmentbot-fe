import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnterpriseComponent } from './create-enterprise.component';

describe('CreateEnterpriseComponent', () => {
  let component: CreateEnterpriseComponent;
  let fixture: ComponentFixture<CreateEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
