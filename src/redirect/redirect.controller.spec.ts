import { Test, TestingModule } from '@nestjs/testing';
import { RedirectController } from './redirect.controller';
import { LinksService } from '../links/links.service';

describe('RedirectController', () => {
  let controller: RedirectController;
  let mockService: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectController],
      providers: [{provide: LinksService, useValue : {
        FindOneByShortCode : jest.fn()
      }}]
    }).compile();

    controller = module.get<RedirectController>(RedirectController);
    mockService = module.get<LinksService>(LinksService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it("should redirect", async() => {
    const shortCode = "xazey1"
    const redirectLink  = "https://github.com/ErnisuuluRenat/urlshortener"
    mockService.FindOneByShortCode.mockResolvedValue(redirectLink)
    const result = await controller.findOne(shortCode)
    expect(result).toEqual({url: redirectLink, statusCode: 301})
  })
});
