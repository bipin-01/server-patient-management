import {
  BadRequestException,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { VALID_FILE_FORMAT } from 'src/constants/constants';
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Public()
  @Post('post-add')
  @UseInterceptors(FileInterceptor('file'))
  async postAdd(@UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        const fileExtension = path.extname(file.originalname);
        if (!VALID_FILE_FORMAT.includes(fileExtension)) {
          throw new BadRequestException({ message: 'File type not supported' });
        }
      }

      const res = await this.patientsService.parseFile(file);
      return {
        status: HttpStatus.OK,
        message: 'File Uploaded Succesfully',
        data: res,
      };
    } catch (err) {
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
