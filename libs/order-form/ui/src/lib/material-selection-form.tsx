import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CatalogUi } from '@open-screen-shop/catalog/ui';
import { Material } from '@open-screen-shop/catalog/model';
import { useIsDesktop } from '@open-screen-shop/breakpoint-utils';
import { BackButton } from './back-button';
import { OrderFormActions, Store } from '@open-screen-shop/order-form/state';

export function MaterialSelectionForm() {
  const dispatch = useDispatch();

  const isDesktop = useIsDesktop();

  const isInitialItemSelection = useSelector(
    (store: Store) => Object.values(store.order.items ?? {}).length === 0
  );

  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '3fr 7fr',
        gap: '1rem',
      }}
    >
      {selectedMaterial ? (
        <div>
          <h2>{selectedMaterial.label}</h2>
          {selectedMaterial.tags?.length > 0 ? (
            <h6>Tags: {selectedMaterial.tags.join(', ')}</h6>
          ) : null}
          <p>{selectedMaterial.description}</p>
          {selectedMaterial.slots.length > 0 ? (
            <>
              <h3>Available Customizations</h3>
              <ul>
                {selectedMaterial.slots.map((slot) => (
                  <li key={slot.id}>{slot.label}</li>
                ))}
              </ul>
            </>
          ) : null}
          <Button variant="contained"
          onClick={() => {
            dispatch(OrderFormActions.addItem(selectedMaterial));
          }}
          >Use this material</Button>
        </div>
      ) : null}
      <CatalogUi
        style={{ gridColumn: selectedMaterial ? undefined : '1 / span 2' }}
        onSelect={(material: Material) => setSelectedMaterial(material)}
        selectable={true}
        selected={selectedMaterial}
        columns={isDesktop ? (selectedMaterial ? 4 : 6) : 2}
        toolbarItems={
          <BackButton
            onClick={() => {
              isInitialItemSelection
                ? dispatch(OrderFormActions.editInitialDetails())
                : dispatch(OrderFormActions.viewItems())
            }}
          ></BackButton>
        }
      ></CatalogUi>
    </div>
  );
}
