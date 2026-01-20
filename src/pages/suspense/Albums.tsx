import { use } from 'react';

export interface Album {
  id: number;
  title: string;
  year: number;
}

interface AlbumsProps {
  albumsPromise: Promise<Album[]>;
}

export default function Albums({ albumsPromise }: AlbumsProps) {
  const albums = use(albumsPromise);

  return (
    <div>
      <h3>앨범 목록</h3>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title} ({album.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
