import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import './start.css'

export default function ModalEvaluacion() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="primary">Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Evaluación</ModalHeader>
                            <ModalBody style={{ display: 'flex', justifyContent:'center', alignItems:'center' }}>
                                            <h4 style={{}}>Asigna una calificación a la compra</h4>
                                <div className="stars" >
                                    <div className="star-rating-group">
                                        <input className="star-rating-input star-rating-input--empty" name="rating2" id="rating2-0" value="0" type="radio" />
                                        <label aria-label="0 stars" className="star-rating-label" htmlFor="rating2-0">&nbsp;</label>
                                        <label aria-label="0.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-05"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-05" value="0.5" type="radio" />
                                        <label aria-label="1 star" className="star-rating-label" htmlFor="rating2-10" ><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-10" value="1" type="radio" />
                                        <label aria-label="1.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-15"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-15" value="1.5" type="radio" />
                                        <label aria-label="2 stars" className="star-rating-label" htmlFor="rating2-20"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-20" value="2" type="radio" />
                                        <label aria-label="2.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-25"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-25" value="2.5" type="radio" />
                                        <label aria-label="3 stars" className="star-rating-label" htmlFor="rating2-30"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-30" value="3" type="radio" />
                                        <label aria-label="3.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-35"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-35" value="3.5" type="radio" />
                                        <label aria-label="4 stars" className="star-rating-label" htmlFor="rating2-40"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-40" value="4" type="radio" />
                                        <label aria-label="4.5 stars" className="star-rating-label star-rating-label--half" htmlFor="rating2-45"><i className="star-rating-icon star-rating-icon--filled fa fa-star-half"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-45" value="4.5" type="radio" />
                                        <label aria-label="5 stars" className="star-rating-label" htmlFor="rating2-50"><i className="star-rating-icon star-rating-icon--filled fa fa-star"></i></label>
                                        <input className="star-rating-input" name="rating2" id="rating2-50" value="5" type="radio" />
                                    </div>
                                </div>
                                <Textarea
                                    label="Comentario"
                                    placeholder="Ingrese un comentario"
                                    className="max-w-xs"
                                />
                   
                            </ModalBody>
                            <ModalFooter>

                                <Button color="primary" onPress={onClose}>
                                    Comentar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
