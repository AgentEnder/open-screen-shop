import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from '@mui/material';
import { useIsDesktop } from '@open-screen-shop/breakpoint-utils';
import { Material } from '@open-screen-shop/catalog/model';
import { CatalogActions, Store } from '@open-screen-shop/catalog/state';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './catalog-ui.module.scss';

/* eslint-disable-next-line */
type BaseProps = {
  className?: string;
  style?: React.CSSProperties;
  columns?: number;
  toolbarItems?: React.ReactNode;
};
type ExtraProps =
  | {
      selectable?: false;
    }
  | {
      selectable: true;
      onSelect: (material: Material) => void;
      selected?: Material | null;
    };
export type CatalogUiProps = BaseProps & ExtraProps;

export function CatalogUi(props: CatalogUiProps) {
  const materials = useSelector(
    createSelector(
      (store: Store) => store.catalog,
      (catalog) => catalog.filteredMaterials
    )
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const isDesktop = useIsDesktop();

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      dispatch(CatalogActions.setSearchText(search));
    }, 400);
  }, [search, dispatch]);

  return (
    <div className={props.className} style={props.style}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <TextField
          label="Search materials"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          style={{ flexGrow: 1 }}
        ></TextField>
        {props.toolbarItems}
      </div>
      <ImageList cols={props.columns ?? (isDesktop ? 4 : 2)}>
        {materials.map((m) => (
          <ImageListItem
            key={m.id}
            className={styles['item-list-item']}
            onClick={() => (props.selectable ? props.onSelect(m) : null)}
          >
            <button
              style={{
                appearance: 'none',
                padding: 0,
                border: 'none',
              }}
            >
              <img
                src={m.imageUrl ?? `https://picsum.photos/200?random=${m.id}`}
                alt={m.label}
                style={{ width: '100%' }}
              />
            </button>
            <ImageListItemBar
              title={m.label}
              subtitle={
                <div className={styles['subtitle']}>
                  {m.description?.length && m.description?.length > 150
                    ? `${m.description.substring(0, 150)}...`
                    : m.description}
                </div>
              }
              className={styles['item-bar']}
            ></ImageListItemBar>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default CatalogUi;
