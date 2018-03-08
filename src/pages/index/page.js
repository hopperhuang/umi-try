
import * as React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Tabbar from 'Components/Tabbar';
import Load from 'Components/Load';
import styles from './page.css';
import CustomCarousel from 'Components/Carousel/index';
import WaterFall from 'Components/WaterFall/index';
import BookItem from './components/BookItem/index';



function App(props) {
  const { location, model } = props
  const { pathname } = location;
  const { banner, detail } = model;
  const banners = banner.map(ban => ({
    name: ban.banner_name,
    img: ban.banner_img,
    url: ban.url
  }))
  const details = detail.map(element => ({
    id: element.book_id,
    name: element.book_name,
    cover: element.book_cover.url,
  }))
  return (
    <div>
      <div className={styles.carousel} >
        {/* banenr图 */}
        <CustomCarousel
          banner={banners}
          config={{
            autoplay: true,
            infinite: true
          }}
        />
      </div>
      <div className={styles.hot_title} >
        热门推荐
      </div>
      {/* 瀑布流内容 */}
      <div className={styles.waterFall} >
        <WaterFall
          scrollToEnd={props.loadMore}
          height="9rem"
          dataGroup={details}
          renderItem={(data) => (<BookItem
            key={data.id}
            id={data.id}
            name={data.name}
            cover={data.cover}
            clickHandler={() => { props.clickHandler(data.id, data.cover)() }}
          />)}
        />
      </div>
      {/* 底部栏 */}
      <Tabbar
        selectedKey={pathname}
      />
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
  clickHandler(id, cover) {
    return () => {
      router.push({
        pathname: '/catalog',
        query: {
          id,
        }
      })
    }
  }
  loadMore() {
    this.props.dispatch({ type: 'index/requestDetail' })
  }
  render() {
    return (<App {...this.props} clickHandler={this.clickHandler} loadMore={this.loadMore} />);
  }
}

const AppWithLoad = Load(Page);

export default connect((state) => {
  return {
    loading: state.index.loading,
    model: state.index,
    globalLoading: state.global.loading,
  };
})(AppWithLoad);
