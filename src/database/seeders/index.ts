import * as fs from 'fs';
import * as path from 'path';

const basename = path.basename(__filename);

const isTesting = process.env.NODE_ENV === 'test';
const seederFileNames = isTesting
  ? fs.readdirSync(__dirname).filter((file) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
      );
    })
  : fs.readdirSync(__dirname).filter((file) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      );
    });
export default seederFileNames;
