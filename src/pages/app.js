class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentIndex:'All'
    }
  }
  _callBack=(name, value)=>{
    this.setState({
      [name]:value
    })
  }
    render() {
      return (
        <div>
          <Header _callBack={this._callBack}></Header>
          <Content currentIndex={this.state.currentIndex}></Content>
          <Footer></Footer>
        </div>
      );
    }
  }