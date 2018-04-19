import React, { Component } from 'react';
import styles from './ListingItem.scss';
import { Panel } from 'react-bootstrap';
import { Modal, Popover, Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import { togglePage } from '../../action.js';
import westBoundPlane from './westBoundPlane.png';
import eastBoundPlane from './eastBoundPlane.png';
import privatePlane from './privatePlane.png';
import lufthansa from './lufthansa.png';
import axios from 'axios';

class ListingItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      logoUrl: 'https://logo.clearbit.com/'+this.props.airplane_company.toLowerCase()+'.com?s=128'
    };


  }

  componentDidMount = () => {
    const url= 'https://logo.clearbit.com/'+this.props.airplane_company.toLowerCase()+'.com?s=128';

    axios.get(url).then(res=>{
      if (res.status !== 200) {
        this.setState({ logoUrl: privatePlane });
      }
    }, error => {
        this.setState({ logoUrl: privatePlane });
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  logoCompany = () => {
    // if (this.props.airplane_company==undefined)
    //     return privatePlane;


  }

  side = () => {
      if (this.props.trak>180) return westBoundPlane;
        else return eastBoundPlane;
  }

  render(){
      return (
        <div className={ styles.app }>
          <div className={ styles.pos }>
            <Panel id={ this.props.id }
                 onClick={this.handleShow} className={ styles.panelBox }>
              <img src={ this.side() } width='25px' className={ styles.imageStyle } />
              <b>Alt:</b> {this.props.altitude} <b>  Flight:</b> { this.props.flight_code_number }
            </Panel>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose} className={ styles.modalStyle }>
              <Modal.Header closeButton
              className={ styles.modalHeader }>
                <Modal.Title className={ styles.title }>FLIGHT  DETAILS</Modal.Title>
              </Modal.Header>
              <Modal.Body className={ styles.modalBody }>
                <img src={this.state.logoUrl} width="80px" />
                <div className={ styles.left }>
                  <h4><b>From:</b> {this.props.origin_airport}</h4>
                  <h4><b>To:</b> {this.props.destination}</h4>
                </div>
                <hr />
                  <h4><b>Airplane manufacturer:</b> {this.props.manufacturer}</h4>
                  <h4><b>Airplane model:</b> {this.props.model}</h4>
              </Modal.Body>
              <Modal.Footer className={ styles.modalFooter }>
                <Button onClick={this.handleClose} className={ styles.closeButton }>CLOSE</Button>
              </Modal.Footer>
          </Modal>
       </div>
      );
    }
}

export default ListingItem;
