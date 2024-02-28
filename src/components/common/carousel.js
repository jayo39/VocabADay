import { useState, useEffect } from 'react';
import { CarouselContainer, CarouselItems, CarouselItem, BannerImg, CarouselBtn, Bullets, Bullet } from '../../styles/common/carousel.styles';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


const Carousel = () => {
    const initialBanners = [
        {
            src: 'https://d2ur7st6jjikze.cloudfront.net/cms/4379_original_1695083635.jpg?1695083635',
            alt: 'banner1'
        },
        {
            src: 'https://d2ur7st6jjikze.cloudfront.net/cms/4393_original_1695609575.jpg?1695609575',
            alt: 'banner2'
        },
        {
            src: 'https://d2ur7st6jjikze.cloudfront.net/cms/4317_original_1693447239.jpg?1693447239',
            alt: 'banner3'
        },
        {
            src: 'https://d2ur7st6jjikze.cloudfront.net/cms/4395_original_1695632986.jpg?1695632986',
            alt: 'banner4'
        },
        {
            src: 'https://d2ur7st6jjikze.cloudfront.net/cms/4317_original_1693447239.jpg?1693447239',
            alt: 'banner5'
        }
    ];

    const [banners] = useState(initialBanners);
    const [target, setTarget] = useState(0);
    const [transform, setTransform] = useState('');

    useEffect(() => {
        // Calculate the transform based on the target index
        const transformValue = `translateX(-${target * 100}%)`;
        setTransform(transformValue);
    }, [target]);

    const clickLeft = () => {
        setTarget(prevTarget => {
            let newTarget = prevTarget - 1;
            if (newTarget < 0) {
                newTarget = banners.length - 1;
            }
            return newTarget;
        });
    };

    const clickRight = () => {
        setTarget(prevTarget => {
            let newTarget = prevTarget + 1;
            if (newTarget >= banners.length) {
                newTarget = 0;
            }
            return newTarget;
        });
    };

    return (
        <div style={{position: 'sticky'}}>
            <CarouselContainer className="carousel">
                <CarouselItems className="items" style={{ transform: transform }}>
                    {banners.map((banner, index) => (
                        <CarouselItem key={index}>
                            <BannerImg src={banner.src} alt={banner.alt} />
                        </CarouselItem>
                    ))}
                </CarouselItems>
                <CarouselBtn className="carousel-btn left" onClick={clickLeft}><KeyboardDoubleArrowLeftIcon/></CarouselBtn>
                <CarouselBtn className="carousel-btn right" onClick={clickRight}><KeyboardDoubleArrowRightIcon/></CarouselBtn>
            </CarouselContainer>
            <Bullets className="bullets">
                {banners.map((_, index) => (
                    <Bullet 
                        key={index} 
                        className={`bullet ${index === target ? 'active' : ''}`}
                    />
                ))}
            </Bullets>
        </div>
    );
}
export default Carousel;