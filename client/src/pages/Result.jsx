import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import ResultProblem from '../components/ResultProblem';
import { FaPlusSquare, FaSave } from 'react-icons/fa';

const MakeContainer = styled.div`
  position: relative;
  height: calc(100% - 190px);
  padding: 60px 0;
  overflow: scroll;

  *::placeholder {
    opacity: 0.5;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 56.6%;
  height: 72px;
  margin: 0 0 0 21.7%;
  line-height: 120%;
  font-size: 3.75rem;
  font-family: 'GongGothicMedium', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
`;
const Desc = styled.div`
  display: flex;
  align-items: center;
  width: 56.6%;
  height: 42px;
  margin: 30px 21.7% 0;
  line-height: 120%;
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
`;
const Blank = styled.div`
  width: 56.6%;
  height: 2rem;
  margin: 0 21.7%;
  border-bottom: 2px solid var(--orangey-yellow);
  font-size: 2rem;
  font-family: 'GowunDodum-Regular', sans-serif;
  word-wrap: break-word;
  word-break: break-word;
  resize: none;
`;
const Button = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 56.6% 1fr;
  color: var(--warm-grey);
  font-size: 5rem;
  opacity: 0.5;
  svg {
    margin: 1rem;
    :hover {
      color: black;
    }
  }
`;
const SideNavContainer = styled.div`
  position: sticky;
  float: 0;
  top: 3rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 56.6% 1fr;
`;
const SideRelative = styled.div`
  position: relative;
`;
const SideNav = styled.div`
  position: absolute;
  left: 0;
  margin-left: 1rem;
  padding: 0 1rem;
  border-left: 2px dashed var(--warm-grey);
  color: var(--warm-grey);
  div {
  }
`;
const ProblemQuestion = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  * {
    font-size: 1rem;
    font-family: 'GowunDodum-Regular', sans-serif;
    font-weight: ${(props) => props.weight};
    word-break: break-word;
  }
  div:first-child {
    margin-right: 0.5rem;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Make = () => {
  const dummy = {
    title: '세상에서 시리즈',
    description: 'Global 합니다',
    problems: [
      {
        index: 1,
        question: '세상에서 가장 높은 빌딩은?',
        answer: 3,
        explanation: '부르즈 칼리파..였나?',
        isOx: false,
        choices: [
          {
            index: 1,
            content: '63빌딩',
          },
          {
            index: 2,
            content: '에펠탑',
          },
          {
            index: 3,
            content: '아랍의 어떤 빌딩',
          },
          {
            index: 4,
            content: '자유의 여신상',
          },
        ],
      },
      {
        index: 2,
        question: '에베레스트는 지구에서 가장 높다',
        answer: 1,
        explanation: '그렇습니다',
        isOx: true,
        choices: [
          {
            index: 1,
            content: '',
          },
          {
            index: 2,
            content: '',
          },
        ],
      },
    ],
  };
  const { setId } = useParams();
  const [data, setData] = useState(dummy);

  const [curPos, setCurPos] = useState(0);

  const makeRef = useRef(null);
  const navRefs = useRef([0]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addProblem = () => {
    setData({
      ...data,
      problems: [
        ...data.problems,
        {
          index: data.problems.length + 1,
          question: '',
          answer: '',
          explanation: '',
          isOx: false,
          choices: [
            { index: 1, content: '' },
            { index: 2, content: '' },
          ],
        },
      ],
    });
  };

  const autoGrow = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleSave = () => {
    if (data.title === '') {
      return console.log('세트 제목을 입력하세요');
    }

    for (let problem of data.problems) {
      if (problem.question === '') {
        return console.log('문제를 입력해주세요');
      }

      if (problem.answer === '') {
        return console.log('답을 정해주세요');
      }
    }
    return axios.post(`${process.env.SERVER_URL}collections`, data);
  };

  const handleNav = (e) => {
    console.log(navRefs.current);
    navRefs.current[e.target.id].scrollIntoView({ behavior: 'smooth' });
  };

  const [Qpos, setQpos] = useState([]);

  useEffect(() => {
    const arr = [0];
    navRefs.current
      .map((el) => {
        if (el) return el.offsetTop;
      })
      .reduce((acc, cur) => {
        if (!isNaN(cur)) {
          arr.push((cur + acc) / 2);
          return cur;
        }
      });
    setQpos(arr);
  }, [data]);

  const handleScroll = (e) => {
    for (let i = 0; i < Qpos.length; i++) {
      if (Qpos[i] - 100 < makeRef.current.scrollTop) {
        setCurPos(i);
      }
    }
  };

  console.log(data);

  return (
    <MakeContainer onScroll={handleScroll} ref={makeRef}>
      <Title name="title">{data.title}</Title>
      <Desc name="description">{data.description}</Desc>
      <Blank />
      <SideNavContainer>
        <div></div>
        <div></div>
        <SideRelative>
          <SideNav>
            {data.problems.map((problem, idx) => (
              <ProblemQuestion
                onClick={handleNav}
                id={idx}
                key={`#Q${idx + 1}`}
                weight={curPos === idx ? 'bold' : 'normal'}
              >
                <div id={idx}>{idx + 1}</div>
                <div id={idx}>{problem.question}</div>
              </ProblemQuestion>
            ))}
          </SideNav>
        </SideRelative>
      </SideNavContainer>
      {data.problems.map((problem, idx) => (
        <ResultProblem
          key={problem.index}
          problem={problem}
          idx={idx}
          navRefs={navRefs}
        />
      ))}
      <Button>
        <div></div>
        <ButtonContainer>
          <FaPlusSquare onClick={addProblem} />
          <FaSave onClick={handleSave} />
        </ButtonContainer>
        <div></div>
      </Button>
    </MakeContainer>
  );
};

export default Make;
