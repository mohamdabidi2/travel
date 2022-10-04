import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import "./res.css"
const resTypes = ['Hotel', 'voyage organisé','Omraa'];

function ReservationType(props) {
  const { onClose, selectedValue, open,hundelchangeEtat,hundelCurrentview } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value,i) => {
    onClose(value);
   hundelchangeEtat(true)
   hundelCurrentview(i+2)
   console.log(i)
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
sélectionner la catégorie de réservation</DialogTitle>
      <List sx={{ pt: 0 }}>
        {resTypes.map((resType,i) => (
          <ListItem button onClick={() => handleListItemClick(resType,i)} key={resType}>
            <ListItemText primary={resType} style={{textAlign:'center'}} />
          </ListItem>
        ))}


      </List>
    </Dialog>
  );
}

ReservationType.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ReservationTypeA(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(resTypes[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" className='createnew' onClick={handleClickOpen}>
      créer un nouveau
      </Button>
      <ReservationType hundelCurrentview={props.hundelCurrentview} hundelchangeEtat={props.hundelchangeEtat}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
