export interface Libro {
    id:          number;
    title:       string;
    author:      string;
    image?:       string;
    genre:       string;
    isbn:        string;
    published:   string;
    publisher:   string;
    description?: string;
}


export interface LibroBusqueda {
    title?:       string;
    author?:      string;
    genre?:       string;
    isbn?:        string;
    publisher?:   string;
    description?: string;
    from?:        string;
    to?:          string;
}