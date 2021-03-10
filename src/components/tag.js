import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  font-style: italic;
  font-size: 0.6rem;
  cursor: pointer;
  background-color: #767676;
  border-radius: 0 2px 2px 0;
  color: #fff;
  margin: 2px 10px 2px 10px;
  padding: 4px 6px;
  position: relative;
  line-height: 1.2727272727;

  :before {
    border-top: 10px solid transparent;
    border-right: 8px solid #767676;
    border-bottom: 10px solid transparent;
    content: "";
    height: 0;
    position: absolute;
    top: 0;
    left: -8px;
    width: 0;
  }

  :after {
    background-color: #fff;
    border-radius: 50%;
    content: "";
    height: 4px;
    position: absolute;
    top: 8px;
    left: -2px;
    width: 4px;
  }
`

const Tag = ({
  title,
  onClick,
} = {}) => (
  <Container onClick={onClick}>{title}</Container>
);

export default Tag;