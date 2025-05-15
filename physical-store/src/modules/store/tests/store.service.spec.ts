import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from '../services/store.service';
import { StoreRepository } from '../repositories/store.repository';
import { ViaCepService } from '../../../core/services/viacep.service';
import { GoogleMapsService } from '../../../core/services/google-maps.service';
import { MelhorEnvioService } from '../../../core/services/melhor-envio.service';

describe('StoreService - CRUD + Loja Mais Próxima', () => {
  let service: StoreService;
  let repo: StoreRepository;

  const mockStore = {
    _id: '123',
    storeName: 'Loja A',
    city: 'São Paulo',
    postalCode: '01000-000',
    type: 'PDV',
    address1: 'Rua Alpha',
    state: 'SP',
    shippingTimeInDays: 2,
    latitude: '-23.55',
    longitude: '-46.63',
    takeOutInStore: true,
    district: 'Centro',
    country: 'Brasil',
  };

  const mockRepo = {
    create: jest.fn().mockResolvedValue(mockStore),
    update: jest.fn().mockResolvedValue({ ...mockStore, storeName: 'Atualizada' }),
    delete: jest.fn().mockResolvedValue(mockStore),
    findById: jest.fn().mockResolvedValue(mockStore),
    findAll: jest.fn(),
  };

  const mockViaCepService = {
    getAddressByCep: jest.fn(),
  };

  const mockMapsService = {
    getCoordinatesFromAddress: jest.fn(),
    calculateDistance: jest.fn(),
  };

  const mockMelhorEnvioService = {
    getFreight: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        { provide: StoreRepository, useValue: mockRepo },
        { provide: ViaCepService, useValue: mockViaCepService },
        { provide: GoogleMapsService, useValue: mockMapsService },
        { provide: MelhorEnvioService, useValue: mockMelhorEnvioService },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
    repo = module.get<StoreRepository>(StoreRepository);
  });

  // CRUD
  it('deve criar uma loja', async () => {
    const dto: any = { ...mockStore };
    delete dto._id;
    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(result.storeName).toBe('Loja A');
  });

  it('deve atualizar uma loja', async () => {
    const updated = await service.update('123', { storeName: 'Atualizada' });
    expect(repo.update).toHaveBeenCalledWith('123', { storeName: 'Atualizada' });
    expect(updated.storeName).toBe('Atualizada');
  });

  it('deve remover uma loja', async () => {
    const result = await service.remove('123');
    expect(repo.delete).toHaveBeenCalledWith('123');
    expect(result).toEqual({ deleted: true });
  });

  it('deve lançar erro ao atualizar uma loja inexistente', async () => {
    jest.spyOn(repo, 'update').mockResolvedValueOnce(null);
    await expect(service.update('999', { storeName: 'Nada' })).rejects.toThrow('Loja não encontrada');
  });

  it('deve lançar erro ao remover uma loja inexistente', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValueOnce(null);
    await expect(service.remove('999')).rejects.toThrow('Loja não encontrada');
  });

  
  it('deve retornar a loja mais próxima pelo CEP', async () => {
    const mockViaCep = {
      logradouro: 'Rua Teste',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    const mockStoreList = [
      { ...mockStore },
      {
        ...mockStore,
        storeName: 'Loja B',
        type: 'LOJA',
        postalCode: '02000-000',
        address1: 'Rua Beta',
      },
    ];

    mockViaCepService.getAddressByCep.mockResolvedValue(mockViaCep);
    mockRepo.findAll.mockResolvedValue(mockStoreList);
    mockMapsService.calculateDistance
      .mockResolvedValueOnce(40) // Loja A (PDV)
      .mockResolvedValueOnce(60); // Loja B (LOJA)

    const result = await service.findNearestByCep('01001-000');
    expect(result.name).toBe('Loja A');
    expect(result.type).toBe('PDV');
    expect(result.value[0].description).toBe('Motoboy');
  });

  it('deve retornar uma LOJA se estiver mais próxima que um PDV', async () => {
    const mockStoreList = [
      { ...mockStore },
      {
        ...mockStore,
        storeName: 'Loja B',
        type: 'LOJA',
        postalCode: '02000-000',
        address1: 'Rua Beta',
      },
    ];

    mockViaCepService.getAddressByCep.mockResolvedValue({
      logradouro: 'Rua Teste',
      localidade: 'São Paulo',
      uf: 'SP',
    });

    mockRepo.findAll.mockResolvedValue(mockStoreList);

    mockMapsService.calculateDistance
      .mockResolvedValueOnce(40) // Loja A (PDV)
      .mockResolvedValueOnce(20); // Loja B (LOJA mais próxima)

    mockMelhorEnvioService.getFreight.mockResolvedValue([
      {
        delivery_time: 2,
        id: 'PAC',
        price: '19.90',
        name: 'PAC',
      },
    ]);

    const result = await service.findNearestByCep('01001-000');
    expect(result.name).toBe('Loja B');
    expect(result.type).toBe('LOJA');
    expect(result.value[0].description).toBe('PAC');
  });

  it('deve usar Melhor Envio se o PDV estiver a mais de 50km', async () => {
    const store = {
      storeName: 'PDV Longe',
      type: 'PDV',
      postalCode: '02000-000',
      address1: 'Rua Longe',
      city: 'São Paulo',
      state: 'SP',
      shippingTimeInDays: 3,
      latitude: '-23.56',
      longitude: '-46.62',
    };

    mockViaCepService.getAddressByCep.mockResolvedValue({
      logradouro: 'Rua Teste',
      localidade: 'São Paulo',
      uf: 'SP',
    });

    mockRepo.findAll.mockResolvedValue([store]);
    mockMapsService.calculateDistance.mockResolvedValue(60); 

    mockMelhorEnvioService.getFreight.mockResolvedValue([
      {
        delivery_time: 2,
        id: 'PAC',
        price: '21.00',
        name: 'PAC',
      },
    ]);

    const result = await service.findNearestByCep('01001-000');
    expect(result.name).toBe('PDV Longe');
    expect(result.type).toBe('PDV');
    expect(result.value[0].description).toBe('PAC');
  });

  it('deve usar Melhor Envio para LOJA mesmo se a distância for < 50km', async () => {
    const store = {
      storeName: 'Loja Perto',
      type: 'LOJA',
      postalCode: '03000-000',
      address1: 'Rua Perto',
      city: 'São Paulo',
      state: 'SP',
      shippingTimeInDays: 1,
      latitude: '-23.57',
      longitude: '-46.60',
    };

    mockViaCepService.getAddressByCep.mockResolvedValue({
      logradouro: 'Av. Teste',
      localidade: 'São Paulo',
      uf: 'SP',
    });

    mockRepo.findAll.mockResolvedValue([store]);
    mockMapsService.calculateDistance.mockResolvedValue(5); 

    mockMelhorEnvioService.getFreight.mockResolvedValue([
      {
        delivery_time: 1,
        id: 'SEDEX',
        price: '25.00',
        name: 'Sedex',
      },
    ]);

    const result = await service.findNearestByCep('01001-000');
    expect(result.name).toBe('Loja Perto');
    expect(result.type).toBe('LOJA');
    expect(result.value[0].description).toBe('Sedex');
  });
});
