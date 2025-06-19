import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Company } from 'src/models/company.model';
import { CompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: mongoose.Model<Company>,
  ) {}

  async registerCompany(CompanyDto: CompanyDto, userId: string) {
    try {
      if (!userId) {
        return new BadRequestException('You Are Not Authenticate');
      }
      const { name, description, website, location, logo } = CompanyDto;
      if (!name) {
        return new BadRequestException('Something is Missing');
      }
      let company = await this.companyModel.findOne({ name });
      if (company) {
        return new ConflictException('Company Already Exits');
      }
      company = await this.companyModel.create({
        name,
        description,
        website,
        logo,
        location,
        userId: userId,
      });
      return {
        data: company,
        message: 'Succefully Create A New Company',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCompany(userId: string) {
    try {
      const company = await this.companyModel.find({ userId });
      if (!company) {
        return new NotFoundException('Company Not Found');
      }
      return {
        data: company,
        message: 'Extracting company from User creation',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCompanyById(id: string) {
    try {
      const company = await this.companyModel.findById(id);
      if (!company) {
        return new NotFoundException('Company Not Found');
      }
      return {
        data: company,
        message: 'Getting Company Information',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updateCompanyById(id: string, updateDto: UpdateCompanyDto) {
    try {
      const companyexit = await this.companyModel.findById(id);
      if (!companyexit) {
        return new NotFoundException('Company Not Found');
      }
      const { description, website, location, logo } = updateDto;
      const updateData = { description, website, location, logo };
      const company = await this.companyModel.findByIdAndUpdate(id, updateData);
      return {
        data: company,
        message: 'Company Updated Succefully',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
