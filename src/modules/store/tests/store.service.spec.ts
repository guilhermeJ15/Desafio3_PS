import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from '../services/store.service';
import { StoreRepository } from '../repositories/store.repository';
import { ViaCepService } from 'src/core/services/viacep.service';
import { GoogleMapsService } from 'src/core/services/google-maps.service';
import { MelhorEnvioService } from 'src/core/services/melhor-envio.service';

describe('StoreService - CRUD + Nearest', () => {
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

  // 🧪 CREATE
  it('should create a store', async () => {
    const dto: any = { ...mockStore };
    delete dto._id;
    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(result.storeName).toBe('Loja A');
  });

  // 🧪 UPDATE
  it('should update a store', async () => {
    const updated = await service.update('123', { storeName: 'Atualizada' });
    expect(repo.update).toHaveBeenCalledWith('123', { storeName: 'Atualizada' });
    expect(updated.storeName).toBe('Atualizada');
  });

  // 🧪 DELETE
  it('should delete a store', async () => {
    const result = await service.remove('123');
    expect(repo.delete).toHaveBeenCalledWith('123');
    expect(result).toEqual({ deleted: true });
  });

  // 🧪 UPDATE ERROR
  it('should throw if updating a non-existent store', async () => {
    jest.spyOn(repo, 'update').mockResolvedValueOnce(null);
    await expect(service.update('999', { storeName: 'Nada' })).rejects.toThrow('Loja não encontrada');
  });

  // 🧪 DELETE ERROR
  it('should throw if deleting a non-existent store', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValueOnce(null);
    await expect(service.remove('999')).rejects.toThrow('Loja não encontrada');
  });

  // 🧪 NEAREST BY CEP – PDV mais próximo
  it('should return the nearest store by CEP', async () => {
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
      .mockResolvedValueOnce(40) // Loja A
      .mockResolvedValueOnce(60); // Loja B

    const result = await service.findNearestByCep('01001-000');
    expect(result.name).toBe('Loja A');
    expect(result.type).toBe('PDV');
    expect(result.value[0].description).toBe('Motoboy');
  });

  // 🧪 NEAREST BY CEP – LOJA mais próxima
  it('should return a LOJA if it is closer than a PDV', async () => {
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
      .mockResolvedValueOnce(40) // Loja A
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
});
