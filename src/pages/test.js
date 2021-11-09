class Content extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render() {
    var Router = ReactRouterDOM.HashRouter;
  var Routes = ReactRouterDOM.Routes;
  var Route = ReactRouterDOM.Route;
    return (
      <div className='container'>
        <Router>
          <Routes>
            {/* <Route path="/" component={App}/> */}
            <Route path="/product" component={Product}/>
          </Routes>
        </Router>
      </div>
    );
  }
}