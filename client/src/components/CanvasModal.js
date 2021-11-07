import { useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  HStack,
  Input,
} from "@chakra-ui/react"

import CanvasDraw from "react-canvas-draw";

function BodyForModal({ imgSource }) {
  const [canvasOptions, setCanvasOptions] = useState({
    brushRadius: 12,
    brushColor: "#212121",
  })

  if (imgSource !== '') {
    return <h1>IMAGE HERE</h1>
  }
  else {
    return (
      <>
        <CanvasDraw
          style={{ borderRadius: '1rem', margin: '0.5rem 0' }}
          brushRadius={canvasOptions.brushRadius}
          brushColor={canvasOptions.brushColor}
        />
        <FormLabel m={0} as="legend">Brush Radius</FormLabel>
        <Slider mb={1} onChange={value => setCanvasOptions({ ...canvasOptions, brushRadius: value })} aria-label="slider-ex-1" defaultValue={10} min={0} max={20} step={1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <FormControl as="fieldset">
          <FormLabel as="legend">Color</FormLabel>
          <RadioGroup onChange={value => setCanvasOptions({ ...canvasOptions, brushColor: value })} defaultValue="#212121">
            <HStack spacing="15px">
              <Radio value="#212121">Black</Radio>
              <Radio value="#ff553b">Red</Radio>
              <Radio value="#0384fc">Blue</Radio>
              <Radio value="#fcdb03">Yellow</Radio>
              <Radio value="#00d64f">Green</Radio>
              <Radio value="#ffa200">Orange</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </>
    )
  }
}

function CanvasModal({ showingModal, clickHandler, x, y, imgSource, open }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const closeHandler = () => {
    clickHandler(null, null, "", false)
  }

  const submitHandler = () => {
    
  }

  return (
    <>
      <Modal size="xl" isOpen={open} onClose={closeHandler} closeOnOverlayClick={false} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Draw!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BodyForModal imgSource={imgSource} />
            {/* <h1>{x}:{y}:{imgSource}</h1> */}
          </ModalBody>

          <ModalFooter onSubmit={submitHandler} width="full" display="flex" alignItems="space-between">
            <FormControl display="flex">
              <Input
                variant="flushed"
                placeholder="Enter Artwork Title"
                isRequired
              />
              <Button ml={3} colorScheme="blue" onClick={closeHandler}>
              Submit
              </Button>
            </FormControl>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CanvasModal;