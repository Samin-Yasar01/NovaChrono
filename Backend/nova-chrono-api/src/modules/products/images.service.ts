import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './images.schema';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<any> {
    const createdImage = new this.imageModel(createImageDto);
    return createdImage.save();
  }

  async createBatch(createImageDtos: CreateImageDto[]): Promise<any[]> {
    return this.imageModel.insertMany(createImageDtos);
  }

  async findByProductId(productId: string): Promise<any[]> {
    return this.imageModel
      .find({ productId: productId as any })
      .sort({ order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<any> {
    const image = await this.imageModel.findById(id).exec();
    if (!image) {
      throw new NotFoundException(`Image #${id} not found`);
    }
    return image;
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<any> {
    const updatedImage = await this.imageModel
      .findByIdAndUpdate(id, updateImageDto, { new: true })
      .exec();
    if (!updatedImage) {
      throw new NotFoundException(`Image #${id} not found`);
    }
    return updatedImage;
  }

  async remove(id: string): Promise<any> {
    const image = await this.imageModel.findByIdAndDelete(id).exec();
    if (!image) {
      throw new NotFoundException(`Image #${id} not found`);
    }
    return image;
  }

  async removeByProductId(productId: string): Promise<any> {
    return this.imageModel.deleteMany({ productId: productId as any }).exec();
  }
}
