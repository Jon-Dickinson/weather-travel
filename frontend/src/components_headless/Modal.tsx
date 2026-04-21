import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { theme } from "../theme";

export function Modal(
  { isOpen, onClose, children }: 
  { isOpen: boolean; onClose: 
  () => void; children: React.ReactNode }) {

  if (!isOpen) return null;

  // Uses createPortal to render outside the main DOM hierarchy (avoids z-index issues)
  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </Overlay>,
    document.body
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: ${theme.colors.surface};
  padding: 24px;
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.lg};
  position: relative;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.ink};
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  transition: color ${theme.transition};

  &:hover {
    color: ${theme.colors.ink};
  }
`;