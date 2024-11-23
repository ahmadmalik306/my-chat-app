
import { mergeTypeDefs } from "@graphql-tools/merge";
import fs from 'fs';
import path from 'path';
const loadSchemaFiles = (dirPath: any) => {
  const files = fs.readdirSync(dirPath);
  const typeDefs: string[] = [];

  files.forEach((file) => {
    if (file.endsWith(".graphql")) {
      const schemaFile = fs.readFileSync(path.join(dirPath, file), "utf8");
      typeDefs.push(schemaFile);
    }
  });

  return typeDefs;
};
const typeDefs = loadSchemaFiles(path.join(__dirname, 'schema'));
export const mergedTypeDefs = mergeTypeDefs(typeDefs);