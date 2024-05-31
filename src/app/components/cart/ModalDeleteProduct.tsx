import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface ModalDeleteProductProps {
    handleRemoveFromCart: () => void;
    isOpen: boolean;
    onOpenChange: () => void;
    headerText: string;
    bodyText: string;
}

const ModalDeleteProduct: React.FC<ModalDeleteProductProps> = ({ handleRemoveFromCart, isOpen, onOpenChange, headerText, bodyText }) => {
    return (
        <>
            <Modal isOpen={isOpen} size='lg' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center">
                                <span className="text-red-600 font-bold text-xl">{headerText}</span>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-center text-gray-700">
                                    {bodyText}
                                </p>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button onPress={() => { handleRemoveFromCart(); onClose(); }} color='danger' className="text-white">
                                    Delete
                                </Button>
                                <Button variant="light" onPress={onClose} color='danger' className="mr-2">
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalDeleteProduct;
