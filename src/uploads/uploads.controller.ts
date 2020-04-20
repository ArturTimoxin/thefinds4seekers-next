import { Controller, Get, Param, Res } from '@nestjs/common';
require("dotenv").config();

@Controller('uploads')
export class UploadsController {

    //  /uploads/ads/:img.png
    @Get('/ads/:imgpath')
    seeAdPhoto(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: `.${process.env.UPLOADS_DIRRECTORY}/ads_photos` });
    }

}
