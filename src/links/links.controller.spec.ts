import { Test, TestingModule } from '@nestjs/testing';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

describe('LinksController', () => {
  let controller: LinksController;
  let mockService: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [{
        provide: LinksService, useValue : {
          findAll: jest.fn(),
          create: jest.fn(),
          updateOne: jest.fn(),
          delete: jest.fn(),
          findOne: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<LinksController>(LinksController);
    mockService = module.get<LinksService>(LinksService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it("should return all links", async() => {
    const mockLinks = [{ id: 1, originalUrl: 'https://google.com', shortCode: 'abc12' }]
    mockService.findAll.mockResolvedValue(mockLinks)
    const result = await controller.findAll()

    expect(result).toEqual(mockLinks)
  })
  it("should return link", async() => {
    const mockLink = { id: 1, originalUrl: 'https://google.com', shortCode: 'abc12' }
    const id = 1
    mockService.findOne.mockResolvedValue(mockLink)
    const result = await controller.findOne(id)
    expect(result).toEqual(mockLink)
  })
  it("should create link", async() => {
    const dto  = {originalUrl : "https://www.youtube.com/watch?v=WIt8cNOMkwc&t=3609s"}
    const mockCreatedLink = {id: 11, shortCode: "zzsdjng", originalUrl : "https://www.youtube.com/watch?v=WIt8cNOMkwc&t=3609s", createAt: "25.06.2026"}

    mockService.create.mockResolvedValue(mockCreatedLink)
    const result = await controller.create(dto)
    expect(result).toEqual(mockCreatedLink)
  })
  it("should update link", async() => {
    const id = 10
    const dto = {originalUrl : "https://www.youtube.com/watch?v=WIt8cNOMkwc&t=3609s"}
    const updatedLink = {id: 10, originalUrl: "https://www.youtube.com/watch?v=WIt8cNOMkwc&t=3609s", shortCode: "ww64ksxx", createAt: "25.06.2026"}
    mockService.updateOne.mockResolvedValue(updatedLink)
    const result = await controller.updateOne(id, dto)
    expect(result).toEqual(updatedLink)
  })
  it("should delete link", async() => {
    const id = 10
    mockService.delete.mockResolvedValue(undefined)
    await controller.delete(id)
    expect(mockService.delete).toHaveBeenCalledWith(id)
  })
});
