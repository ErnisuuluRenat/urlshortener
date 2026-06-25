import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from './links.entity';

describe('LinksService', () => {
  let service: LinksService;
  let mockRepository : any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinksService, {provide: getRepositoryToken(Link),
        useValue: {
          find : jest.fn(),
          findOneBy: jest.fn(),
          save: jest.fn(),
          delete: jest.fn(),
          preload: jest.fn()
        }}
    ],
    }).compile();

    service = module.get<LinksService>(LinksService);
    mockRepository = module.get(getRepositoryToken(Link))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it("should return all links", async () => {
    const mockLinks = [{ id: 1, originalUrl: 'https://google.com', shortCode: 'abc12' }]
    mockRepository.find.mockResolvedValue(mockLinks)
    const result = await service.findAll()
    expect(result).toEqual(mockLinks)
  });
  it("should return one link", async() => {
    const mockLink = { id: 1, originalUrl: 'https://google.com', shortCode: 'abc12' }
    mockRepository.findOneBy.mockResolvedValue(mockLink)
    const result = await service.findOne(mockLink["id"])
    expect(result).toEqual(mockLink)
  });
  it("should throw NotFoundException when link not found", async () => {
    const id = 999
    mockRepository.findOneBy.mockResolvedValue(null)
    await expect(service.findOne(id)).rejects.toThrow(`Link with id ${id} not found`)
  });
  it("should create a Link", async() => {
    const dto = {"originalUrl" : "https://google.com"}
    const mockCreatedLink = {id:1, originalUrl: "https://google.com", shortCode: 'adsav', createdAt: "2026.06.24"}
    mockRepository.save.mockResolvedValue(mockCreatedLink)
    const result = await service.create(dto)
    expect(result).toEqual(mockCreatedLink)
  });
  it("should delete a Link", async() => {
    const id = 99
    const mockLink = {id:id, originalUrl: "https://google.com", shortCode: 'adsav', createdAt: "2026.06.24" }
    mockRepository.findOneBy.mockResolvedValue(mockLink)
    const result = await service.delete(id)
    expect(mockRepository.delete).toHaveBeenCalledWith(id)
  })
  it("should throw NotFoundException when link not found", async () => {
    const id = 999
    mockRepository.findOneBy.mockResolvedValue(null)
    await expect(service.findOne(id)).rejects.toThrow(`Link with id ${id} not found`)
  });
}); 
