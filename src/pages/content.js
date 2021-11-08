class Content extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentIndex:1,
      loading:false,
      dataList:[],
      page:1,
      check:false
    }
  }
  
  componentDidMount() {
    this.getData(this.state.currentIndex,1);
    let debouncetest =  this.debounce(this.fnn,1000)
  window.addEventListener('scroll', debouncetest)}
 fnn=()=>{
    // 网页滚动高度 
    var scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
    // 文档显示区域的高度
    var showHeight = window.innerHeight
    // 所有内容的高度
    var allHeight = document.body.scrollHeight
    // 只需要判断内容盒子的高度+滚动条的scrollTop = 盒子内容的高度即为触底
    if (allHeight - 66 < scrollTopHeight + showHeight) {
        console.log("触底了:",)
        this.setState({
          page:this.state.page+1
        },()=>{
          this.getData(this.state.currentIndex,this.state.page)
        })
    }
 }
 debounce=(fn,delay) =>{
  let timer = null;
  return function () {
    if(timer){
      console.log('清除计时器')
      clearTimeout(timer);
    }
    timer = setTimeout(fn,delay)
  }
}
componentWillReceiveProps (nextProps) {
  if(nextProps.currentIndex !== this.props.currentIndex){
    console.log('更改成什么了',nextProps.currentIndex)
    this.getData(nextProps.currentIndex,1,true);
  }
}
  getData=(type=1,page,isChange)=>{
    let url = null;
    switch (type) {
      case 1:
        url = `https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories&page=${page}`;
        break;
        case 2:
          url = `https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories&page=${page}`;
          break;
          case 3:
          url = `https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories&page=${page}`;
          break;
          case 4:
          url = `https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories&page=${page}`;
          break;
          case 5:
          url = `https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories&page=${page}`;
          break;
      default:
        break;
    }
    this.setState({
      loading:true
    },()=>{
      axios.get(url).then(res=>{
        console.log('拿到的数据',res.data.items);
        let item = res.data.items;
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
            dataList:this.state.dataList.concat(data)
          })
        }
      })
    })
  }
  render() {
    const {loading,dataList} = this.state;
    return (
      <div className='content' style={{marginTop:'50px'}}>
        {loading?(
          <div className='loading'></div>
        ):null}
          <div>
            <ul className='content-list'>
           { dataList.map((item,index) =>{
            return (
              <li key={item.id}>
              <h2 className="text-center score">#{index+1}</h2>
              <div className="text-center">
                <img
                  src={item.avatar_url}
                  style={{width: '50%'}}
                />
              </div>
              <h4 style={{display: 'flex', flexDirection: 'row', height: '36px',justifyContent: 'center',marginBottom:'15px'}}>
                <a href={item.svn_url} target="_blank" rel="noopener noreferrer">{item.full_name}</a>
                </h4>
                <div>
                  <i className="fa fa-skyatlas" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(255, 191, 116)'}}></i>
                  <a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </div>
                <div>
                  <i className="fa fa-user" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(255, 215, 0)'}}></i>
                  {item.stargazers_count} stars
                </div>
                <div>
                  <i className="fa fa-usb" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(129, 195, 245)'}}></i>
                  {item.forks_count} forks
                </div>
                <div>
                  <i className="fa fa-vk" style={{display: 'inline-flex',width: '16px', justifyContent: 'center', color: 'rgb(241, 138, 147)'}}></i>
                  {item.open_issues_count} Open issues
                </div>
              {/* <p
                style="
                  display: flex;
                  flex-direction: row;
                  height: 36px;
                  justify-content: center;
                "
              >
                <a
                  href="https://github.com/freeCodeCamp/freeCodeCamp"
                  target="_blank"
                  rel="noopener noreferrer"
                  >freeCodeCamp/freeCodeCamp</a
                >
              </p>
              <div>
                <a
                  href="https://github.com/freeCodeCamp"
                  target="_blank"
                  rel="noopener noreferrer"
                  >freeCodeCamp</a
                >
              </div> */}
            </li>
              );
            })}
            </ul>
          </div>
        {/* <img scr='../assets/img/loading.gif'/> */}
      </div>
    );
  }
}