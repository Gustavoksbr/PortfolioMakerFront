import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MostrarPortfolioComponent } from './mostrar-portfolio.component';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { AuthService } from '../../../services/autenticacao/auth.service';
import { Portfolio } from '../../../models/response/Portfolio';
import { criarPortfolioRequest } from '../../../models/request/PortfolioRequest';

// =======================
// Mocks dos serviços
// =======================
class MockPortfolioService {
  mostrarPortfolioPorUsername = jasmine.createSpy().and.returnValue(of({ username: 'teste', nome: 'Usuário Teste' } as Portfolio));
  savePortfolio = jasmine.createSpy().and.returnValue(of({ username: 'teste', nome: 'Usuário Teste' } as Portfolio));
  listar = jasmine.createSpy();
}

class MockAuthService {
  getStorage = jasmine.createSpy().and.returnValue('email@teste.com');
}

class MockRouter {
  navigate = jasmine.createSpy();
}

class MockToastr {
  success = jasmine.createSpy();
}

describe('MostrarPortfolioComponent', () => {
  let component: MostrarPortfolioComponent;
  let fixture: ComponentFixture<MostrarPortfolioComponent>;
  let service: MockPortfolioService;
  let router: MockRouter;
  let toastr: MockToastr;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPortfolioComponent],
      providers: [
        { provide: PortfolioService, useClass: MockPortfolioService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useClass: MockToastr },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({}),
            snapshot: { url: [{ path: 'portfolios' }, { path: 'teste' }] }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MostrarPortfolioComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PortfolioService) as unknown as MockPortfolioService;
    router = TestBed.inject(Router) as unknown as MockRouter;
    toastr = TestBed.inject(ToastrService) as unknown as MockToastr;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com portfolio carregado', () => {
    component.ngOnInit();
    expect(service.mostrarPortfolioPorUsername).toHaveBeenCalled();
    expect(component.portfolio.username).toBe('teste');
  });

  it('deve navegar para home ao chamar irParaHome()', () => {
    component.irParaHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('deve abrir modal de salvar quando houver alterações', () => {
    component.portfolioNovo = { ...component.portfolioNovo, nome: 'Novo Nome' };
    component.abrirModalSalvar();
    expect(component.modal.isOpen).toBeTrue();
    expect(component.modal.salvarAlteracoes).toBeTrue();
  });

  it('deve reverter alterações ao cancelar salvamento', () => {
    spyOn<any>(component, 'reverterAlteracoes').and.callThrough();
    component.sairCancelandoOuSalvando(false);
    expect(component['reverterAlteracoes']).toHaveBeenCalled();
    expect(component.editando).toBeFalse();
  });

  it('deve salvar alterações com sucesso', () => {
    component.portfolioNovo = criarPortfolioRequest({ ...component.portfolio, username: 'teste', nome: 'Usuário Teste' });
    component.sairCancelandoOuSalvando(true);

    expect(service.savePortfolio).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/portfolios/', 'teste']);
    expect(toastr.success).toHaveBeenCalledWith(
      'Portfólio salvo com sucesso!',
      'Sucesso',
      jasmine.any(Object)
    );
  });

});
