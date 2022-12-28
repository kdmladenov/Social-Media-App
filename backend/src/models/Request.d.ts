declare namespace Express {
  export interface Request {
    user: {
      userId: number;
      email: string;
      role: RolesType;
    };
    file: Multer.File;
    files: Multer.File[];
  }
}
