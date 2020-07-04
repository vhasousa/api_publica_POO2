import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
`;

export const List = styled.ul`
  margin-top: 30px;

  li {
    list-style: none;
    padding: 15px;

    div {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;

      p {
        margin-right: 40px;
      }
    }

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
