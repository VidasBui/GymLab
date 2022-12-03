import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from'react-bootstrap';

export class AddCategoryModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventdefault();
        fetch('https://gymlab.azurewebsites.net/api/categories',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:null,
                DepartmentName:event.target.DepartmentName.value
            })
        })
        .then(res=>res.json())
        .then((result) =>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return(
            <div className = "container">

                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add category
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CategoryName">
                                        <Form.Label>Category Name</Form.Label>
                                        <Form.Control type ="text" name="CategoryName" required
                                        placeholder="Category Name"/>
                                        <Form.Label>Category Description</Form.Label>
                                        <Form.Control type ="text" name="CategoryDescription" required
                                        placeholder="Category Description"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant = "primary" type = "submit">
                                            Add Category
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}