import { Carousel } from 'antd-mobile';
import './style.less'

// config: Carousel组件的属性
// banner: banner图数组，必须要有三个属性，name：作为key, url: 跳转地址, img:banner图片的src
export default function CustomCarousel(props) {
    const { config, banner } = props;
    return (
        <div className="youdu_carousel_container" >
            <Carousel {...config} >
                {banner.map(ban => (
                    <a
                        key={ban.name}
                        href={ban.url}
                        className="youdu_carousel_link"
                    >
                        <img
                            src={ban.img}
                            alt=""
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        </div>
    )
}