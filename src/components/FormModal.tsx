import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface FormModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export function FormModal({ open, setOpen, children }: FormModalProps) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "70%", md: 500 },
          bgcolor: "background.paper",
          borderRadius: 2,
          paddingX: 6,
          paddingY: 4,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
