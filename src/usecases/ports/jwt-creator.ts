export interface IJwtCreatorProps {
  sub: string;
  exp: string;
}

export interface IJwtCreator {
  create(data: IJwtCreatorProps): string;
}
