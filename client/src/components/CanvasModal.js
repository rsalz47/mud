import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from "@chakra-ui/react"

function BodyForModal(imgSource){
  if (imgSource) {
    return <h1>IMAGE HERE</h1>
  }
}

function CanvasModal({showingModal, clickHandler, x, y, imgSource, open}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const closeHandler = () => {
      clickHandler(null, null, "", false)
    } 
    return (
      <>
        <Modal isOpen={open} onClose={closeHandler}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/* <BodyForModal imgSource={imgSource}/> */}
                <h1>{x}:{y}:{imgSource}</h1>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeHandler}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <button onClick={onOpen}>OPEN MODAL</button>
      </>
    )
  }

export default CanvasModal;