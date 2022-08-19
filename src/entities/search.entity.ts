interface SearchProps {
  title: string;
  description: string;
  author: string;
}

export class Search {
  constructor(private props: SearchProps) {}
}
