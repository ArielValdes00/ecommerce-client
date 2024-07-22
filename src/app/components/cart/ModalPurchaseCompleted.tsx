import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ModalPurchaseCompletedProps {
    onOpenChange: React.Dispatch<boolean>;
    isOpen: boolean;
}
const ModalPurchaseCompleted: React.FC<ModalPurchaseCompletedProps> = ({ onOpenChange, isOpen }) => {
    const router = useRouter();
    
    const handleOnClick = () => {
        router.push('/products');
    };

    return (
        <div className='z-[9999]'>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='py-7'>
                <ModalContent className='flex flex-col items-center justify-center gap-3'>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <Image src='/check.png' alt='Order Completed' height={130} width={130}/>
                            </ModalHeader>
                            <ModalBody>
                                <p className='text-3xl font-semibold'>Thank you for ordering!</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={handleOnClick} size='lg' onPress={onClose}>
                                    Continue Shopping
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ModalPurchaseCompleted