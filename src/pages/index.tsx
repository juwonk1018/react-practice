import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  title: string;
  description: string;
}

const ITEM_HEIGHT = 80;
const VIEWPORT_HEIGHT = 600;
const BUFFER = 5;

// 모킹 데이터 생성
function generateItems(page: number, limit: number): Item[] {
  const start = (page - 1) * limit;
  return Array.from({ length: limit }, (_, i) => ({
    id: start + i + 1,
    title: `아이템 ${start + i + 1}`,
    description: `이것은 ${start + i + 1}번째 아이템의 설명입니다.`,
  }));
}

// 모킹 fetch
async function fetchItems(page: number, limit = 20): Promise<Item[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (page > 5) return [];
  return generateItems(page, limit);
}

// 모듈 레벨 캐시 (페이지 이동해도 유지)
let cachedItems: Item[] = [];
let cachedPage = 1;
let cachedHasMore = true;
let cachedScrollTop = 0;

export default function HomePage() {
  const [items, setItems] = useState<Item[]>(cachedItems);
  const [page, setPage] = useState(cachedPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(cachedHasMore);
  const [scrollTop, setScrollTop] = useState(cachedScrollTop);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 가상화 계산
  const totalHeight = items.length * ITEM_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ITEM_HEIGHT) + BUFFER,
  );
  const visibleItems = items.slice(startIndex, endIndex);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newItems = await fetchItems(page);

    if (newItems.length === 0) {
      setHasMore(false);
      cachedHasMore = false;
    } else {
      setItems((prev) => {
        const updated = [...prev, ...newItems];
        cachedItems = updated;
        return updated;
      });
      setPage((prev) => {
        const updated = prev + 1;
        cachedPage = updated;
        return updated;
      });
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  // 스크롤 핸들러
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      // setScrollTop(scrollTop);
      cachedScrollTop = scrollTop;

      if (
        scrollHeight - scrollTop - clientHeight < 200 &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore],
  );

  // 초기 로드 (캐시가 비어있을 때만)
  useEffect(() => {
    if (cachedItems.length === 0) {
      loadMore();
    }
  }, []);

  // 스크롤 위치 복원
  useEffect(() => {
    if (containerRef.current && cachedScrollTop > 0) {
      containerRef.current.scrollTop = cachedScrollTop;
    }
  }, []);

  const handleItemClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  return (
    <div style={styles.container}>
      <h1>
        가상화 무한 스크롤 (총 {items.length}개, 렌더링: {visibleItems.length}
        개)
      </h1>
      <div ref={containerRef} style={styles.viewport} onScroll={handleScroll}>
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map((item, i) => {
            const actualIndex = startIndex + i;
            return (
              <div
                key={item.id}
                style={{
                  ...styles.item,
                  position: 'absolute',
                  top: actualIndex * ITEM_HEIGHT,
                  left: 0,
                  right: 0,
                  height: ITEM_HEIGHT,
                }}
                onClick={() => handleItemClick(item.id)}
              >
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemDescription}>{item.description}</p>
              </div>
            );
          })}
        </div>
        {loading && (
          <div
            style={{
              ...styles.loading,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            로딩 중...
          </div>
        )}
      </div>
      {!hasMore && <div style={styles.end}>더 이상 아이템이 없습니다.</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  viewport: {
    height: VIEWPORT_HEIGHT,
    overflow: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    position: 'relative',
  },
  item: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  itemTitle: {
    margin: '0 0 4px 0',
    color: '#333',
    fontSize: '14px',
  },
  itemDescription: {
    margin: 0,
    color: '#666',
    fontSize: '12px',
  },
  loading: {
    textAlign: 'center',
    padding: '10px',
    color: '#666',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  end: {
    textAlign: 'center',
    padding: '20px',
    color: '#999',
  },
};
