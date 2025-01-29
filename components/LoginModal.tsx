import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@heroui/react";
import { LockFilledIcon, MailIcon } from "@heroui/shared-icons";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    onLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Вход в аккаунт
        </ModalHeader>
        <ModalBody>
          <Input
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Почта"
            placeholder="Введите вашу почту"
            value={email}
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            endContent={
              <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Пароль"
            placeholder="Введите ваш пароль"
            type="password"
            value={password}
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox className="text-small">Запомнить меня</Checkbox>
            <Link color="primary" href="#" size="sm">
              Забыли пароль?
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={onClose}>
            Закрыть
          </Button>
          <Button color="primary" onClick={handleLoginClick}>
            Войти
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
