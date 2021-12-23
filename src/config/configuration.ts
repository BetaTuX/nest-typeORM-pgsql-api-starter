import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export enum DatabaseType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  MARIADB = 'mariadb',
  COCKROACHDB = 'cockroachdb',
  SQLITE = 'sqlite',
  MSSQL = 'mssql',
  SAP = 'sap',
  ORACLE = 'oracle',
  CORDOVA = 'cordova',
  NATIVESCRIPT = 'nativescript',
  REACT_NATIVE = 'react-native',
  SQLJS = 'sqljs',
  MONGODB = 'mongodb',
  AURORA_DATA_API = 'aurora-data-api',
  AURORA_DATA_API_PG = 'aurora-data-api-pg',
  EXPO = 'expo',
  BETTER_SQLITE_3 = 'better-sqlite3',
  CAPACITOR = 'capacitor',
}

export interface DatabaseConfiguration {
  type: DatabaseType;
  host: string;
  port: number;
  name: string;
  user: string;
  pass: string;
}

export interface TokenConfiguration {
  secret: string;
  ttl: string;
}

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
