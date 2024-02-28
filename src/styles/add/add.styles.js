import styled from "@emotion/styled";

export const ImgInput = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #8f8f8f;
    border-radius: 3px;
    cursor: pointer;
    height: 350px;
    background-color: white;
    background-image: url(${(props)=>props.src});
    background-repeat: no-repeat;
    background-size: cover;
    &:hover {
        opacity: 0.6;
    }
    & h5 {
        display: none;
    }
    &:hover h5{
        display: block;
    }
`;

export const TextFieldWrap = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;