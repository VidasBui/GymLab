import React,{Component} from 'react';
import {Tab, Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddCategoryModal } from './AddCategoryModal';

export class Category extends Component{

    constructor(props){
        super(props);
        this.state={categories:[], addModalShow:false}
    }

    refreshList(){
        fetch('https://gymlab.azurewebsites.net/api/categories')
        .then(response=>response.json())
        .then(data=>
        {
            this.setState({categories:data});
        });
    }

    componentDidMount()
    {
        this.refreshList();
    }

    componentDidUpdate()
    {
        this.refreshList();
    }

    render()
    {
        const{categories} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Options</th>
                    </tr>
            </thead>
            <tbody>
                {categories.map(category=>
                <tr key={category.name}>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>Edit / Delete</td>
                </tr>
                )}
            </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>Add Category
                </Button>
            </ButtonToolbar>
            <AddCategoryModal show = {this.state.addModalShow}
            onHide={addModalClose}></AddCategoryModal>
        </div>
        )
    }
}