import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from '../service/store.service';
import { StoreRepository } from '../repositories/store.repository';
import { ViaCepService } from 'src/core/services/viacep.service';
import { GoogleMapsService } from 'src/core/services/google-maps.service';
import { MelhorEnvioService } from 'src/core/services/melhor-envio.service';

describe('StoreService', () => {
  let service: StoreService;

  const mockCepService = {
    getAddressByCep: jest.fn().mockResolvedValue({
      logradouro: 'Rua Teste',
      localidade: 'São Paulo',
      uf: 'SP',
    }),
  };

  const mockMapsService = {
    getCoordinatesFromAddress: jest.fn().mockResolvedValue({ lat: -23.55, lng: -46.63 }),
    calculateDistance: jest.fn().mockResolvedValue(45),
  };

  const mockMelhorEnvioService = {
    getFreight: jest.fn().mockResolvedValue([
      {
        delivery_time: 2,
        id: '04014',
        price: '27,00',
        name: 'Sedex',
      },
    ]),
  };

  const mockStoreRepository = {
    findAll: jest.fn().mockResolvedValue([
      {
        storeName: 'Loja Centro',
        city: 'São Paulo',
        postalCode: '01000-000',
        type: 'PDV',
        address1: 'Av Paulista',
        state: 'SP',
        shippingTimeInDays: 1,
        latitude: '-23.56',
        longitude: '-46.64',
      },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        { provide: ViaCepService, useValue: mockCepService },
        { provide: GoogleMapsService, useValue: mockMapsService },
        { provide: MelhorEnvioService, useValue: mockMelhorEnvioService },
        { provide: StoreRepository, useValue: mockStoreRepository },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should return stores with delivery options', async () => {
    const result = await service.findByCep('01001-000');
    expect(result.stores.length).toBeGreaterThan(0);
    expect(result.stores[0].type).toBe('PDV');
    expect(result.stores[0].value[0].price).toBe('R$ 15,00');
  });
});
