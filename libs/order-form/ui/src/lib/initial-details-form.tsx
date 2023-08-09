import { Button, TextField } from '@mui/material';
import { OrderFormActions } from '@open-screen-shop/order-form/state';
import { useDispatch } from 'react-redux';

export function InitialDetailsForm() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Custom Order</h1>
      <form
        onSubmit={(evt) => {
          const formData = new FormData(evt.target as HTMLFormElement);
          const data = Object.fromEntries(formData.entries()) as Record<
            string,
            string
          >;
          console.log(data);
          dispatch(
            OrderFormActions.setInitialDetails({
              contact: {
                name: data.name,
                email: data.email,
                phone: data.phone,
              },
              description: data.description,
            })
          );
          evt.preventDefault();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '40rem',
          margin: 'auto',
        }}
      >
        <fieldset
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <legend>Contact Information</legend>
          <TextField label="Name" name="name" variant="outlined"></TextField>
          <TextField label="Email" name="email" variant="outlined"></TextField>
          <TextField
            label="Phone #"
            name="phone"
            variant="outlined"
          ></TextField>
        </fieldset>
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          multiline={true}
          minRows={3}
        ></TextField>
        <Button variant="contained" type="submit">
          Next Step
        </Button>
      </form>
    </div>
  );
}
