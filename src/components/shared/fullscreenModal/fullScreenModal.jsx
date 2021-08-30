import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenModal = ({ handleClose, open, children }) => {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        scroll="paper"
        TransitionComponent={Transition}
      >
        {children}
      </Dialog>
    </div>
  );
};

export default FullScreenModal;
