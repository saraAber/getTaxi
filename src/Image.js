
import React, { Component } from 'react'
import { InputFile } from 'semantic-ui-react-input-file'
import './Image.css'
import { connect } from 'react-redux';
import { src_image } from './store/reducer/actionOrder'
import 'semantic-ui-css/semantic.min.css';



class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgg: false,
      img: 'http://via.placeholder.com/50x50',
      file: null
    }
  }


  convertimg = (event) => {
    const fileName = event.target.files[0];
    const name = fileName.name;
    const reader = new FileReader();
    reader.readAsDataURL(fileName)
    reader.onload = () => {
      this.setState({ file: name })
      this.setState({ img: String(reader.result) })
      this.props.src(String(reader.result))
    }
  }


  componentDidMount() {
    this.props.src("")


    if (this.props.isShowpicture) {
      this.setState({ img: this.props.srcimage })

    }
  }
  render() {


    return (
      <div className="image">
        <InputFile class=".ui.form .field .ui.input"
          input={{ id: "input-control-id", onChange: this.convertimg }} src={this.state.img}/>
        {<img className="img" src={this.state.img} alt="" />}
      </div>
    );
  }
}
const mapDispatcToProps = dispatch => {
  return {
    src: (src) => dispatch(src_image(src))
  }
}

export default connect(null, mapDispatcToProps)(Upload)