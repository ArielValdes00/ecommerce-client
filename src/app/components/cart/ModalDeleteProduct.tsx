import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface ModalDeleteProductProps {
    handleRemoveFromCart: (product: any) => void;
    product: any;
    isOpen: boolean;
    onOpenChange: () => void
}

const ModalDeleteProduct: React.FC<ModalDeleteProductProps> = ({ handleRemoveFromCart, product, isOpen, onOpenChange }) => {

    const deleteProduct = () => {
        handleRemoveFromCart(product);
        onOpenChange();
    };

    return (
        <>
            <Modal isOpen={isOpen} size='lg' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center">
                                <span className="text-red-600 font-bold text-xl">Delete Product</span>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-center text-gray-700">
                                    Are you sure you want to delete this product?
                                </p>
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                <Button onPress={deleteProduct} className="bg-red-600 text-white">
                                    Delete
                                </Button>
                                <Button variant="light" onPress={onClose} className="mr-2 text-red-600">
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalDeleteProduct;
