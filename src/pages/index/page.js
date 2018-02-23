// eslint-disable-next-line
import Link from 'umi/link';
import { connect } from 'dva';
import Tabbar from 'Components/Tabbar';
import Load from 'Components/Load';
import styles from './page.css';
import CustomCarousel from 'Components/Carousel/index';
import CustomScrollView from 'Components/ScrollView/index'

// import Vconsole from 'vconsole'

/* eslint-disable */
// const Vcon = new Vconsole()
/* eslint-enable */

let i = 5;

function App(props) {
  console.log(document.documentElement.clientWidth)
  const { location, model } = props
  const { pathname } = location;
  const { banner } = model;
  const banners = banner.map(ban => ({
    name: ban.banner_name,
    img: ban.banner_img,
    url: ban.url
  }))
  return (
    <div className={styles.normal}>
      <div className={styles.carousel} >
        <CustomCarousel
          banner={banners}
          config={{
            autoplay: true,
            infinite: true
          }}
        />
      </div>
      <CustomScrollView
        height="4rem"
        scrollToEnd={() => {
          i += 1;
          console.log(i)
          // const pullContent = document.querySelector('.pullContent')
          document.querySelector('.pullContent').style.height = `${i}00px`;
        }}
      >
        <div className="pullContent" >
          这里是下拉内容
          </div>
      </CustomScrollView>
      <Tabbar
        selectedKey={pathname}
      />
    </div>
  );
}
const AppWithLoad = Load(App);

export default connect((state) => {
  return {
    loading: state.index.loading,
    model: state.index
  };
})(AppWithLoad);
