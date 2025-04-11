import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DisplayStatus } from 'src/enums/display-status.enum';

export class CreateDisplayDto {
  @ApiProperty({
    example: 'ownerId123',
    description: 'ID of the display owner',
  })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({
    example: 'Times Square, NY',
    description: 'Location of the display',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiPropertyOptional({ enum: DisplayStatus, example: DisplayStatus.ACTIVE })
  @IsOptional()
  @IsEnum(DisplayStatus)
  status?: DisplayStatus;
}
