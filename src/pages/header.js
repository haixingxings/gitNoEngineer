class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabs:[
        {tabName:'All',type:'All'},
        {tabName:'JavaScript',type:'JavaScript'},
        {tabName:'Ruby',type:'Ruby'},
        {tabName:'Java',type:'Java'},
        {tabName:'CSS',type:'CSS'}
      ],
      currentIndex:'All'
    }
  }
  componentDidMount(){
    let search = window.location.hash.slice(15) || 'All';
    console.log('search',search);
    this.setState({
      currentIndex:search
    });
  }
  tabChoice=type=>{
    console.log('点击了第几个',type);
    this.setState({
      currentIndex:type
    },()=>{
      this.props._callBack('currentIndex',type);
    });
  };
  render() {
    // const {currentIndex} = this.state;
    // console.log('search0000', window.location.hash);
    return <ul style={{textAlign:'center',height:'60px',lineHeight:'60px',background:'#fff',width:'100%'}} className='header-nav'>
    {/* return <ul style={{textAlign:'center',height:'60px',lineHeight:'60px',position:'fixed',top:0,left:0,background:'#fff',width:'100%'}} className='header-nav'> */}
        { this.state.tabs.map(item=>{
      let tabStyle = item.type === this.state.currentIndex?'active':'';
      return (
        <li key={item.type} className={tabStyle} onClick={()=>{this.tabChoice(item.type)}}><a href={`#/popular?type=${item.type}`}>{item.tabName}</a></li>
      );
    })}
    </ul>;
  }
}