'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import SketchPickerCSS from './SketchPicker.module.css'




const randomDarkColor = () => {
  const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    r: randomValue(0, 128),
    g: randomValue(0, 128),
    b: randomValue(0, 128),
    a: 1,
  };
};


class SketchExample extends React.Component {


  
  state = {
    displayColorPicker: false,
    color: {
      r: this.props.defaultColor ? this.props.defaultColor.r : 66, 
      g: this.props.defaultColor ? this.props.defaultColor.g : 165,
      b: this.props.defaultColor ? this.props.defaultColor.b : 245,
      a: this.props.defaultColor ? this.props.defaultColor.a : 1
    },
  };
  
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    const rgbColor = color.rgb ? color.rgb : color;
    this.setState({ color: rgbColor }, () => {
        if (this.props.onColorChange) {
            this.props.onColorChange(rgbColor);
        }
    });
};

  
  componentDidMount() {
    const defaultColor = this.props.defaultColor;
    const defaultColorIsEqual = defaultColor && defaultColor.r === 66 && defaultColor.g === 165 && defaultColor.b === 245 && defaultColor.a === 1;

    this.handleChange({ rgb: defaultColorIsEqual ? this.state.color : (defaultColor || this.state.color) });
  }


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