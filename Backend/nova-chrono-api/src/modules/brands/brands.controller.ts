import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';


@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
    @Get()
    @ApiOperation({ summary: 'Get all brands' })
    @ApiResponse({ status: 200, description: 'List of all brands' })
    findAll() {
      return this.brandsService.findAll();
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get brand by ID' })
    @ApiParam({ name: 'id', description: 'Brand ID' })
    @ApiResponse({ status: 200, description: 'Brand details' })
    @ApiResponse({ status: 404, description: 'Brand not found' })
    findOne(@Param('id') id: string) {
        return this.brandsService.findOne(id);
    }
    @UseGuards(ApiKeyGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new brand' })
    @ApiBody({ type: CreateBrandDto })
    @ApiResponse({ status: 201, description: 'Brand created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.brandsService.create(createBrandDto);
    }
    @UseGuards(ApiKeyGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a brand' })
    @ApiParam({ name: 'id', description: 'Brand ID' })
    @ApiBody({ type: UpdateBrandDto })
    @ApiResponse({ status: 200, description: 'Brand updated successfully' })
    @ApiResponse({ status: 404, description: 'Brand not found' })
    update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.brandsService.update(id, updateBrandDto);
    }
    @UseGuards(ApiKeyGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a brand' })
    @ApiParam({ name: 'id', description: 'Brand ID' })
    @ApiResponse({ status: 200, description: 'Brand deleted successfully' })
    @ApiResponse({ status: 404, description: 'Brand not found' })
    remove(@Param('id') id: string) {
        return this.brandsService.remove(id);
    }
}