import { styled } from "styled-components";

interface ResponsiveProps {
    children: React.ReactNode;
  }

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto;
    
    @media (max-width: 1024px) {
        width: 768px;
    }

    @media (max-width: 768){
        width: 100%;
    }
`

const Responsive: React.FC<ResponsiveProps> = ({ children, ...rest }) => {
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
}

export default Responsive;