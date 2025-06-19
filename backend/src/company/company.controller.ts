import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { Request } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly CompanyServices: CompanyService) {}
  @Post('register')
  registerCompany(@Body() CompanyDto: CompanyDto, @Req() req: Request) {
    return this.CompanyServices.registerCompany(CompanyDto, req['userId']);
  }
  @Get('getusercompany')
  getCompany(@Req() req: Request) {
    return this.CompanyServices.getCompany(req['userId']);
  }

  @ApiParam({
    name: 'id',
    example: '6852d4a6f21090e4f985c677',
  })
  @Get('getcompanybyid/:id')
  getCompanyById(@Param('id') id: string) {
    return this.CompanyServices.getCompanyById(id);
  }

  @Patch('update/:id')
  updateCompanyById(
    @Param('id') id: string,
    @Body() updateDto: UpdateCompanyDto,
  ) {
    return this.CompanyServices.updateCompanyById(id, updateDto);
  }
}
