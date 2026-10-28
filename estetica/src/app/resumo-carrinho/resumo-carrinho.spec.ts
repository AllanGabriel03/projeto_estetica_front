import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumoCarrinho } from './resumo-carrinho';

describe('ResumoCarrinho', () => {
  let component: ResumoCarrinho;
  let fixture: ComponentFixture<ResumoCarrinho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoCarrinho],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumoCarrinho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
