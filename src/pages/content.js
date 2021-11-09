class Content extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentIndex:'All',
      loading:false,
      dataList:[],
      page:1,
      check:false,
      isErrors:false,
      errorMessage:'',
      showMore:false,
    }
  }
  
  componentDidMount() {
    console.log('初始化')
    let search = window.location.hash.slice(15) || 'All';
    console.log('search1111',search);
    this.getData(search,1);
    // this.getData(this.state.currentIndex,1);
    // let debouncetest =  this.debounce(this.fnn,1000)
  // window.addEventListener('scroll', debouncetest)}
//  fnn=()=>{
//     // 网页滚动高度 
//     var scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
//     // 文档显示区域的高度
//     var showHeight = window.innerHeight
//     // 所有内容的高度
//     var allHeight = document.body.scrollHeight
//     // 只需要判断内容盒子的高度+滚动条的scrollTop = 盒子内容的高度即为触底
//     if (allHeight - 66 < scrollTopHeight + showHeight) {
//         console.log("触底了:",)
//         this.setState({
//           page:this.state.page+1
//         },()=>{
//           this.getData(this.state.currentIndex,this.state.page)
//         })
//     }
//  }
}
// 防抖
// debounce=(fn,delay) =>{
//  let timer = null;
//  return function () {
//    if(timer){
//      console.log('清除计时器')
//      clearTimeout(timer);
//    }
//    timer = setTimeout(fn,delay)
//  }
// }
getMore=()=>{
  // let debouncetest =  this.debounce(()=>{},1000)
  let search = window.location.search.slice(6) || 'All';
  this.setState({
    page:this.state.page+1,
    showMore:false
  },()=>{
    // this.getData(this.state.currentIndex,this.state.page)
    this.getData(search,this.state.page)
  })
}
componentWillReceiveProps (nextProps) {
  console.log('判断每次更新')
  if(nextProps.currentIndex !== this.props.currentIndex){
    this.setState({
      currentIndex:nextProps.currentIndex,
      dataList:[],
      showMore:false,
      isErrors:false
    },()=>{
      this.getData(nextProps.currentIndex,1,true);
    });
  }
}
  getData=(type='All',page,isChange)=>{
    let url = null;
    switch (type) {
      case 'All':
      url = `https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${page}`;
      break;
      case 'JavaScript':
      url = `https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories&page=${page}`;
      break;
      case 'Ruby':
      url = `https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=${page}`;
      break;
      case 'Java':
      url = `https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories&page=${page}`;
      break;
      case 'CSS':
      url = `https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories&page=${page}`;
      break;
      default:
        break;
    }
    this.setState({
      loading:true
    },()=>{
      axios.get(url).then(res=>{
        console.log('拿到的数据',res);
        if(res.success || (res.items &&res.items.length)){
          if(res.total_count>this.state.dataList.length){
            let item = res.items;
            let data = item.map(item =>{
              return {
                id:item.id,
                full_name:item.full_name,
                name:item.name,
                stargazers_count:item.stargazers_count,
                forks_count:item.forks_count,
                open_issues_count:item.open_issues_count,
                avatar_url:item.owner.avatar_url,
                svn_url:item.svn_url,
                html_url:item.owner.html_url,
              }
            })
            if(isChange){
              this.setState({
                loading:false,
                dataList:data
              })
            }else{
              this.setState({
                loading:false,
                showMore:true,
                dataList:this.state.dataList.concat(data)
              })
            }
          }else{
            this.setState({
              showMore:false
            })
          }
        }else{
          this.setState({
            isErrors:true,
            dataList:[],
            loading:false,
            showMore:false,
            errorMessage:res.msg
          });
        }
      })
    })
  }
  close=()=>{
    this.setState({
      isErrors:false,
    },()=>{
      this.getData(this.props.currentIndex,1,true);
    })
  }
  render() {
    const {loading,dataList} = this.state;
    return (
      <div className='container'>
        <div className='content' style={{marginTop:'50px'}}>
            {this.state.isErrors?<div className='errors' style={{position:'relative'}}>
              报错了:{this.state.errorMessage}
              {/* <i className="fa fa-window-close" onClick={this.close} style={{display: 'inline-flex',width: '16px', justifyContent: 'center',position:'absolute',right:'14px',top:'9px',cursor:'pointer'}}></i> */}
              <div className="resetBtn" onClick={this.close}>
                  <a className="product-btn">重试</a>
              </div>
            </div>:null}
            <div>
              <ul className='content-list'>
            { dataList.map((item,index) =>{
              return (
                <li key={item.id}>
                <h2 className="text-center score">#{index+1}</h2>
                <div className="text-center content-avatar">
                  <img
                    src={item.avatar_url}
                    style={{width: '50%'}}
                  />
                </div>
                <h4 style={{display: 'flex', flexDirection: 'row', height: '36px',justifyContent: 'center',marginBottom:'15px'}}>
                  <a href={item.svn_url} target="_blank" rel="noopener noreferrer" className='hidden1'>{item.full_name}</a>
                  </h4>
                  <div style={{marginBottom:'6px'}}>
                    <i className="fa fa-skyatlas" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(255, 191, 116)'}}></i>
                    <a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                  </div>
                  <div style={{marginBottom:'6px'}}>
                    <i className="fa fa-user" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(255, 215, 0)'}}></i>
                    {item.stargazers_count} stars
                  </div>
                  <div style={{marginBottom:'6px'}}>
                    <i className="fa fa-usb" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(129, 195, 245)'}}></i>
                    {item.forks_count} forks
                  </div>
                  <div style={{marginBottom:'6px'}}>
                    <i className="fa fa-vk" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(241, 138, 147)'}}></i>
                    {item.open_issues_count} Open issues
                  </div>
              </li>
                );
              })}
              </ul>
            </div>
        </div>
        {loading?(
          <div className='loading'></div>
          ):null}
          {this.state.showMore?(<div className="product-more" onClick={this.getMore}>
            <a className="product-btn">加载更多</a>
        </div>):null}
      </div>
    );
  }
}