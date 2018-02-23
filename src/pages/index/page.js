
import * as React from 'react';
import { connect } from 'dva';
import Tabbar from 'Components/Tabbar';
import Load from 'Components/Load';
import styles from './page.css';
import CustomCarousel from 'Components/Carousel/index';
import WaterFall from 'Components/WaterFall/index';
import BookItem from './components/BookItem/index';
// import Vconsole from 'vconsole'

/* eslint-disable */
// const Vcon = new Vconsole()
/* eslint-enable */




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
          scrollToEnd={() => { console.log(23333) }}
          height="9rem"
          dataGroup={details}
          renderItem={(data) => (<BookItem
            key={data.id}
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
  }
  clickHandler(id, cover) {
    return () => {
      console.log(id, cover)
    }
  }
  render() {
    return (<App {...this.props} clickHandler={this.clickHandler} />);
  }
}

const AppWithLoad = Load(Page);

export default connect((state) => {
  return {
    loading: state.index.loading,
    model: state.index
  };
})(AppWithLoad);
