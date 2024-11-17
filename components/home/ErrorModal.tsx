import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} placement="top-center" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Ошибка загрузки серверов
        </ModalHeader>
        <ModalBody>
          <p>
            Не удалось загрузить список серверов!
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={onClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
