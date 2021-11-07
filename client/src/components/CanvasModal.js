import { useState, createRef } from 'react'
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
  Image,
  Switch
} from "@chakra-ui/react"

import CanvasDraw from "react-canvas-draw";

function BodyForModal({ imgSource, canvasRef }) {
  const [canvasOptions, setCanvasOptions] = useState({
    brushRadius: 12,
    brushColor: "#212121",
  })
  const [toggleOn, setToggleOn] = useState(false);

  if (imgSource !== '') {
    return (
      <Image src={imgSource}/>
    )
  }
  else {
    return (
      <>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '1rem'}}>
          <CanvasDraw
            ref={canvasRef}
            hideGrid={true}
            style={{ borderRadius: '1rem', margin: '0.5rem 0' }}
            brushRadius={toggleOn ? '30' : canvasOptions.brushRadius}
            brushColor={toggleOn ? 'white' : canvasOptions.brushColor}
          />
          <div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-evenly', alignItems: 'center'}} >
            <Slider
              mb={1}
              onChange={value => setCanvasOptions({ ...canvasOptions, brushRadius: value })}
              aria-label="slider-ex-1"
              orientation="vertical"
              defaultValue={10}
              min={0}
              max={20}
              step={1}
              minH="sm"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <FormLabel m={0} fontSize="xs" >Brush Radius</FormLabel>
          </div>
        </div>
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
        <FormControl display="flex" mb="0" mt="2">
          <FormLabel >
            Eraser?
          </FormLabel>
          <Switch onChange={() => setToggleOn(!toggleOn)} id="email-alerts" />
        </FormControl>
      </>
    )
  }
}

function CanvasModal({ showingModal, clickHandler, x, y, imgSource, open, name, reloadPaintings }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formVal, setFormVal] = useState("")
  const canvasRef = createRef();

  const closeHandler = () => {
    clickHandler(null, null, "", false)
  }

  const submitHandler = () => {
    let imgData = canvasRef.current.canvasContainer.childNodes[1].toDataURL()
    fetch('http://localhost:3001/insertImage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({x: x, y: y, image: imgData, name: formVal})
    });
    closeHandler()
    reloadPaintings()
  }
  return (
    <>
      <Modal size="xl" isOpen={open} onClose={closeHandler} closeOnOverlayClick={imgSource !== ""} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{imgSource === "" ? 'Draw!' : name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BodyForModal canvasRef={canvasRef} imgSource={imgSource} />
          </ModalBody>
          {
            imgSource === "" &&
              <ModalFooter onSubmit={submitHandler} width="full" display="flex" alignItems="space-between">
                <FormControl display="flex">
                  <Input
                    onChange={e => setFormVal(e.target.value)}
                    variant="flushed"
                    placeholder="Enter Artwork Title"
                    isRequired
                  />
                  <Button 
                    ml={3}
                    colorScheme="blue"
                    onClick={submitHandler}
                    disabled={formVal.length > 20 || formVal.length <= 0}
                  >
                  Submit
                  </Button>
                </FormControl>
              </ModalFooter>
          }
        </ModalContent>
      </Modal>
    </>
  )
}

export default CanvasModal;