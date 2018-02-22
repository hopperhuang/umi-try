// eslint-disable-next-line
import Link from 'umi/link';
import { connect } from 'dva';
import Tabbar from 'Components/Tabbar';
import Load from 'Components/Load';
import styles from './page.css';
import CustomCarousel from 'Components/Carousel/index';

// import Vconsole from 'vconsole'

/* eslint-disable */
// const Vcon = new Vconsole()
/* eslint-enable */

function App(props) {
  console.log(props.model)
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
      <CustomCarousel
        banner={banners}
        config={{
          autoplay: true,
          infinite: true
        }}
      />
      <div>这里是首页</div>
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
