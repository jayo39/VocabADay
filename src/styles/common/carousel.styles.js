import styled from "@emotion/styled";

export const CarouselContainer = styled.div`
    position: relative;
    overflow: hidden;
    margin-top: 20px;
`;

export const CarouselItems = styled.div`
    transition: 0.3s;
    display: flex;
    translateX(-100%);
`;

export const CarouselItem = styled.div`
    width: 100%;
    flex-shrink: 0;
`;

export const BannerImg = styled.img`
    width: 100%;
`;

export const CarouselBtn = styled.button`
    transition: 0.3s;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    cursor: pointer;
    border-radius: 100%;
    padding: 10px;
    width: 50px;
    height: 50px;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    color: lightgray;
    font-size: 15px;

    &:hover {
        opacity: 1;
    }

    &.left {
        left: 10px;
    }

    &.right {
        right: 10px;
    }
`;

export const Bullets = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 10px;
    padding: 10px 20px;
`;

export const Bullet = styled.div`
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 100%;

    &.active {
        background-color: black;
    }
`;