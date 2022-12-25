import { google } from 'googleapis';
import stream from 'stream';
import { GOOGLE_DRIVE_KEY_FILE_PATH } from '../constants/constants.js';


const auth = new google.auth.GoogleAuth({
  keyFile: GOOGLE_DRIVE_KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/drive']
});

export const uploadFile = async (fileObject: Express.Multer.File, googleDriveFolderId: string) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const drive = google.drive({ version: 'v3', auth });

  const { data } = await drive.files.create({
    media: {
      mimeType: fileObject.mimetype,
      body: bufferStream
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [googleDriveFolderId]
    },
    fields: 'id,name,mimeType'
  });

  //set google drive permissions for the image
  await drive.permissions.create({
    fileId: data.id!,
    requestBody: {
      role: 'reader',
      type: 'anyone'
    }
  });

  return data;
};
