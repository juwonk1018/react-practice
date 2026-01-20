import { Suspense } from 'react';
import Albums, { Album } from './Albums';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

// 지연 함수
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 모킹된 앨범 데이터
const mockAlbums: Record<number, Album[]> = {
  1: [
    { id: 1, title: 'The Dark Side of the Moon', year: 1973 },
    { id: 2, title: 'Wish You Were Here', year: 1975 },
    { id: 3, title: 'The Wall', year: 1979 },
  ],
  2: [
    { id: 4, title: 'Abbey Road', year: 1969 },
    { id: 5, title: 'Let It Be', year: 1970 },
  ],
  3: [
    { id: 6, title: 'Led Zeppelin IV', year: 1971 },
    { id: 7, title: 'Physical Graffiti', year: 1975 },
  ],
};

function fetchAlbums(artistId: number): Promise<Album[]> {
  console.log('@fetch');
  return delay(1500).then(() => {
    // 50% 확률로 실패 (테스트용)
    if (Math.random() < 0.5) {
      throw new Error('앨범 로딩 실패!');
    }
    return mockAlbums[artistId] || [];
  });
}

export default function SuspensePage() {
  const artist = { name: 'Pink Floyd', id: 1 };

  // Promise를 여기서 한 번만 생성
  const albumsPromise = fetchAlbums(artist.id);

  return (
    <>
      <h1>{artist.name}</h1>
      <ErrorBoundary fallback={<div>앨범 로딩 에러!</div>}>
        <Suspense fallback={<Loading />}>
          <Albums albumsPromise={albumsPromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
