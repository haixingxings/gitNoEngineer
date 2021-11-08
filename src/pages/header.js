class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabs:[
        {tabName:'All',id:1},
        {tabName:'JavaScript',id:2},
        {tabName:'Ruby',id:3},
        {tabName:'Java',id:4},
        {tabName:'CSS',id:5},
      ],
      currentIndex:1
    }
  }
  tabChoice=id=>{
    console.log('点击了第几个',id);
    this.setState({
      currentIndex:id
    },()=>{
      this.props._callBack('currentIndex',id);
    });
  };
  render() {
    const {currentIndex} = this.state;
    let tabList = this.state.tabs.map(item=>{
      let tabStyle = item.id === currentIndex?'active':'';
      return (
        <li key={item.id} className={tabStyle} onClick={()=>{this.tabChoice(item.id)}}>{item.tabName}</li>
      );
    })
    return <ul style={{textAlign:'center',height:'60px',lineHeight:'60px',position:'fixed',top:0,left:0,background:'#fff',width:'100%'}} className='header-nav'>
        {tabList}
    </ul>;
  }
}