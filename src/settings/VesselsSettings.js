import React, {useState} from "react";
import "../css/VesselsSettings.css";
import AddVessel from "./AddVessel";

const VesselsSettings = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
       <div className="d-flex justify-content-end mb-3 mt-3">
     <button onClick={() => {
        openDialog();
      }} class="btn btna submit-button btnfsize">Add Vessel</button>
     </div>



      <AddVessel open={open} onClose={handleClose} />
    
    </>
  );
};

export default VesselsSettings;
