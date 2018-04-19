import React, { Component } from 'react';
import styles from './Dugme.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ListingItem from '../ListingItem/ListingItem.js';
import { importInStore } from '../../action.js';
import { connect } from 'react-redux';

class Dugme extends Component {
    constructor(props) {
      super(props);

      this.ucitaj = this.ucitaj.bind(this);
      this.getFlights = this.getFlights.bind(this);
    }

   ucitaj=() => {
      let listing = [];
      axios.get('http://www.mocky.io/v2/5ad62aa32e00006000c93a8d')
      .then(res => {
        res.data.acList.forEach(
         (item) => {
               let tmpObj = {};
               tmpObj.id= item.Id;
               tmpObj.flight_code_number= item.Icao;
               tmpObj.trak= item.Trak;
               tmpObj.altitude= item.Alt;
               tmpObj.manufacturer= item.Man;
               tmpObj.model= item.Mdl;
               tmpObj.origin_airport= item.From;
               tmpObj.destination= item.To;
               tmpObj.airplane_company= item.Op;
               listing.push(tmpObj);
           }
         );

         if(listing.length !== 0) {
           listing.sort(
             (a,b)=> (a.altitude<b.altitude)? 1 :
                    ((b.altitude < a.altitude) ? -1 : 0)
           );
           this.props.ucitajStore( listing );
         }
        });

    }

    getFlights = () => {
      let tmpArray = [];
      this.props.listing_letova.forEach( (item) => {
        tmpArray.push(
          <ListingItem
            key = { item.id }
            id = { item.id }
            flight_code_number = { item.flight_code_number }
            trak = { item.trak }
            altitude = { item.altitude }
            manufacturer = { item.manufacturer}
            model = { item.model }
            origin_airport = { item.origin_airport }
            destination = { item.destination }
            airplane_company = { item.airplane_company }
            />
          )
         });

      return tmpArray;
    }

    render() {
      return (
        <div className={ styles.app }>
          <div onClick={ this.ucitaj.bind(this) }
               className={ styles.polozaj }> </div>
          { this.getFlights() }
        </div>
      )
    }
}

  const StoreToProps = (store) => {
    return {
      listing_letova: store.listing
    }
  }

  const FuncToProps = ( dispatch ) => {
      return {
        ucitajStore: (listing) => dispatch(importInStore(listing))
      }
  }

export default connect(StoreToProps,FuncToProps)(Dugme);
//http://www.mocky.io/v2/5ad62aa32e00006000c93a8d
