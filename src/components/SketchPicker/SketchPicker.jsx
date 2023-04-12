'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import SketchPickerCSS from './SketchPicker.module.css'
class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
        r: '66',
        g: '165',
        b: '245',
        a: '1',
      }
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb }, () => {
        if (this.props.onColorChange) {
          this.props.onColorChange(color.rgb);
        }
      });
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '40px',
          height: '40px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '7px',
          background: '#fff',
          borderRadius: '4px',
          
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        
      },
    });

    return (
     
    <>
        <div className={`${SketchPickerCSS.colorFill} ${SketchPickerCSS.ripple}`}  style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } className={SketchPickerCSS.sketchModal} onChange={ this.handleChange } />
        </div> : null }
    </>
    )
  }
}

export default SketchExample