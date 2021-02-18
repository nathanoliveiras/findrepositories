import styled, { css } from 'styled-components';

import { shade } from 'polished';


interface FormProps {
    hasError: boolean;
}
export const Title = styled.h1`
    font-size: 48px;
    color:#3a3a3a;
    max-width:450px;
    line-height:56px;
    margin-top:80px;
`

export const Form = styled.form<FormProps>`
    margin-top:40px;
    max-width:700px;
    display:flex;

    input{
        flex:1;
        height:70px;
        padding:0 24px;
        border: 0;
        border-radius:5px 0 0 5px;

        ${(props) => props.hasError && css`
            border-color: 2px solid red;
        `}
        &::placeholder{
            color:#a8a8b3;
        }
    }

    button{
        width: 200px;
        height: 70px;
        background:#00d25a;
        border-radius:0 5px 5px 0;
        border:0;
        color:#000;
        font-weight: bold;

        &:hover{
            transition:1s;
            background: ${shade(0.1, '#00d25a')};
        }
    }
`

export const Repositories = styled.div`
    margin-top: 80px;
    max-width:700px;

    a{
        background-color: #fff;
        border-radius: 5px;
        width:100%;
        padding: 24px;
        display: flex;
        text-decoration: none;
        align-items: center;
        transition: 0.5px;

        &:hover{
            transform: translateX(10px)
        }

        & + a{
            margin-top: 18px;
        }

    img{
        width:65px;
        height: 65px;
        border-radius: 50%;
    }

    div{
        margin-left: 16px;

        strong{
            font-size: 20px;
            color:#3d3d4d;
        }

        p{
            font-size: 18px;
            color:#cbcbd6;
        }
    }
    svg{
        margin-left: auto;
        color:#cbcbd6;
    }
    }
`

export const Error = styled.span`
    display: block;
    color: red;
    margin-top: 10px;
`