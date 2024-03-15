import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
  Req,
  UseGuards,
  Put,
  BadRequestException,
  StreamableFile,
  Res
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ResponseDto } from 'src/utils/response.dto';
import { RoleGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.decorator';
import { Roles } from 'src/roles/enums/roles.enum';
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { Response } from 'express';

@ApiTags('products')
@ApiHeader({
  name: 'X-MyHeader',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYyN2QzZDZlNTRkNjA3NjIzNzlmN2UiLCJyb2xlcyI6WyJ1c2VyIiwiYWRtaW4iLCJzdXBlci1hZG1pbiIsInNlbGxlciJdLCJmdWxsTmFtZSI6IkdhdXJhbmcgUGF0ZWwiLCJpYXQiOjE3MTA0MDc1OTksImV4cCI6MTcxMDQyNTU5OX0.PQKk8HtaBisPpklVUit3l1OaeQCwUqwwiYDozJyPHpY',
})
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiBody({ type: CreateProductDto })
  @ApiConsumes('multipart/form-data')
  @UseGuards(RoleGuard)
  @Role(Roles.SELLER)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new BadRequestException('File type not match, only jpg,webp,png,jpeg acceptable.'), false)
        }
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = path
            .parse(file.originalname)
            .name.replace(/\s/g, '-');
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}-${Date.now()}${extension}`);
        },
      }),
    }),
  )
  async create(
    @Body('data') requestBody: any,
    @UploadedFiles(
    ) files: Array<Express.Multer.File>,
    @Req() req,
  ) {
    const createProductDto: CreateProductDto =
      typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
    if (!files) throw new BadRequestException("No images provided");

    createProductDto.images = files.map((f) => f.path.toString());
    createProductDto.seller = req.user._id;
    return new ResponseDto(
      'Product added successfully.',
      HttpStatus.CREATED,
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  async findAll() {
    return new ResponseDto(
      'Products retrieve successfully.',
      HttpStatus.OK,
      await this.productsService.findAll(),
    );
  }

  @Get('res')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(path.join(process.cwd(), 'video.mp4'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      'Product retrieve successfully.',
      HttpStatus.OK,
      await this.productsService.findOne(id),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return new ResponseDto(
      'Product updated successfully.',
      HttpStatus.OK,
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      'Product removed successfully.',
      HttpStatus.OK,
      await this.productsService.remove(id),
    );
  }
}
